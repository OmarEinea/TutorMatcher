from django.shortcuts import render


# Create your views here.
def layout(request):
    return render(request, 'layout.html')


def checker(request, filename):
    # return HttpResponse("The checker function"+" "+filename)
    return render(request, (filename if filename else 'index') + '.html')
