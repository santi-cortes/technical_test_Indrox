# Usa una imagen base de Python
FROM python:3.9-slim

# Establece un directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de dependencias al contenedor
COPY requirements.txt /app/

# Instala las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Crea un entorno virtual
RUN python -m venv /venv

# Instala las dependencias de Python desde requirements.txt
RUN /venv/bin/pip install --upgrade pip
RUN /venv/bin/pip install -r requirements.txt

# Copia el resto del código de tu proyecto al contenedor
COPY . /app/

# Expon el puerto de la aplicación Django
EXPOSE 8000

# Comando para iniciar el servidor de Django
CMD ["/venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
