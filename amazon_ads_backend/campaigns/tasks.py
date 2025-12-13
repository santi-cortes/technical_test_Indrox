from celery import shared_task
from django.utils import timezone

from campaigns.models import Campaign
from campaigns.services.amazon_client import (
    create_campaign,
    AmazonAdsError,
)


@shared_task(
    bind=True,
    autoretry_for=(AmazonAdsError,),
    retry_kwargs={"max_retries": 3, "countdown": 5},
)
def update_campaign_status(self, campaign_id: int):
    """
    Task async que simula la comunicación con Amazon Ads
    y actualiza el estado de la campaña
    """

    campaign = Campaign.objects.get(id=campaign_id)

    response = create_campaign(
        name=campaign.name,
        budget=campaign.budget,
        keywords=campaign.keywords,
    )

    campaign.external_id = response["external_id"]
    campaign.status = response["status"]
    campaign.save(update_fields=["external_id", "status", "updated_at"])



@shared_task(bind=True, autoretry_for=(AmazonAdsError,), retry_backoff=30, retry_kwargs={"max_retries": 3})
def refresh_campaign_status(self):
    """
    Actualiza el estado de campañas que ya tienen external_id
    """
    campaigns = Campaign.objects.filter(
        external_id__isnull=False
    ).exclude(status=Campaign.Status.ACTIVE)

    for campaign in campaigns:
        try:
            response = create_campaign(
                name=campaign.name,
                budget=campaign.budget,
                keywords=campaign.keywords,
            )

            campaign.status = response["status"]
            campaign.updated_at = timezone.now()
            campaign.save(update_fields=["status", "updated_at"])

        except AmazonAdsError:
            raise