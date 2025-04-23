
# Learning Film Photography – Demo Web Application

This repository contains a minimal, **fully‑functional** Flask web application that demonstrates
the structure and key interactions specified in the design brief.

## Features

* Landing page with rotating sample photos (updates once per minute via `/next_photo` API).
* Two learning modules with placeholder pages, navigable via a persistent left‑hand sidebar.
* Clean, modular templates using Jinja (`layout.html` + individual templates).
* Separated assets:
    * `static/css/style.css`
    * `static/js/main.js` (uses jQuery 3.7)
* No inline styles; easy to extend.
* Global site font set to **Helvetica Neue** (with Helvetica/Arial fallbacks).

## Quick Start

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py  # default port 5000
```
Open <http://127.0.0.1:5000> in your browser.

## Customising

* **Photos** – Edit the `PHOTO_ROTATION` list in `app.py`, or point to images in
  `static/images/` and update the `file` paths.
* **Pages / content** – Create new templates in `templates/` and update the `LESSONS`
  structure in `app.py` to add or rename pages without touching template code.
* **Styling** – Extend the CSS or add new files under `static/css/`.

## License

MIT (demo purposes)
