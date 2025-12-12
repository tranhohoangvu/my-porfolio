print("USING GRAPHQL VERSION")

import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.request import Request, urlopen

# GitHub official-ish palettes
LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
DARK  = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

# Background + stroke (để ô trống không chìm vào nền)
LIGHT_BG = "#ffffff"
LIGHT_STROKE = "#d0d7de"

DARK_BG = "#0d1117"       # nền dark của GitHub
DARK_STROKE = "#30363d"   # viền ô trên GitHub dark

QUERY = """
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            contributionLevel
            date
          }
        }
        months {
          name
          firstDay
        }
      }
    }
  }
}
"""

LEVEL_MAP = {
  "NONE": 0,
  "FIRST_QUARTILE": 1,
  "SECOND_QUARTILE": 2,
  "THIRD_QUARTILE": 3,
  "FOURTH_QUARTILE": 4,
}

def gql(token: str, variables: dict) -> dict:
  req = Request(
    "https://api.github.com/graphql",
    data=json.dumps({"query": QUERY, "variables": variables}).encode("utf-8"),
    headers={
      "Authorization": f"Bearer {token}",
      "Content-Type": "application/json",
      "User-Agent": "github-actions-contrib-svg",
      "Accept": "application/json",
    }
  )
  with urlopen(req, timeout=30) as r:
    payload = json.loads(r.read().decode("utf-8"))
  if "errors" in payload:
    raise RuntimeError(f"GraphQL errors: {payload['errors']}")
  return payload["data"]

def level_from_enum(level: str) -> int:
  return LEVEL_MAP.get(level or "NONE", 0)

def render_svg(weeks, months, palette, title: str, bg: str, stroke: str) -> str:
  # Layout gần giống GitHub calendar
  cell, gap = 10, 2
  step = cell + gap

  x0, y0 = 30, 20
  weeks_count = len(weeks)
  width  = x0 + weeks_count * step + 10
  height = y0 + 7 * step + 20

  # Map date -> week index để đặt label tháng
  date_to_week = {}
  for wi, w in enumerate(weeks):
    for d in w["contributionDays"]:
      date_to_week[d["date"]] = wi

  # Month labels
  month_texts = []
  for m in months:
    wi = date_to_week.get(m["firstDay"])
    if wi is None:
      continue
    mx = x0 + wi * step
    month_texts.append(
      f'<text x="{mx}" y="12" font-size="10" fill="#94a3b8">{m["name"]}</text>'
    )

  # Background (giúp tách calendar khỏi nền card)
  bg_rect = f'<rect x="0" y="0" width="{width}" height="{height}" fill="{bg}" rx="8" ry="8"/>'

  # Cells
  rects = []
  for wi, w in enumerate(weeks):
    for di, d in enumerate(w["contributionDays"]):
      lv = level_from_enum(d.get("contributionLevel"))
      x = x0 + wi * step
      y = y0 + di * step
      fill = palette[lv]
      rects.append(
        f'<rect x="{x}" y="{y}" width="{cell}" height="{cell}" rx="2" ry="2" '
        f'fill="{fill}" stroke="{stroke}" stroke-width="1">'
        f'<title>{d["date"]}: {d["contributionCount"]} contributions</title>'
        f'</rect>'
      )

  return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{title}">
  <title>{title}</title>
  {bg_rect}
  {"".join(month_texts)}
  {"".join(rects)}
</svg>
"""

def main():
  if len(sys.argv) < 3:
    print("Usage: build_github_contrib_svgs.py <username> <out_dir>")
    sys.exit(1)

  username = sys.argv[1].strip()
  out_dir = Path(sys.argv[2].strip())
  out_dir.mkdir(parents=True, exist_ok=True)

  token = os.environ.get("GITHUB_TOKEN")
  if not token:
    raise RuntimeError("Missing GITHUB_TOKEN. Set env GITHUB_TOKEN in workflow step.")

  now = datetime.now(timezone.utc)
  to_dt = now
  from_dt = now - timedelta(days=370)  # ~53 tuần

  data = gql(token, {
    "login": username,
    "from": from_dt.isoformat(),
    "to": to_dt.isoformat(),
  })

  cal = data["user"]["contributionsCollection"]["contributionCalendar"]
  weeks = cal["weeks"]
  months = cal["months"]

  (out_dir / "github-contrib-light.svg").write_text(
    render_svg(weeks, months, LIGHT, f"{username} Contributions (Light)", LIGHT_BG, LIGHT_STROKE),
    encoding="utf-8"
  )
  (out_dir / "github-contrib-dark.svg").write_text(
    render_svg(weeks, months, DARK, f"{username} Contributions (Dark)", DARK_BG, DARK_STROKE),
    encoding="utf-8"
  )

  print("Generated:", out_dir / "github-contrib-light.svg")
  print("Generated:", out_dir / "github-contrib-dark.svg")

if __name__ == "__main__":
  main()
