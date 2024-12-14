from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from utils import load_association_rules, get_recommendations , get_movies_names , get_movie_title
import pandas as pd
from sentence_transformers import SentenceTransformer


app = FastAPI()

model = SentenceTransformer('all-MiniLM-L6-v2')
movies_df = pd.read_csv("movies.csv")
movie_map = dict(zip(movies_df['Unnamed: 0'], movies_df['Title']))
movies_list = movies_df['Title'].tolist()
association_rules_loaded = load_association_rules('D:/devlopment/esi/ml/front/MovieMatcher/backend/model/association_rules.pkl')


class MovieRequest(BaseModel):
    moviesNames: List[str]
    genre: str

    


@app.post('/predict')
async def get_recommendation(data: MovieRequest):
    recommendations = get_recommendations(data.moviesNames, association_rules_loaded,movie_map)

    if recommendations :
      recommendations = get_movies_names(recommendations,movie_map)

 
    return {"recommendations": recommendations}

@app.post('/movie_name/{description}')
async def get_movie_name(description:str):
   
   title = get_movie_title(description,movies_list,model)

   if not title:
      return {'error':"Movie not defined"}
   else:
      return {'title':title}
   
