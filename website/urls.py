from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'html/[a-zA-Z]+$', views.checker, name='checker'),
    url(r'^html/(?P<filename>[a-zA-Z]*)/?$', views.checker, name='checker'),
    url(r'', views.layout, name='layout'),
]
