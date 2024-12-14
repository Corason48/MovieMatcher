import pickle
import ast
import pandas as pd
from typing import List
from sentence_transformers import util, SentenceTransformer




def parse_to_tuple(value):
    if isinstance(value, str):
        return ast.literal_eval(value)
    return value

def load_association_rules(file_path: str) -> pd.DataFrame:
    with open(file_path, 'rb') as f:
        association_rules = pickle.load(f)

    association_rules['antecedents'] = association_rules['antecedents'].apply(parse_to_tuple)
    association_rules['consequents'] = association_rules['consequents'].apply(parse_to_tuple)

    return association_rules

def get_recommendations(movies: List[str], association_rules: pd.DataFrame,movies_map) -> List[int]:

    recommendations = []
    reverse_movie_map = {v: k for k, v in movies_map.items()}
    for title in movies:
        movie_id = reverse_movie_map.get(title)
        matching_rows = association_rules[
            association_rules['antecedents'].apply(lambda x: int(movie_id) in {int(i) for i in x})
        ]

        for consequents in matching_rows['consequents']:
            recommendations.extend(consequents)

    return recommendations      


def get_movies_names(movies: List[int],movies_map):
    movies_names = []
    for movie in movies:
        
        movie_name =  movies_map[int(movie)]
        
        movies_names.append(movie_name)

    return movies_names  


def get_movie_title(description: str, movies, model):
    title_embeddings = model.encode(movies, convert_to_tensor=True)
    description_embedding = model.encode(description, convert_to_tensor=True)
    cosine_scores = util.cos_sim(description_embedding, title_embeddings)
    
    best_match_idx = cosine_scores.argmax()

    if cosine_scores[0, best_match_idx] > 0.5:
        return movies[best_match_idx]
    else:
        print(f"No good match found for description: {description}")
        return None

   

