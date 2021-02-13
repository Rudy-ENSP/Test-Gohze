from rest_framework.serializers import ModelSerializer,Serializer
from rest_framework import serializers
from .models import Partie


class PartieSerializer(ModelSerializer):

    class Meta:
        model = Partie
        fields = '__all__'

