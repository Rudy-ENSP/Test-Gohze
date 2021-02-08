ORIENT=['N','E','W','S']

def get_file_info(file):
    file_object  = open("test.txt", "r")
    content=file_object.readlines()
    file_object.close()

    return(content)

class tondeuse:
  position=[0,0]
  orientation=""
  def mouvement_tondeuse(sequence,tondeuse):
        for i in range(len(sequence)):
          indice=ORIENT.index(tondeuse.orientation) 
          if (sequence[i]=="D"):
              tondeuse.orientation=ORIENT[indice+1]
          if (sequence[i]=="G"):
              tondeuse.orientation=ORIENT[indice-1]
          if (sequence[i]=="A"):
              directon=tondeuse.orientation
              if (directon=="N"):
                  tondeuse.position[0]=tondeuse.position[0]+1
              if (directon=="S"):
                  tondeuse.position[0]=tondeuse.position[0]-1
              if (directon=="E"):
                  tondeuse.position[0]=tondeuse.position[1]-1
              if (directon=="W"):
                  tondeuse.position[0]=tondeuse.position[1]+1
    
              



              
            




    