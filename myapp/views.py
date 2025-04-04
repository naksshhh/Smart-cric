from django.shortcuts import render
from django.http import HttpResponse

def Home(request):
    context={
        'title':'Welcome to Smart-cricket',
        'message':'This is dynamic message'
    }
    return render(request,'myapp/home.html',context)
def about(request):
    return render(request,'myapp/about.html')

# Create your views here.
