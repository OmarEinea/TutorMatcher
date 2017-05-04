from django.http import HttpResponse


# Create your views here.
def response(filename):
    return HttpResponse(open('website/templates/{}.html'.format(filename)).read())


def layout(request):
    return response('layout')


def checker(request, filename):
    # return HttpResponse("The checker function"+" "+filename)
    return response(filename.lower() if filename else 'index')
