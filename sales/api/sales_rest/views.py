from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "color",
        "year",
        "vin",
        "model",
        "is_sold",
        "picture_url",
        "manufacturer",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "price",
        "sales_person",
        "customer",
        "automobile",
        "id",
    ]

    encoders ={
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder()
        }



@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return  JsonResponse(
            {"sales_persons":sales_persons},
            encoder = SalesPersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe = False,
            )
        except:
            response = JsonResponse(
                {"Error": "Sales Person was not created"},
                status=400,
            )
            return response


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return  JsonResponse(
            {"customers":customers},
            encoder = CustomerEncoder
    )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe = False,
            )
        except:
            response = JsonResponse(
                {"Error": "Customer was not created"},
                status=400,
            )
            return response


@require_http_methods(["GET", "POST"])
def api_sales_records(request):
    if request.method == "GET":
        sales_records = SalesRecord.objects.all()
        return  JsonResponse(
            {"sales_records":sales_records},
            encoder = SalesRecordEncoder
    )
    else:
        content = json.loads(request.body)
        try:
            sales_person = SalesPerson.objects.get(name=content["sales_person"])
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            response = JsonResponse(
                {"Error": "Sales person does not exist"}
            )

        try:
            customer = Customer.objects.get(name=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"Error": "Customer does not exist"}
            )


        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            automobile.is_sold = True
            automobile.save()
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"Error": "Automobile does not exist"}
            )
        except:
            response = JsonResponse(
            {"Error": "Could not update to sold"}
            )


        try:
            sales_record = SalesRecord.objects.create(**content)
            return JsonResponse(
                sales_record,
                encoder= SalesRecordEncoder,
                safe = False
            )
        except:
            response = JsonResponse(
                {"Error": "Sales Record was not created"},
                status=400,
            )
        return response

@require_http_methods(["GET"])
def api_automobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return  JsonResponse(
            {"automobiles":automobiles},
            encoder = AutomobileVOEncoder,
            safe=False
        )

