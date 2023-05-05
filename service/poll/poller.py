import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import AutomobileVO


def get_autos():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            color=automobile["color"],
            year=automobile["year"],
            vin=automobile["vin"],
            model=automobile["model"],
        )



def poll():
    while True:
        print('Service poller polling for Auto data')
        try:
            get_autos()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(1)


if __name__ == "__main__":
    poll()
