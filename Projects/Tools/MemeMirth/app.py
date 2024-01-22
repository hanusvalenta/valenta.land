from flask import Flask, render_template
import json
import random
import os

app = Flask(__name__)

def get_valid_files():
    with open('file_list.json', 'r') as json_file:
        files = json.load(json_file)

    valid_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.mp4', '.webp'}
    valid_files = [file for file in files if os.path.splitext(file)[1].lower() in valid_extensions]

    return valid_files

@app.route('/')
def display_random_file():
    valid_files = get_valid_files()

    if not valid_files:
        return "No valid files found."

    random_file = random.choice(valid_files)
    return render_template('index.html', file=random_file)

if __name__ == '__main__':
    app.run(debug=True)
