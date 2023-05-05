from django.contrib import admin
from .models import AutomobileVO, Technician, Appointment
# Register your models here.
@admin.register(AutomobileVO)
class AutoMobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass

