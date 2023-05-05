# CarCar

https://user-images.githubusercontent.com/112150883/236430146-592b5d49-b962-43bb-8817-4dd6b2cb67cc.mp4

Team:
* Lee Seaver - Service Microservice
* Adrian Ma - Sales Microservice
---
## Setup Intructions

1. Using the command below, git clone this repository to your local computer.
    ```
    git clone https://gitlab.com/lee.seaver/project-beta.git
    ```

2.  Change directory to Project-Beta

    ```cd project-beta```

3. Run the following commands to setup docker.

    ```
    docker volume create beta-data
    docker-compose build
    docker-compose up
    ```

### Creating Migrations:
When you change your models, you'll need to make and run migrations. Do not stop your services.

1. Run ``` docker exec -it «api-container-name» bash ``` to connect to the running service that contains your API service.

2. Run ``` python manage.py makemigrations ``` at the container command prompt. Make sure it generates the migration you expected.
3. Run ``` python manage.py migrate ``` to apply the migration.
4. Stop your poller service using Docker Desktop.
5. Start your poller service using Docker Desktop.

### Creating Superuser:

1. Run ```docker exec -it «api-container-name» bash``` to connect to the running service that contains an API service. Look for the services with the name "-api-" in them like in the image below.

    ![alt text](https://s3.us-west-2.amazonaws.com/forge-production.galvanize.com/content/b63d5a0608400e6833f9501ce8d0881d.png)

2. Run  ```python manage.py createsuperuser ``` at the container command prompt and complete for form.

3. Open the correct URL for the microservice that you just created the superuser for:

    * Inventory: http://localhost:8100/admin/
    * Service: http://localhost:8080/admin/
    * Sales: http://localhost:8090/admin/

### Redo your database:
```
    You may need to destroy your database just to get it to a good state.
    You can follow these steps to do that:

        1. Stop all services

    docker container prune -f
    docker volume rm beta-data
    docker volume create beta-data
    docker-compose up
```




---
## Design

The project is CarCar, an application for managing aspects of an automobile dealership, specifically its inventory, service center, and sales.

It is composed of three microservices: Inventory, Service, Sales.


![alt text](https://i.imgur.com/aTlnOsF.jpeg)






---
---
## Service Microservice

[**Add a Technician Form View:** http://localhost:3000/technician/create ](http://localhost:3000/technician/create)

[**Add a Service Appointment Form View:** http://localhost:3000/appointment/create ](http://localhost:3000/appointment/create)

[**Show a List of Appointments View:** http://localhost:3000/appointment/list ](http://localhost:3000/appointment/list)

[**Show Service Appointments by VIN View:** http://localhost:3000/servicehistory ](http://localhost:3000/servicehistory)






### Models
1. AutomobileVO

    AutomobileVO is a value object and instances are created using poller.
    * properties

        * color (color of the automobile)
        * year  (year of the automobile)
        * vin   (vin of autommobile, max length 17 characters)
        * model (model information)

2. Technician

    * properties

        * name   (name of technican)
        * employee_number (employee number is Unique/no duplicate employee numbers)

3. Appointment

    * properties

        * vin   (vin of automobile; max length 17 characters)
        * customer_name  (customer name)
        * date_time (date and time of appointment; format:2023-03-10 T11:54:00+00:0 )
        * description (reason for appointment)
        * VIP    **(Boolean True/False; 'Homies from day 1' is True/isVIP  ;  'Outsiders' is False/notVIP)**
        * completed (Boolean True/False; defaults as false)
        * in_progress (Boolean True/False; defaults as false)
        * technician (ForeignKey to Technician Model)


### CRUD Routes:

**Technicians**

| Action                         | Method | URL                                   |
| -----------                    |--------| ------                                |
| List Technicians               | GET    |http://localhost:8080/api/technicians/
| Create a manufacturer          | POST   |http://localhost:8080/api/technicians/


**Sample POST data:**
```
{
  "name": "Lee",
  "employee_number": 1
}
```

**Expected response data:**

```
{
  "technicians": [
    {
     "name": "lee",
     "employee_number": 1
    }
  ]
}
```

**Service Appointments**

| Action                         | Method | URL                                   |
| -----------                    |--------| ------                                |
| List Service Appointments      | GET    |http://localhost:8080/api/service_appointments/
| Create a Service Appointment   | POST   |http://localhost:8080/api/service_appointments/
| Update a Service Appointment   | PUT    |http://localhost:8080/api/service_appointments/:id/
| Delete a Service Appointment   | DELETE |http://localhost:8080/api/service_appointments/:id/


**Sample POST data:**
```
{
	"vin": "123456789abc",
	"customer_name": "lee",
    "date_time": "2033-03-07T23:50:02+00:00",
	"description": " Oil Change",
	"technician": 6
}
```

**Sample PUT data:**
```
{
  "completed": false
}
```

**Expected response data:**

```
{
"appointments": [
    {
    "href": "/api/service_appointments/1/",
    "customer_name": "Lee Seaver",
    "description": "Oil Change",
    "date_time": "2033-03-07T23:50:02+00:00",
    "technician": {
        "name": "Lee",
        "employee_number": 6
    },
    "VIP": false,
    "vin": "123456789abc",
    "completed": false,
    "in_progress": false,
    "id": 1
    }
]
}
```




---
---
## Sales Microservice


[**Add a Sales Person Form View:** http://localhost:3000/salesperson/create ](http://localhost:3000/salesperson/create)

[**Add a Customer Form View:** http://localhost:3000/customer/create ](http://localhost:3000/customer/create)

[**Create a Sales Record Form View:** http://localhost:3000/salesrecord/create ](http://localhost:3000/salesrecord/create)

[**List All Sales View:** http://localhost:3000/salesrecord ](http://localhost:3000/salesrecord)

[**List All Sales by Sales Person View:** http://localhost:3000/servicehistory ](http://localhost:3000/servicehistory)






### Models
1. AutomobileVO

    AutomobileVO is a value object and instances are created using poller.
    * properties

        * color (color of the automobile)
        * year  (year of the automobile)
        * vin   (vin of autommobile, max length 17 characters)
        * model (model information)
        * is_sold (boolean True/False; is updated to True when sales record created)

2. SalesPerson

    * properties

        * name (sales person name)
        * employee_number (sales person employee number; every employee number is unique)


3. Customer

    * properties

        * name  (customer name)
        * address (customer address)
        * phone_number (customer phone number; max length 15)

4. SalesRecord

    * properties

        * price   (sales price)
        * sales_person (ForeignKey to SalesPerson Model)
        * customer (ForeignKey to Customer Model)
        * automobile (ForeignKey to AutomobileVO Model)



### CRUD Routes:


**Sales Person**

| Action                         | Method | URL                                       |
| -----------                    |--------| ------                                    |
| List Sales Persons             | GET    |http://localhost:8090/api/salespersons/
| Create a Sales Person          | POST   |http://localhost:8090/api/salespersons/


**Sample POST data:**
```
{
  "name": "adrian",
  "employee_number": 1
}
```

**Expected response data:**
 ```
{
"sales_persons": [
	{
	  "name": "adrian",
	  "employee_number": 1
	}
  ]
}
```

**Customer**

| Action                         | Method | URL                                       |
| -----------                    |--------| ------                                    |
| List Customers                 | GET    |http://localhost:8090/api/customers/
| Create a Customer              | POST   |http://localhost:8090/api/customers/


**Sample POST data:**
```
{
  "name": "john",
  "address": "123 address drive",
  "phone_number": 7892349560
}
```

**Expected response data:**
 ```
{
"customers": [
    {
      "name": "john",
      "address": "123 address drive",
      "phone_number": "7892349560"
    }
  ]
}
```


**Sales Record**

| Action                         | Method | URL                                       |
| -----------                    |--------| ------                                    |
| List Sales Records             | GET    |http://localhost:8100/api/manufacturers/
| Create a Sales Record          | POST   |http://localhost:8100/api/manufacturers/



**Sample POST data:**
```
{
  "price": 20000,
  "sales_person": "adrian",
  "customer": "john",
  "automobile": "3AS9DV30DM5"
}
```

**Expected response data:**
 ```
{
  "price": 20000,
  "sales_person": {
    "name": "adrian",
    "employee_number": 1
  },
  "customer": {
    "name": "john",
    "address": "123 address drive",
    "phone_number": "7892349560"
  },
  "automobile": {
    "color": "black",
    "year": 2020,
    "vin": "3AS9DV30DM5",
    "model": "{'href': '/api/models/4/', 'id': 4, 'name': 'model 3',
    'picture_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu0e6Vh0FT1_qELRXZvsuLhkou-4birzqIjf-GUcYsExLebbsVRkqI-bxI2l7hOIWafTnbd6KRGSMN&s=16', 'manufacturer': {'href': '/api/manufacturers/2/', 'id': 2, 'name': 'Tesla'}}",
    "is_sold": true
  }
}
```


---
---
## Inventory Microservice


[**Add a Manufacturer Form View:** http://localhost:3000/manufacturers/create ](http://localhost:3000/manufacturers/create)

[**Manufacturer List View:** http://localhost:3000/manufacturers ](http://localhost:3000/manufacturers)


[**Add a Vehicle Model Form View:** http://localhost:3000/models/create ](http://localhost:3000/models/create)

[**Vehicle Model List View:** http://localhost:3000/models ](http://localhost:3000/models)


[**Add an Automobile Form View:** http://localhost:3000/automobile/create ](http://localhost:3000/automobile/create)

[**Automobile List View:** http://localhost:3000/automobile ](http://localhost:3000/automobile)


### Models
1. Manufacturer

    * properties

        * name (name of manufacturer, every manufacturer is unique)


2. VehicleModel

    * properties

        * name (vehicle model)
        * picture_url (url for picture of vehiclemodel)
        * manufacturer (Foreign Key to Manufacturer)



3. Automobile

    * properties

        * color (color of the automobile)
        * year  (year of the automobile)
        * vin   (vin of autommobile, max length 17 characters; each vin is unique)
        * model (Foreign Key to VehicleModel)





### CRUD Routes:


**Manufacturer**

| Action                         | Method | URL                                   |
| -----------                    |--------| ------                                |
| List manufacturers             | GET    |http://localhost:8100/api/manufacturers/
| Create a manufacturer          | POST   |http://localhost:8100/api/manufacturers/
| Get a specific manufacturer    | GET    |http://localhost:8100/api/manufacturers/:id/
| Update a specific manufacturer | PUT    |http://localhost:8100/api/manufacturers/:id/
| Delete a specific manufacturer | DELETE |http://localhost:8100/api/manufacturers/:id/

**Sample POST data:**
```
{
  "name": "Chrysler"
}
```

**Expected response data:**
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

**Vehicle Models**

| Action                         | Method | URL                                   |
| -----------                    |--------| ------                                |
| List vehicle models            | GET    |http://localhost:8100/api/models/
| Create a vehicle model         | POST   |http://localhost:8100/api/models/
| Get a specific vehicle model   | GET    |http://localhost:8100/api/models/:id/
| Update a specific vehicle model| PUT    |http://localhost:8100/api/models/:id/
| Delete a specific vehicle model| DELETE |http://localhost:8100/api/models/:id/


**Sample POST data:**
```
{
  "name": "Sebring",
  "picture_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

**Expected response data:**

```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```


**Automobile Information**

| Action                         | Method | URL                                   |
| -----------                    |--------| ------                                |
| List vehicle models            | GET    |http://localhost:8100/api/models/
| Create a vehicle model         | POST   |http://localhost:8100/api/models/
| Get a specific vehicle model   | GET    |http://localhost:8100/api/models/:id/
| Update a specific vehicle model| PUT    |http://localhost:8100/api/models/:id/
| Delete a specific vehicle model| DELETE |http://localhost:8100/api/models/:id/


**Sample POST data:**
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

**Expected response data:**

```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
