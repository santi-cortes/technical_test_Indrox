from rest_framework import generics, status
from rest_framework.response import Response

from campaigns.models import Campaign
from campaigns.serializers import CampaignSerializer
from campaigns.tasks import update_campaign_status


class CampaignListCreateView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all().order_by("-created_at")
    serializer_class = CampaignSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        campaign = serializer.save(status=Campaign.Status.PENDING)

        # update_campaign_status.delay(campaign.id)

        output_serializer = self.get_serializer(campaign)
        headers = self.get_success_headers(output_serializer.data)

        return Response(
            output_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
