import re
from pathlib import Path

for n in ("7501", "7545"):
    p = Path(rf"C:\Users\ASMAAN\AppData\Local\Temp\css-{n}.css")
    if not p.exists():
        print("missing", n)
        continue
    t = p.read_text(encoding="utf-8", errors="ignore")
    print("====", n, p.stat().st_size)
    urls = dict.fromkeys(re.findall(r"https://sunlifetraders.com/wp-content/uploads/20[^)\"']+", t))
    for u in urls:
        print(u)
