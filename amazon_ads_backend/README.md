# Plataforma de Campañas Amazon Ads (Mock)

## Descripción
Proyecto Full Stack para la gestión de campañas de Amazon Ads de manera simulada.  
Permite:
- Crear campañas locales.
- Guardarlas en la base de datos.
- Mostrar el listado con su estado.
- Actualizar periódicamente el estado de las campañas mediante tareas asíncronas (Celery + Redis).
- Simular errores y estados de Amazon Ads (ACTIVE, PROCESSING, FAILED).

No requiere conexión real a Amazon Ads.

---

## Tecnologías

### Backend
- Python 3.11+
- Django 5
- Django REST Framework
- Celery 5
- Redis (Broker y Backend de resultados)
- SQLite (DB por defecto)

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- React Query (polling cada 5s para refrescar estado de campañas)
- Tailwind CSS (opcional)

---

## Estructura del Backend

```
campaigns/
├─ models.py          # Modelo Campaign con status y external_id
├─ serializers.py     # Serializador CampaignSerializer
├─ views.py           # ListCreateAPIView de campañas
├─ services/
│   └─ amazon_client.py  # Simulación de la API de Amazon Ads
├─ tasks.py           # Tareas Celery para update y refresh
config/
├─ settings.py
├─ celery.py          # Configuración Celery
```

### Campaign Model
```python
class Campaign(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING"
        PROCESSING = "PROCESSING"
        ACTIVE = "ACTIVE"
        FAILED = "FAILED"

    name = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    keywords = models.TextField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    external_id = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

---

### Simulación Amazon Ads (`services/amazon_client.py`)
- Devuelve `external_id` aleatorio: "AMZ-XXXXX".
- Estado aleatorio: ACTIVE o PROCESSING.
- 20% de probabilidad de errores:
  - 429 Too Many Requests
  - 500 AWS Internal Error

---

### Tasks Celery (`tasks.py`)
- `update_campaign_status`: actualiza campaña recién creada (async).
- `refresh_campaign_status`: actualiza campañas existentes cada minuto.
- Configuración de retry automático ante errores simulados.

---

### Configuración Celery (`config/celery.py`)
```python
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
app = Celery("config")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
app.conf.beat_scheduler = "django_celery_beat.schedulers:DatabaseScheduler"
```

---

## Backend - Uso

1. Instalar dependencias:

```bash
python -m venv venv
source venv/Scripts/activate  # Windows PowerShell
pip install -r requirements.txt
```

2. Migrar base de datos:

```bash
python manage.py migrate
```

3. Ejecutar servidor Django:

```bash
python manage.py runserver
```

4. Ejecutar Redis (si está instalado):

```bash
redis-server
```

5. Ejecutar Celery worker y beat:

```bash
celery -A config worker -l info --pool=solo
celery -A config beat -l info
```

6. Endpoints:
- GET /api/campaigns/ → lista todas las campañas.
- POST /api/campaigns/ → crea una campaña:
```json
{
  "name": "Test Campaign",
  "budget": 100,
  "keywords": "python,django,ads"
}
```

---

## Frontend - Uso

1. Crear proyecto Vite + React + TypeScript:

```bash
npm create vite@latest amazon-ads-frontend -- --template react-ts
cd amazon-ads-frontend
npm install
```

2. Instalar dependencias:

```bash
npm install axios @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Estructura sugerida:

```
src/
├─ services/
│   └─ campaignService.ts
├─ components/
│   ├─ CampaignList.tsx
│   └─ CreateCampaign.tsx
├─ queryClient.ts
├─ App.tsx
├─ main.tsx
```

4. React Query refresca campañas cada 5 segundos (`refetchInterval: 5000`).

---

## Testing y Debug
- Puedes probar los endpoints con Postman o cURL.
- Ver logs de Celery para verificar tareas.
- Redis debe estar corriendo antes de disparar tareas Celery.
- Para debug rápido, usa prints o logging dentro de tasks.

---

## Notas
- Todas las interacciones con Amazon Ads son simuladas.
- Manejo de errores simula 429 y 500.
- Polling frontend permite ver cambios de estado en tiempo real.
- Opcional: Dockerizar backend + frontend + Redis.