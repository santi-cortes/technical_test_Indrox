from rest_framework import generics
from .models import Campaign
from .serializers import CampaignSerializer


class CampaignListCreateView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all().order_by("-created_at")
    serializer_class = CampaignSerializer
