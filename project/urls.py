
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/mediums/', include('mediums.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/favourites/', include('favourites.urls')),
    path('api/', include('jwt_auth.urls')),
    path('api/users/', include('jwt_auth.urls')),
    re_path(r'^.*$', index)

]
