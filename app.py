
from flask import Flask, render_template, jsonify, redirect, url_for, abort
from datetime import datetime

app = Flask(__name__)

# Photo rotation data (URL or static path) and associated metadata
PHOTO_ROTATION = [
    {
        "file": "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1000&q=60",
        "caption": "Photography by Hans Isaacson",
        "location": "Glacier National Park, Montana",
        "film": "Kodak Portra 400"
    },
    {
        "file": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=60",
        "caption": "Morning light over Hidden Lake",
        "location": "Glacier National Park, Montana",
        "film": "Kodak Portra 400"
    },
    {
        "file": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=60",
        "caption": "Creek flowing through cedar forest",
        "location": "Glacier National Park, Montana",
        "film": "Kodak Portra 400"
    }
]

# Index pointer for photo rotation
_photo_index = 0

# Learning modules definition
LESSONS = {
    1: {
        "name": "How to use a film camera",
        "pages": [
            ("intro", "Introduction"),
            ("choose_camera", "Choosing a camera"),
            ("choose_film", "Choosing film"),
            ("camera_controls", "Camera controls"),
            ("compose", "Composing your shot"),
            ("quiz", "Quiz")
        ]
    },
    2: {
        "name": "How to develop film",
        "pages": [
            ("load_film", "Load the film"),
            ("development", "Development"),
            ("wash", "Wash (Stopping)"),
            ("fixing", "Fixing"),
            ("wash_dry", "Wash and Dry"),
            ("quiz", "Quiz")
        ]
    }
}

@app.context_processor
def inject_globals():
    """Inject variables available in every Jinja template"""
    return {
        "now": datetime.utcnow(),
        "lessons": LESSONS
    }

# Landing page
@app.route("/")
def landing():
    return render_template("index.html")

# Endpoint to rotate photos once per request (client calls every minute)
@app.route("/next_photo")
def next_photo():
    global _photo_index
    data = PHOTO_ROTATION[_photo_index]
    _photo_index = (_photo_index + 1) % len(PHOTO_ROTATION)
    return jsonify(data)

# Redirect /module/<id>/ to the first page
@app.route("/module/<int:module_id>/")
def module_root(module_id):
    module = LESSONS.get(module_id)
    if not module:
        abort(404)
    first_page = module["pages"][0][0]
    return redirect(url_for("module_page", module_id=module_id, page=first_page))

# Generic module page renderer


@app.route("/module/<int:module_id>/<page>")
def module_page(module_id, page):
    module = LESSONS.get(module_id)
    if not module:
        abort(404)
    # locate page index
    idx = next((i for i, (slug, _) in enumerate(module["pages"]) if slug == page), None)
    if idx is None:
        abort(404)
    page_title = module["pages"][idx][1]
    prev_slug = module["pages"][idx - 1][0] if idx > 0 else None
    next_slug = module["pages"][idx + 1][0] if idx < len(module["pages"]) - 1 else None
    return render_template(
        "module_page.html",
        module_id=module_id,
        module=module,
        page=page,
        page_title=page_title,
        prev_slug=prev_slug,
        next_slug=next_slug,
    )


if __name__ == "__main__":
    app.run(debug=True)
