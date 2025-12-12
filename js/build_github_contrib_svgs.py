import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.request import Request, urlopen

LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
DARK  = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

QUERY = """
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
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

def level_from_count(count: int, max_count: int) -> int:
  if count <= 0:
    return 0
  if max_count <= 0:
    return 1
  ratio = count / max_count
  if ratio <= 0.25:
    return 1
  if ratio <= 0.50:
    return 2
  if ratio <= 0.75:
    return 3
  return 4

def render_svg(weeks, months, palette, title: str) -> str:
  cell, gap = 10, 2
  step = cell + gap

  x0, y0 = 30, 20
  weeks_count = len(weeks)
  width  = x0 + weeks_count * step + 10
  height = y0 + 7 * step + 20

  date_to_week = {}
  all_days = []
  for wi, w in enumerate(weeks):
    for d in w["contributionDays"]:
      date_to_week[d["date"]] = wi
      all_days.append(d)

  max_count = max((d["contributionCount"] for d in all_days), default=0)

  month_texts = []
  for m in months:
    wi = date_to_week.get(m["firstDay"])
    if wi is None:
      continue
    mx = x0 + wi * step
    month_texts.append(
      f'<text x="{mx}" y="12" font-size="10" fill="#94a3b8">{m["name"]}</text>'
    )

  rects = []
  for wi, w in enumerate(weeks):
    for di, d in enumerate(w["contributionDays"]):
      lv = level_from_count(d["contributionCount"], max_count)
      x = x0 + wi * step
      y = y0 + di * step
      fill = palette[lv]
      rects.append(
        f'<rect x="{x}" y="{y}" width="{cell}" height="{cell}" rx="2" ry="2" fill="{fill}">'
        f'<title>{d["date"]}: {d["contributionCount"]} contributions</title>'
        f'</rect>'
      )

  return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{title}">
  <title>{title}</title>
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
  from_dt = now - timedelta(days=370)

  data = gql(token, {
    "login": username,
    "from": from_dt.isoformat(),
    "to": to_dt.isoformat(),
  })

  cal = data["user"]["contributionsCollection"]["contributionCalendar"]
  weeks = cal["weeks"]
  months = cal["months"]

  (out_dir / "github-contrib-light.svg").write_text(
    render_svg(weeks, months, LIGHT, f"{username} Contributions (Light)"),
    encoding="utf-8"
  )
  (out_dir / "github-contrib-dark.svg").write_text(
    render_svg(weeks, months, DARK, f"{username} Contributions (Dark)"),
    encoding="utf-8"
  )

  print("Generated:", out_dir / "github-contrib-light.svg")
  print("Generated:", out_dir / "github-contrib-dark.svg")

if __name__ == "__main__":
  main()
