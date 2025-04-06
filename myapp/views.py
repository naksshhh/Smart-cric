from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
import requests
from dotenv import load_dotenv
from .models import Player
from ml_models.prediction_service import predict_score
from utils.fetch_match_id import get_ongoing_matches
load_dotenv()

def Home(request):
    context={
        'title':'Welcome to Smart-cricket',
        'message':'This is dynamic message'
    }
    return render(request,'myapp/home.html',context)
def about(request):
    return render(request,'myapp/about.html')

api_key=os.getenv("API_KEY")
match_id=get_ongoing_matches(api_key,series_id="d5a498c8-7596-4b93-8ab0-e0efc3345312")["id"] #to be fetched
def fetch_live_score(request):
    url = f"https://api.cricapi.com/v1/match_bbb?apikey={api_key}&id={match_id}"
    response = requests.get(url)
    return JsonResponse(response.json())

@api_view(['POST'])
def predict_score_view(request):
    features = request.data
    prediction=predict_score(features)
    return Response({'predicted_score': prediction[0]})



# Create your views here.
