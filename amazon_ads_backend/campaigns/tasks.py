from celery import shared_task
from campaigns.models import Campaign
from campaigns.services.amazon_client import create_campaign, AmazonAdsError


@shared_task(bind=True, autoretry_for=(AmazonAdsError,), retry_kwargs={"max_retries": 3, "countdown": 5})
def update_campaign_status(self, campaign_id):
    """
    Consulta (mock) Amazon Ads y actualiza el estado de la campaña
    """

    campaign = Campaign.objects.get(id=campaign_id)

    response = create_campaign(
        name=campaign.name,
        budget=campaign.budget,
        keywords=campaign.keywords,
    )

    campaign.status = response["status"]
    campaign.save(update_fields=["status", "updated_at"])
