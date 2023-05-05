from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Appointment, Technician
from common.json import ModelEncoder
from datetime import date


# Create your views here.
# get all techs (get post)
# get all appoint by vin (get post)

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number'
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'customer_name',
        'description',
        'date_time',
        'technician',
        'VIP',
        # 'year',
        # 'model',
        # 'color',
        'vin',
        'completed',
        'in_progress',
        'id'
    ]
    encoders = {
        'technician': TechnicianEncoder(),

    }


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":  # get list of techs
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianEncoder,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"Error": "Technicians do not exist"}, status=400
            )
    else:  # create a new tech
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"Error": "Technician does not exist"}
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(employee_number=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {
                    "Error": "Invalid Technician Employee Number"
                },
                status=400
            )
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(employee_number=id)
            technician.delete()
            return JsonResponse(
                {"Deleted": "Sucessfully deleted 1 Technician"}
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_number=id)
            for key, value in content.items():
               setattr(technician, key, value)
            technician.save()
            return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
        except Technician.DoesNotExist:
            return JsonResponse(
            {"message": "Invalid Technician Employee Number"},
            status=400,
        )


@require_http_methods(["GET", "POST"])
def api_appointments(request, vin=None):  # this was hard
    if request.method == "GET":  # get all appointments for a list
        try:
            if vin is not None:
                appointments = Appointment.objects.filter(vin=vin)
            else:
                appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"Error": "Appointments do not exist"}
            )
    else:  # create a new appoinment
        try:
            content = json.loads(request.body)
            try:
                technician = Technician.objects.get(
                    employee_number=content["technician"])
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"Error": "Invalid employee number"}, status=400
                )
            try:
                if AutomobileVO.objects.get(vin=content["vin"]) is not None:
                    content["VIP"] = True
            except AutomobileVO.DoesNotExist:
                content["VIP"] = False
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"Error": "Cannot create appointment"}
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {
                    "Error": "Invalid appointment ID number."
                },
                status=400
            )
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"Error": "Appointment does not exist"})
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = Technician.objects.get(
                    employee_number=content["technician"]
                )
                content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid technician id"}, status=400)

        Appointment.objects.filter(id=id).update(**content)

        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment, encoder=AppointmentEncoder, safe=False
        )
    # Put mainly used for when a appt is canceled or finished it should
        # no longer show up in the list of appointments
