from django.db import models


class Campaign(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        PROCESSING = "PROCESSING", "Processing"
        ACTIVE = "ACTIVE", "Active"
        FAILED = "FAILED", "Failed"

    name = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    keywords = models.TextField(help_text="Comma separated keywords")

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    external_id = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        help_text="Amazon Ads external campaign ID",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"
