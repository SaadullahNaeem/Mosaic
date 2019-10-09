from django.db import models
from django.conf import settings
from django.dispatch import receiver
from taggit.managers import TaggableManager
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# Create your models here.
ROLES = (
    (0, 'Free'),
    (1, 'Admin'),
    (2, 'Premium'),
)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.IntegerField(choices=ROLES, default=0)
    points = models.IntegerField(default=0)
    favorites = models.ManyToManyField('Basket', blank=True)

    def __str__(self):
        return str(self.user)

    def as_dict(self):
        return str(self.user)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Coin(models.Model):
    name = models.CharField(blank=True, max_length=150)
    ticker = models.CharField(blank=True, max_length=10)

    def __str__(self):
        return self.ticker


class Sector(models.Model):
    name = models.CharField(blank=True, max_length=150)
    description = models.CharField(blank=True, max_length=2000)
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.name


class Basket(models.Model):
    name = models.CharField(blank=True, max_length=150)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=False)
    rating = models.IntegerField(default=0)
    description = models.CharField(blank=True, max_length=2000)
    underlying = models.ManyToManyField('Coin', blank=True)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE, null=True, blank=True)
    views = models.IntegerField(default=0)
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.name


class Like(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE, blank=False)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=False)

    def as_dict(self):
        return {'basket_id': self.basket.id,}