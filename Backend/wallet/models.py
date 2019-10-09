from django.db import models
from exchange.models import Profile

# Create your models here.
class Wallet(models.Model):
	owner = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=False)
	wallet = models.CharField(blank=True, max_length=150)
	public_key = models.CharField(blank=True, max_length=500)
	private_key = models.CharField(blank=True, max_length=500)

	def __str__(self):
		return self.public_key