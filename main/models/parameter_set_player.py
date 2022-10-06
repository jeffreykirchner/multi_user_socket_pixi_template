'''
parameterset player 
'''

from django.db import models

from main.models import ParameterSet

import main

class ParameterSetPlayer(models.Model):
    '''
    session player parameters 
    '''

    parameter_set = models.ForeignKey(ParameterSet, on_delete=models.CASCADE, related_name="parameter_set_players")

    id_label = models.CharField(verbose_name='ID Label', max_length = 2, default="1")         #id label shown on screen to subjects
    start_x = models.IntegerField(verbose_name='Start Location X', default=50)                #starting location x and y
    start_y = models.IntegerField(verbose_name='Start Location Y', default=50)
    hex_color = models.CharField(verbose_name='Hex Color', max_length = 8, default="0x000000") #color of player

    timestamp = models.DateTimeField(auto_now_add= True)
    updated= models.DateTimeField(auto_now= True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Parameter Set Player'
        verbose_name_plural = 'Parameter Set Players'
        ordering=['id_label']

    def from_dict(self, source):
        '''
        copy source values into this period
        source : dict object of parameterset player
        '''

        self.id_label = source.get("id_label")
        self.start_x = source.get("start_x")
        self.start_y = source.get("start_y")
        self.hex_color = source.get("hex_color")

        self.save()
        
        message = "Parameters loaded successfully."

        return message

    def json(self):
        '''
        return json object of model
        '''
        
        return{

            "id" : self.id,
            "id_label" : self.id_label,
            "start_x" : self.start_x,
            "start_y" : self.start_y,
            "hex_color" : self.hex_color,
        }
    
    def json_for_subject(self):
        '''
        return json object for subject screen
        '''

        return{

            "id" : self.id,
            "id_label" : self.id_label,
            "start_x" : self.start_x,
            "start_y" : self.start_y,
            "hex_color" : self.hex_color,
        }


