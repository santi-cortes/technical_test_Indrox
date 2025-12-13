
# Proyecto de Campañas - Frontend y Backend

## Descripción

Este proyecto tiene como objetivo crear una plataforma para gestionar campañas publicitarias simuladas con Amazon Ads. La plataforma cuenta con un backend en Django y un frontend en React, permitiendo crear, visualizar y actualizar campañas de manera sencilla.

## Tecnologías usadas

### Backend
- **Django**: Framework web en Python.
- **Django REST Framework**: Para crear la API RESTful.
- **Celery**: Para la ejecución de tareas asíncronas como la actualización periódica del estado de las campañas.
- **Redis**: Como broker para Celery.
- **Zod**: Para la validación de formularios en el frontend.

### Frontend
- **React**: Biblioteca de JavaScript para crear interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para React.
- **React Query**: Para el manejo eficiente de la caché de datos y refetching en el frontend.
- **Tailwind CSS**: Framework de diseño para crear interfaces modernas y responsivas.

## Instrucciones de ejecución

### Backend

1. Clonar el repositorio del backend:
   ```bash
   git clone <url del repositorio>
   cd amazon_ads_backend
   ```

2. Crear un entorno virtual y activarlo:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Linux/macOS
   venv\Scriptsctivate     # En Windows
   ```

3. Instalar las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configurar el archivo `.env` con los valores necesarios.

5. Realizar las migraciones de la base de datos:
   ```bash
   python manage.py migrate
   ```

6. Iniciar el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

### Frontend

1. Clonar el repositorio del frontend:
   ```bash
   git clone <url del repositorio>
   cd amazon_ads_frontend
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Visita `http://localhost:5173` para interactuar con la aplicación.

## Características

### Backend
- **Crear campañas**: Endpoint POST `/api/campaigns/` para crear nuevas campañas.
- **Listar campañas**: Endpoint GET `/api/campaigns/` para listar todas las campañas con su estado.
- **Actualización periódica**: Cada minuto se actualiza el estado de las campañas a través de una tarea programada con Celery.

### Frontend
- **Formulario de creación de campaña**: Permite ingresar nombre, presupuesto y keywords.
- **Listado de campañas**: Muestra todas las campañas creadas con sus detalles y estado.
- **Actualización en tiempo real**: Las campañas se actualizan dinámicamente cada 5 segundos utilizando React Query.
- **Búsqueda**: Se implementó un buscador que filtra las campañas por nombre.
- **Paginación**: El listado de campañas cuenta con paginación para mejorar la visualización en caso de muchas campañas.

## Cómo contribuir

1. Fork el repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`).
3. Haz tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Push a la rama (`git push origin feature/nueva-caracteristica`).
5. Crea un Pull Request.