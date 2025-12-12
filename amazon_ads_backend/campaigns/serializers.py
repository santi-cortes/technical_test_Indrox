from rest_framework import serializers
from .models import Campaign


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [
            "id",
            "name",
            "budget",
            "keywords",
            "status",
            "external_id",
            "created_at",
        ]
        read_only_fields = ["id", "status", "external_id", "created_at"]
