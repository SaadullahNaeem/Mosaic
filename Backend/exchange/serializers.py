from .models import *
from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

# Create your serializers here.
class CoinSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coin
		fields = '__all__'


class SectorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Sector
		fields = '__all__'


class BasketSerializer(serializers.ModelSerializer):
	sector = SectorSerializer()
	underlying = CoinSerializer(many=True)

	class Meta:
		model = Basket
		fields = "__all__"