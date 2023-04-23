from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView

from app_auction.api.filters import CommentFilterSet
from app_auction.api.serializers import CommentInfoSerializer
from app_auction.models import Comment


class CommentInfoAPIView(ListAPIView):
    filterset_class = CommentFilterSet
    filter_backends = (DjangoFilterBackend,)
    serializer_class = CommentInfoSerializer
    queryset = Comment.objects.all().order_by('-id')
