import uuid

from django.db import models

# Create your models here.
class Transaction(models.Model):
    id = models.URLField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='EUR')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.text} ({self.amount} {self.currency})"