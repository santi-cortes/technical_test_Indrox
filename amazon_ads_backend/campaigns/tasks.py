from celery import shared_task
from django.utils import timezone
import logging

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
    logger.info(f"[Celery] Iniciando task update_campaign_status para campaign_id={campaign_id}")

    try:
        campaign = Campaign.objects.get(id=campaign_id)
        logger.info(f"[Celery] Obtenida campaña: {campaign.name} ({campaign.id}) con status {campaign.status}")

        response = create_campaign(
            name=campaign.name,
            budget=campaign.budget,
            keywords=campaign.keywords,
        )

        campaign.external_id = response["external_id"]
        campaign.status = response["status"]
        campaign.save(update_fields=["external_id", "status", "updated_at"])

        logger.info(f"[Celery] Campaña {campaign.id} actualizada correctamente: {campaign.status}")
        return {"campaign_id": campaign.id, "status": campaign.status}

    except Campaign.DoesNotExist:
        logger.error(f"[Celery] Campaña con id {campaign_id} no encontrada")
        raise

    except AmazonAdsError as e:
        logger.warning(f"[Celery] Error al actualizar campaña {campaign_id}: {e}. Reintentando...")
        raise

@shared_task(bind=True, autoretry_for=(AmazonAdsError,), retry_backoff=30, retry_kwargs={"max_retries": 3})
def refresh_campaign_status(self):
    """
    Actualiza el estado de campañas que ya tienen external_id
    """
    campaigns = Campaign.objects.filter(
        external_id__isnull=False
    ).exclude(status=Campaign.Status.ACTIVE)

    logger.info(f"Ejecutando refresh_campaign_status, {campaigns.count()} campañas pendientes de actualizar")

    for campaign in campaigns:
        try:
            response = create_campaign(
                name=campaign.name,
                budget=campaign.budget,
                keywords=campaign.keywords,
            )

            old_status = campaign.status
            campaign.status = response["status"]
            campaign.updated_at = timezone.now()
            campaign.save(update_fields=["status", "updated_at"])

            logger.info(
                f"Campaña {campaign.id} actualizada: {old_status} → {campaign.status}"
            )

        except AmazonAdsError as e:
            campaign.updated_at = timezone.now()
            campaign.save(update_fields=["updated_at"])
            logger.warning(f"Campaña {campaign.id} fallo al actualizar: {e}")
            continue