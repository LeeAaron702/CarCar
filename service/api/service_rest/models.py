from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=10000)

    def __str__(self):
        return f"{self.model}, {self.vin}"
    
class Technician(models.Model):
    name = models.CharField(max_length=250)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}, {self.employee_number}"

    def get_api_url(self):
        return reverse('api_technicians', kwargs={'id': self.id})

class Appointment(models.Model):
    # car
    # color = models.CharField(max_length=50, null=True)
    # year = models.PositiveSmallIntegerField(null=True)
    vin = models.CharField(max_length=17)   
    # model = models.CharField(max_length=50, null=True)
    # appointment info
    customer_name = models.CharField(max_length=250) 
    date_time = models.DateTimeField(null=True) 
    description = models.TextField() 
    VIP = models.BooleanField(default=False, null=True)
    completed = models.BooleanField(default=False, null=True)
    in_progress = models.BooleanField(default=False, null=True)

    technician = models.ForeignKey(
        Technician,
        related_name='appointments',
        on_delete=models.PROTECT
    )
    
    def get_api_url(self):
        return reverse('api_service_appointment', kwargs={'id': self.id})
    
    def __str__(self):
        return f"{self.technician.name}, {self.vin}, {self.id}"