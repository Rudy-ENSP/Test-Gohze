
from django.shortcuts import render
from django.core import serializers
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view, action,permission_classes
from rest_framework.response import Response

from django.contrib.auth import authenticate, get_user_model, logout, login
from django.shortcuts import get_object_or_404, get_list_or_404

from .models import Partie
from .serializers import PartieSerializer
import matplotlib.pyplot as plt


# Create your views here.
ORIENT=['N','E','S','W']
pelouse=[5,5]
class Tondeuse:
  position=[0,0]
  orientation=""

    
  def __repr__(self):
    return "<Tondeuse: Position = " + str(self.position) + "; orientation = " + str(self.orientation) + ">" 

def get_file_info(file):
    file_object  = open(file, "r")
    content=file_object.readlines()
    file_object.close()

    return(content)
def mouvement_tondeuse(sequence,tondeuse):
        for i in range(len(sequence)):
          #print(len(sequence))
          indice=ORIENT.index(tondeuse.orientation) 
          #print(indice)
          if (sequence[i]=="D"):
                if(tondeuse.orientation=="W"):
                  tondeuse.orientation="N"
                else:
                  tondeuse.orientation =ORIENT[indice+1]
          if (sequence[i]=="G"):
             if(tondeuse.orientation=="N"):
               tondeuse.orientation="W"
             else:
               tondeuse.orientation=ORIENT[indice-1]
          if (sequence[i]=="A"):
              directon=tondeuse.orientation
              if (directon=="N"):
                if(int(tondeuse.position[1])<int(pelouse[1])):
                  tondeuse.position[1]=tondeuse.position[1]+1
              if (directon=="S"):
                if(int(tondeuse.position[1])>0):
                  tondeuse.position[1]=tondeuse.position[1]-1
              if (directon=="E"):
                if(int(tondeuse.position[0])<int(pelouse[0])):
                  tondeuse.position[0]=tondeuse.position[0]+1
              if (directon=="W"):
                if(int(tondeuse.position[0])>0):
                   tondeuse.position[0]=tondeuse.position[0]-1
                
        
        return tondeuse

@api_view(['POST'])
def move_tondeuse(request):
    print(request.data)
    droite=request.data['extremedroite'].split()
    pelouse=[int(droite[0]),int(droite[1])]
    print(pelouse)

    sequence1=request.data['sequence1'].upper()
    print(sequence1)
    sequence2=request.data['sequence2'].upper()
    print(sequence2)
    sequence3=request.data['sequence3'].upper()
    print(sequence3)

    tond1=Tondeuse()
    position1=request.data['datatond1'].split()
    tond1.position=[int(position1[0]),int(position1[1])]
    tond1.orientation=position1[2]
    print(tond1)
    result1=mouvement_tondeuse(sequence1,tond1)
    tondeuse1={"positionX":result1.position[0],"positionY":result1.position[1],"orientation":result1.orientation}
    sortie1=str(result1.position[0])+" "+str(result1.position[1])+ " "+ result1.orientation
    print(sortie1)
    tond2=Tondeuse()
    position2=request.data['datatond2'].split()
    tond2.position=[int(position2[0]),int(position2[1])]
    tond2.orientation=position2[2]
    print(tond2)
    result2=mouvement_tondeuse(sequence2,tond2)
    flag=(result2.position==result1.position)
    while (flag):
        tond2new1=[]
        if (result2.position==result1.position):
          print("COLLISION")
          if (sequence2.find('A')!=-1):
            last_deplacement=sequence2.rindex("A")
            sequence2=sequence2[0:last_deplacement]
            print("sequence 2 new :"+sequence2)
            tond2new1=Tondeuse()
            position2=request.data['datatond2'].split()
            tond2new1.position=[int(position2[0]),int(position2[1])]
            tond2new1.orientation=position2[2]
            result2=mouvement_tondeuse(sequence2,tond2new1)
            flag=True
          else:
            flag=False
        else:
          flag=False

    tondeuse2={"positionX":result2.position[0],"positionY":result2.position[1],"orientation":result2.orientation}
    sortie2=str(result2.position[0])+" "+str(result2.position[1])+ " "+ result2.orientation

    tond3=Tondeuse()
    position3=request.data['datatond3'].split()
    tond3.position=[int(position3[0]),int(position3[1])]
    tond3.orientation=position3[2]
    print(tond3)
    result3=mouvement_tondeuse(sequence3,tond3)
    flag=(result3.position==result1.position)
    while (flag):
        tond3new1=[]
        if (result3.position==result1.position):
          if (sequence3.find('A')!=-1):
            print("COLLISION")
            last_deplacement3=sequence3.rindex("A")
            sequence3=sequence3[0:last_deplacement3]
            print("sequence 3 new :"+sequence3)
            tond3new1=Tondeuse()
            position3=request.data['datatond3'].split()
            tond3new1.position=[int(position3[0]),int(position3[1])]
            tond3new1.orientation=position3[2]
            result3=mouvement_tondeuse(sequence3,tond3new1)
            flag=True
          else:
            flag=False
        else:
          flag=False
    
    flag=(result3.position==result2.position)
    while (flag):
        tond3new2=[]
        if (result3.position==result2.position):
          if (sequence3.find('A')!=-1):
            print("COLLISION")
            last_deplacement3=sequence3.rindex("A")
            sequence3=sequence3[0:last_deplacement3]
            print("sequence 3 new :"+sequence3)
            tond3new2=Tondeuse()
            position3=request.data['datatond3'].split()
            tond3new2.position=[int(position3[0]),int(position3[1])]
            tond3new2.orientation=position3[2]
            result3=mouvement_tondeuse(sequence3,tond3new2)
            flag=True
          else:
            flag=False
        else:
          flag=False
    print(result3)

    tondeuse3={"positionX":result3.position[0],"positionY":result3.position[1],"orientation":result3.orientation}
    sortie3=str(result3.position[0])+" "+str(result3.position[1])+ " "+ result3.orientation
    # Ajout de la partie dans l'historique

    partie = Partie(extremedroite=request.data['extremedroite'])
    partie.sequence1 = request.data['sequence1'].upper()
    partie.sequence2 = request.data['sequence2'].upper()
    partie.sequence3 = request.data['sequence3'].upper()
    partie.data_tondeuse1 =request.data['datatond1']
    partie.data_tondeuse2 =request.data['datatond2']
    partie.data_tondeuse3 =request.data['datatond3']
    partie.sortie1=sortie1
    partie.sortie2=sortie2
    partie.sortie3=sortie3
    partie.save()


    return JsonResponse({"state":"success",
    'tondeuse1':tondeuse1,
    'tondeuse2':tondeuse2,
    'tondeuse3':tondeuse3,
    
    
    
    })  

@api_view(['GET'])
def listeParties(request):
    liste=[]
    parties = Partie.objects.filter().order_by('id').reverse()
    for i in range(0,5):
      liste.append(parties[i])

    serializer = PartieSerializer(liste,many=True)
    return JsonResponse(serializer.data, safe=False)