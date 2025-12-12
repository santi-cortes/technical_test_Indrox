from django.contrib import admin
from .models import Campaign


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "status",
        "budget",
        "external_id",
        "created_at",
    )
    list_filter = ("status",)
    search_fields = ("name", "external_id")
