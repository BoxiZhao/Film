from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import url_for
import json
app = Flask(__name__)


# DATA




# ROUTES

@app.route('/')
def index():
    with open('metadata.json') as f:
         photos = json.load(f)
        
    for photo in photos:
        photo['url'] = url_for('static', filename=f'images/{photo["filename"]}')
    
    return render_template('index.html', photos=photos)


@app.route('/module1')
def module1_intro():
    return render_template('module1_introduction.html')

@app.route('/module1/choosing-camera')
def module1_choosing_camera():
    return render_template('module1_choosing_camera.html')

@app.route('/module1/choosing-film')
def module1_choosing_film():
    return render_template('module1_choosing_film.html')

@app.route('/module1/camera-controls')
def module1_camera_controls():
    return render_template('module1_camera_controls.html')

@app.route('/module1/composing-shot')
def module1_composing_shot():
    return render_template('module1_composing_shot.html')

@app.route('/module1/quiz1')
def module1_quiz1():
    return render_template('module1_quiz1.html')

@app.route('/module1/quiz2')
def module1_quiz2():
    return render_template('module1_quiz2.html')

@app.route('/module1/quiz3')
def module1_quiz3():
    return render_template('module1_quiz3.html')

@app.route('/module2')
def module2_intro():
    return render_template('module2_introduction.html')

@app.route('/module2/load')
def module2_load():
    return render_template('module2_load.html')

@app.route('/module2/development')
def module2_development():
    return render_template('module2_development.html')

@app.route('/module2/wash')
def module2_wash():
    return render_template('module2_wash.html')

@app.route('/module2/fixing')
def module2_fixing():
    return render_template('module2_fixing.html')

@app.route('/module2/dry')
def module2_dry():
    return render_template('module2_dry.html')

@app.route('/module2/quiz1')
def module2_quiz1():
    return render_template('module2_quiz1.html')

@app.route('/finish')
def finish():
    return render_template('finish.html')


#Dont touch ts

if __name__ == '__main__':
   app.run(debug = True, port=5001)