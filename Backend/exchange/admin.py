from . import models
from django.contrib import admin

# Register your models here.
admin.site.register(models.Coin)
admin.site.register(models.Basket)
admin.site.register(models.Sector)
admin.site.register(models.Profile)