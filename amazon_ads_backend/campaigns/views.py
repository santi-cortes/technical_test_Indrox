from rest_framework import generics, status
from rest_framework.response import Response

from .models import Campaign
from .serializers import CampaignSerializer
from .services.amazon_client import (
    create_campaign,
    AmazonAdsError,
)


class CampaignListCreateView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all().order_by("-created_at")
    serializer_class = CampaignSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        campaign = serializer.save(status=Campaign.Status.PENDING)

        try:
            amazon_response = create_campaign(
                name=campaign.name,
                budget=campaign.budget,
                keywords=campaign.keywords,
            )

            campaign.external_id = amazon_response["external_id"]
            campaign.status = amazon_response["status"]
            campaign.save(update_fields=["external_id", "status", "updated_at"])

        except AmazonAdsError as e:
            campaign.status = Campaign.Status.FAILED
            campaign.save(update_fields=["status", "updated_at"])

        output_serializer = self.get_serializer(campaign)
        headers = self.get_success_headers(output_serializer.data)

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
