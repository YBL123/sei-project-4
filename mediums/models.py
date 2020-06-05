from django.db import models

#* Many to Many requires a joined table
class Medium(models.Model):
    #* i.e artist, musician, director
    creator = models.CharField(max_length=50)
    #* date the post was made
    date_posted = models.DateTimeField()
    #* title of the exhibition, film, song
    title = models.CharField(max_length=100, unique=True)
    #* duration of the film or song
    duration = models.FloatField(blank=True, null=True)
    #* year for the film, song, exhibition 
    year = models.IntegerField()
    #* image for film, exhibition, song
    image = models.CharField(max_length=400)
    #* video for film, exhibition, song
    video = models.CharField(max_length=400, blank=True, null=True)
    #& info for film, exhibition, song
    info = models.TextField(max_length=1000)
    #* exhbition ticket prices
    price = models.CharField(max_length=20, blank=True, null=True)
    #* exhbition start date and end date
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    #* gallery name for art exhibitions
    art_gallery = models.CharField(max_length=50, blank=True, null=True)
    #* gallery location for art exhibitions
    art_gallery_location = models.CharField(max_length=50, blank=True, null=True)

    #! Many To Many
    #* types will be added here


#* once types and genres are added we want to see type too
    def __str__(self):
        return f'{self.title} - {self.creator}'




