# import requirements needed
from flask import Flask, render_template, request
from utils import get_base_url
import pandas as pd
import pickle

# setup the webserver
# port may need to be changed if there are multiple flask servers running on same server
port = 12345
base_url = get_base_url(port)

# if the base url is not empty, then the server is running in development, and we need to specify the static folder so that the static files are served
if base_url == '/':
    app = Flask(__name__)
else:
    app = Flask(__name__, static_url_path=base_url+'static')

# set up the routes and logic for the webserver
@app.route(f'{base_url}', methods = ["GET"])
def home():
    return render_template('index.html')

@app.route(f"{base_url}/predict" , methods = ["POST"])
def predict():

    body = request.json
    output_values, column_names = process_data(body)
    scaler = pickle.load(open('scaler.sav', 'rb'))
    output_values = scaler.transform(output_values)
    input_df = pd.DataFrame(output_values, columns=column_names)
    pipeline1 = pickle.load(open('lgbm_model.sav', 'rb'))
    popularity_score = int(pipeline1.predict(input_df)[0])
    if popularity_score < 0:
        popularity_score = 0
    elif popularity_score > 100:
        popularity_score = 100
    return str(popularity_score)


def clear_dummy(data, dummy_key):
    for key in data.keys():
        if f'{dummy_key}_' in key:
            data[key] = 0.0
    return data


def process_data(input_data):
    default_data = {
         "acousticness":0.122,"danceability":0.472,"duration_ms":228101.0,"energy":0.61,"instrumentalness":0.00000148,"key":0.0,
        "liveness":0.135,"loudness":-5.819,"mode":1.0,"speechiness":0.0264,"tempo":134.061,"valence":0.211,"tempo_mod":0.0, "has_feat":0.0,
        "music_genre_Alternative":0.0,"music_genre_Anime":0.0,"music_genre_Blues":0.0,"music_genre_Classical":0.0,"music_genre_Country":1.0,
        "music_genre_Electronic":0.0,"music_genre_Hip-Hop":0.0,"music_genre_Jazz":0.0,"music_genre_Rap":0.0,"music_genre_Rock":0.0
    }

    dummy_columns = ['music_genre']

    for key, value in input_data.items():
        if value != '':
            if key in dummy_columns:
                default_data = clear_dummy(default_data, key)
                default_data[f"{key}_{value}"] = 1.0
            elif key not in dummy_columns:
                default_data[key] = float(value)

    columns = ['acousticness', 'danceability', 'duration_ms', 'energy',
       'instrumentalness', 'key', 'liveness', 'loudness', 'mode',
       'speechiness', 'tempo', 'valence', 'tempo_mod', 'has_feat',
       'music_genre_Alternative', 'music_genre_Anime', 'music_genre_Blues',
       'music_genre_Classical', 'music_genre_Country',
       'music_genre_Electronic', 'music_genre_Hip-Hop', 'music_genre_Jazz',
       'music_genre_Rap', 'music_genre_Rock']

    output_data = []

    for column in columns:
        output_data.append(default_data[column])
    output_data = [output_data]
    return output_data, columns

# define additional routes here
# for example:
# @app.route(f'{base_url}/team_members')
# def team_members():
#     return render_template('team_members.html') # would need to actually make this page

if __name__ == '__main__':
    # IMPORTANT: change url to the site where you are editing this file.
    website_url = 'cocalc8.ai-camp.dev'
    
    print(f'Try to open\n\n    https://{website_url}' + base_url + '\n\n')
    app.run(host = '0.0.0.0', port=port, debug=True)
