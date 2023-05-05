from django.db import models
from django.urls import reverse

# Create your models here.


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=10000, null=True)
    is_sold= models.BooleanField(null=True, default=False)
    picture_url = models.URLField(null=True)
    manufacturer = models.CharField(max_length=10000,null=True)


    def __str__(self):
        return f"{self.vin}"

    def get_api_url(self):
        return reverse("api_automobileVO", kwargs={"pk":self.id})



class SalesPerson(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}"

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk":self.id})


class Customer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length = 15)

    def __str__(self):
        return f"{self.name}"

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk":self.id})



class SalesRecord(models.Model):
    price = models.PositiveIntegerField()
    sales_person = models.ForeignKey(
       SalesPerson,
       related_name= "sales_record",
       on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
       Customer,
       related_name= "sales_record",
       on_delete=models.PROTECT
    )
    automobile = models.ForeignKey(
       AutomobileVO,
       related_name= "sales_record",
       on_delete=models.PROTECT
    )

    def __str__(self):
        return f'{self.id}'


    def get_api_url(self):
        return reverse("api_sales_records", kwargs={"pk":self.id})








