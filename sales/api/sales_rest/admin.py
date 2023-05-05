from django.contrib import admin

# Register your models here.

from .models import AutomobileVO, SalesPerson, Customer, SalesRecord


@admin.register(AutomobileVO)
class AutoMobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass
