from django.urls import path

from app_auction.api.views import CommentInfoAPIView

urlpatterns = [
    path('comments/', CommentInfoAPIView.as_view(), name='comments_api'),
]
