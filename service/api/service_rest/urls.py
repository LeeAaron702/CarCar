from django.urls import path

from .views import (
    api_appointments,
    api_technicians,
    api_appointment,
    api_technician
)
urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>", api_technician, name="api_technician"),
    path("service_appointments/", api_appointments, name="api_service_appointments"),
    path("service_appointments/<int:id>/", api_appointment, name="api_service_appointment"),
    # path("service_history/<str:vin>/", api_appointments, name="api_service_history"),

    
]