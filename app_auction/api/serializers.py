from rest_framework import serializers
from app_auction.models import Comment


class CommentInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = (
            'name',
            'text',
            'price',
            'pic',
        )
