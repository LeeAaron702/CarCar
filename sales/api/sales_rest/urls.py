from django.urls import path
from .views import api_sales_person, api_customer, api_sales_records, api_automobileVO



urlpatterns = [
    path("salespersons/", api_sales_person, name="api_sales_person"),
    path("customers/", api_customer, name="api_customer"),
    path("salesrecords/", api_sales_records, name="api_sales_records"),
    path("automobileVOs/", api_automobileVO, name="api_automobileVO"),
]