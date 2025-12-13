const readmeContent = `
# Proyecto de Campañas Amazon Ads

Este es un proyecto completo para la gestión de campañas simuladas para Amazon Ads, utilizando un backend en Django con DRF, un frontend en React + Vite, y Celery con Redis para manejar las tareas asíncronas. 
Este proyecto incluye las funcionalidades para crear campañas, listarlas, y simular la actualización de sus estados.

[Link del despliegue](https://technical-test-indrox-if2n.vercel.app/)

## Backend

El backend está desarrollado en **Django** utilizando **Django REST Framework** para la API. Se usan las siguientes tecnologías y configuraciones:

- **Celery** con **Redis** para la actualización periódica de estados de campañas.
- **Django ORM** para la gestión de datos de campañas en la base de datos.
- **Zod** y **React Query** en el frontend para manejar la validación y la reactividad de las campañas.

### Pasos para correr el backend:

1. Clonar el repositorio y entrar en la carpeta del proyecto:

   \`\`\`bash
   git clone <url-del-repositorio>
   cd amazon_ads_backend
   \`\`\`

2. Crear un entorno virtual:

   \`\`\`bash
   python3 -m venv venv
   source venv/bin/activate  # En Windows usa venv\\Scripts\\activate
   \`\`\`

3. Instalar dependencias:

   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. Configurar Redis y Celery:

   - Asegúrate de tener **Redis** corriendo en tu máquina local o en un contenedor Docker.
   - Ejecutar **Celery** y **Django**:

     \`\`\`bash
     celery -A config worker -l info
     python manage.py runserver
     \`\`\`

5. Hacer migraciones de la base de datos:

   \`\`\`bash
   python manage.py migrate
   \`\`\`

### Docker para el backend:

Si prefieres usar Docker para el backend, puedes construir la imagen de la siguiente manera:

1. Construir la imagen Docker:

   \`\`\`bash
   docker build -t amazon-ads-backend .
   \`\`\`

2. Ejecutar el contenedor Docker:

   \`\`\`bash
   docker run -d -p 8000:8000 amazon-ads-backend
   \`\`\`

## Frontend

El frontend está desarrollado en **React** utilizando **Vite** como bundler. La comunicación con el backend se realiza a través de la API REST proporcionada por el backend de Django.

### Pasos para correr el frontend:

1. Clonar el repositorio y entrar en la carpeta del proyecto:

   \`\`\`bash
   git clone <url-del-repositorio>
   cd amazon_ads_frontend
   \`\`\`

2. Instalar dependencias:

   \`\`\`bash
   npm install
   \`\`\`

3. Ejecutar el frontend:

   \`\`\`bash
   npm run dev
   \`\`\`

### Docker para el frontend:

1. Crear el Dockerfile y construir la imagen:

   \`\`\`bash
   docker build -t amazon-ads-frontend .
   \`\`\`

2. Ejecutar el contenedor Docker:

   \`\`\`bash
   docker run -d -p 8080:80 amazon-ads-frontend
   \`\`\`

Esto expondrá la aplicación en el puerto \`8080\` de tu máquina.

## Características del Proyecto

- **Creación de Campañas:** A través del formulario de la interfaz, los usuarios pueden crear campañas con nombre, presupuesto y keywords (palabras clave).
- **Visualización de Campañas:** Se lista el nombre, presupuesto, keywords, estado y ID externo de las campañas. La lista se actualiza automáticamente cada 5 segundos.
- **Estado de Campaña:** Las campañas pueden tener los siguientes estados: \`PENDING\`, \`PROCESSING\`, \`ACTIVE\`, \`FAILED\`.
- **Simulación de Amazon Ads:** El sistema simula la creación de campañas en Amazon Ads con una probabilidad de error del 20% (error 429 o error 500).

## Tecnologías Utilizadas

- **Backend:** Django, Django REST Framework, Celery, Redis
- **Frontend:** React, Vite, Tailwind CSS, React Query
- **Tareas Programadas:** Celery para la actualización periódica de estados de campañas
- **Docker:** Para contenedores de backend y frontend

## Instrucciones Adicionales

- Si deseas realizar pruebas en un entorno de producción, se recomienda configurar un servidor WSGI (como Gunicorn) para el backend y un servidor Nginx para servir el frontend.
- Asegúrate de tener Redis instalado y corriendo localmente o utilizando Docker.
`;
