from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.
def index(request):
        return HttpResponse("Index!")

def checker(request):
        return HttpResponse("The checker function")
