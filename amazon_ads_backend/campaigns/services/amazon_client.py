import random
import time


class AmazonAdsError(Exception):
    """Base exception for Amazon Ads mock errors"""


class AmazonTooManyRequests(AmazonAdsError):
    pass


class AmazonInternalError(AmazonAdsError):
    pass


def create_campaign(name: str, budget: float, keywords: str) -> dict:
    """
    Simula la creación de una campaña en Amazon Ads
    """

    time.sleep(0.3)
    if random.random() < 0.2:
        if random.choice([True, False]):
            raise AmazonTooManyRequests("429 Too Many Requests")
        else:
            raise AmazonInternalError("500 AWS Internal Error")

    external_id = f"AMZ-{random.randint(10000, 99999)}"

    status = random.choice(["PROCESSING", "ACTIVE"])

    return {
        "external_id": external_id,
        "status": status,
    }
