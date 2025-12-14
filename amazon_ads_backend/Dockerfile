# Usa una imagen base oficial de Python
FROM python:3.11-slim

# Establece variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala dependencias del sistema necesarias (si las hubiera, no son necesarias para este proyecto)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     # ...

# Copia los archivos de dependencias y las instala
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copia el resto del código de la aplicación
COPY . /app/

# Expone el puerto por defecto de Django
EXPOSE 8000

# Comando por defecto, será sobrescrito por docker-compose
CMD ["/bin/true"]