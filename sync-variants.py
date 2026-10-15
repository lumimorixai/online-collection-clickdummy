"""Refresh B/C entry pages from A without modifying A or duplicating data."""
from pathlib import Path
import hashlib
import re
root = Path(__file__).resolve().parent

def version(name):
    return hashlib.sha256((root / name).read_bytes()).hexdigest()[:12]

source = (root / 'index.html').read_text()
for design in ('b', 'c'):
    html = source.replace('<html lang="de">', f'<html lang="de" data-design="{design}">')
    html = re.sub(r'(href|src)="((?:style|login)\.css|(?:data|auth|app)\.js)(?:\?v=[^"]+)?"',
                  lambda m: f'{m[1]}="../{m[2]}?v={version(m[2])}"', html)
    html = html.replace('</head>', f'<link rel="stylesheet" href="../variants.css?v={version("variants.css")}"></head>')
    html = html.replace('<script src="../app.js', f'<script src="../variant-bootstrap.js?v={version("variant-bootstrap.js")}"></script><script src="../app.js')
    html = html.replace('</body>', f'<script src="../variants.js?v={version("variants.js")}"></script></body>')
    (root / design / 'index.html').write_text(html)
