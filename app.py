import numpy as np
import pandas as pd
import flask
from flask import jsonify, request, render_template,send_from_directory,request, jsonify, make_response
from annoy import AnnoyIndex
from flask_cors import CORS, cross_origin
import os
import whatisthefood
from googleapiclient.discovery import build

ACCESS_KEY = os.environ.get('ACCESS_KEY', '')
CSE_ID = os.environ.get('CSE_ID', '')

service = build("customsearch", "v1", developerKey=ACCESS_KEY)

app = flask.Flask(__name__, static_folder='./build',static_url_path='/')
cors = CORS(app)
app.config["DEBUG"] = True

df_recipes = pd.read_csv('data\\01_Recipe_Details.csv')
df_ingr = pd.read_csv('data\\04_Recipe-Ingredients_Aliases.csv')
ingredients = [ingr.strip() for ingr in df_ingr['Aliased Ingredient Name'].unique()]
num_dims = len(ingredients)
dict_ingredients = {name : id for name, id in zip(ingredients, range(num_dims))}

t = AnnoyIndex(num_dims, 'euclidean')
t.load('base.tree')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api', methods=['GET'])
@cross_origin()
def answer():
    if 'query' not in request.args:
        return "bad request"
    
    query = request.args['query']
    query = [ingr.strip() for ingr in query.split(',')]

    v = [1 if ingr in query else 0 for ingr in ingredients]
    neighbors_id = t.get_nns_by_vector(v, 10)
    
    def dist(a, b): return np.sum((np.array(a) - np.array(b)) ** 2) ** 0.5
    meand = np.mean([dist(v, t.get_item_vector(x)) for x in neighbors_id])

    response = []
    for id in neighbors_id:
        iv = t.get_item_vector(id)
        if dist(v, iv) > meand * 1.75 or dist(np.zeros(shape=len(iv)), iv) == 0:
            continue

        recipe = df_recipes[df_recipes['Recipe ID'] == id + 1]
        title = list(recipe['Title'])[0]
        cuisine = list(recipe['Cuisine'])[0]
        ingrs = list(df_ingr[df_ingr['Recipe ID'] == id + 1]['Aliased Ingredient Name'].unique())
        ingrs = [ingr.strip() for ingr in ingrs]

<<<<<<< HEAD
        img = "https://upload.wikimedia.org/wikipedia/commons/3/35/Orange_question_mark.svg"
        res = service.cse().list(q=title, cx=CSE_ID, num=1, searchType="image").execute() if False else None
        if isinstance(res, dict) and 'items' in res.keys() and res['items'] and 'image' in res['items'][0]:
=======
        img = "https://commons.wikimedia.org/wiki/File:Orange_question_mark.svg"
        try:
            res = service.cse().list(q=title, cx=CSE_ID, num=1, searchType="image").execute()
>>>>>>> cb3ded2805d4ea2aed9954eb6047e68cfa06af1b
            img = res['items'][0]['image'].get('thumbnailLink', '')
        except:
            pass

        response.append({"title": title, "cuisine": cuisine, "ingredients": ingrs, 'image': img})
        

    return jsonify({"result": response})

@app.route('/image', methods=['GET', 'POST'])
@cross_origin()
def ingredient():
    print("this is test")
    print(request)
    if 'url' not in request.form:
        # If no parameters, it will return broccoli
        #image_url_broccoli = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwE4U5NvkAnUlPZVAU6ZNuQc3RhpWo0Fxbw&usqp=CAU'
        return 'broccoli'
    else:
        print(request.form['url'])
        image_url = request.form['url']

    return whatisthefood.search_ingredient(image_url)    


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(debug=True, port=33507)
