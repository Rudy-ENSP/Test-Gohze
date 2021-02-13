from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Partie(models.Model):
    id = models.AutoField(primary_key=True)
    extremedroite=models.CharField(max_length=250)
    data_tondeuse1=models.CharField(max_length=250)
    data_tondeuse2=models.CharField(max_length=250)
    data_tondeuse3=models.CharField(max_length=250)
    sequence1=models.CharField(max_length=250)
    sequence2=models.CharField(max_length=250)
    sequence3=models.CharField(max_length=250)
    sortie1=models.CharField(max_length=250)
    sortie2=models.CharField(max_length=250)
    sortie3=models.CharField(max_length=250)
    def __str__(self):
    	return str(self.id)

