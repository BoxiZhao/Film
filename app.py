from flask import Flask, render_template, jsonify, redirect, url_for, abort, request, session
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for session

# Photo rotation data (URL or static path) and associated metadata
PHOTO_ROTATION = [
    {
        "file": "/static/images/welcome.jpg",
        "caption": "Photography by Hans Isaacson",
        "location": "Glacier National Park, Montana, Colorado",
        "film": "Film: Kodak Portra 400"
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
            ("welcome", "Welcome"),
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

# Store film development options
@app.route("/store_options", methods=['POST'])
def store_options():
    session['film_type'] = request.form.get('film_type', 'ILLFORD HP5')
    session['iso'] = request.form.get('iso', '100')
    session['developer'] = request.form.get('developer', 'Rodinal')
    return jsonify({'status': 'success'})

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
    
    # Get film development options from session or use defaults
    film_type = session.get('film_type', 'ILLFORD HP5')
    iso = session.get('iso', '100')
    developer = session.get('developer', 'Rodinal')
    
    # Determine which template to use
    if page == 'welcome':
        template = f"module{module_id}_welcome.html"
    elif page == 'quiz':
        template = f"module{module_id}_quiz.html"
    else:
        template = f"module{module_id}_{page}.html"
    
    try:
        return render_template(
            template,
            module_id=module_id,
            module=module,
            page=page,
            page_title=page_title,
            prev_slug=prev_slug,
            next_slug=next_slug,
            film_type=film_type,
            iso=iso,
            developer=developer
        )
    except:
        # Fallback to generic template if specific template doesn't exist
        return render_template(
            "module_page.html",
            module_id=module_id,
            module=module,
            page=page,
            page_title=page_title,
            prev_slug=prev_slug,
            next_slug=next_slug,
            film_type=film_type,
            iso=iso,
            developer=developer
        )

if __name__ == "__main__":
    app.run(debug=True)
