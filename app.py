import pandas as pd
import flask
from flask import jsonify, request, render_template,send_from_directory,request, jsonify, make_response
from annoy import AnnoyIndex
from flask_cors import CORS, cross_origin
import os

app = flask.Flask(__name__, static_folder='./build',static_url_path='/')
cors = CORS(app)
app.config["DEBUG"] = True

df_recipes = pd.read_csv('data\\01_Recipe_Details.csv')
df_ingr = pd.read_csv('data\\04_Recipe-Ingredients_Aliases.csv')
ingredients = [ingr.strip() for ingr in df_ingr['Aliased Ingredient Name'].unique()]
num_dims = len(ingredients)
dict_ingredients = {name : id for name, id in zip(ingredients, range(num_dims))}

t = AnnoyIndex(num_dims, 'angular')
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
    recipes_id = t.get_nns_by_vector(v, 10)

    response = []
    for id in recipes_id:
        recipe = df_recipes[df_recipes['Recipe ID'] == id + 1]
        title = list(recipe['Title'])[0]
        cuisine = list(recipe['Cuisine'])[0]
        ingrs = list(df_ingr[df_ingr['Recipe ID'] == id + 1]['Aliased Ingredient Name'].unique())
        ingrs = [ingr.strip() for ingr in ingrs]
        response.append({"title": title, "cuisine": cuisine, "ingredients": ingrs})

    return jsonify({"result": response})

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
