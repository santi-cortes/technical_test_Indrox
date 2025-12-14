# 🏷️ amazon-ads-frontend

Este es el *frontend* para el proyecto **Amazon Ads**, construido como una aplicación moderna de página única (**SPA**) para la administración y monitoreo simulado de campañas publicitarias.

---

## 🛠️ Tecnologías y Herramientas

Este proyecto está desarrollado con las siguientes herramientas principales:

| Categoría | Herramienta | Descripción |
| :--- | :--- | :--- |
| **Framework** | **React 19** | Biblioteca principal para construir la interfaz de usuario. |
| **Build Tool** | **Vite** | Empaquetador rápido para el desarrollo y *build* de la aplicación. |
| **Lenguaje** | **TypeScript 5+** | Añade tipado estático para una mejor escalabilidad y mantenimiento. |
| **Estilos** | **Tailwind CSS 4+** | Framework de CSS *utility-first* para un desarrollo de estilos rápido y flexible. |

---

## 📦 Dependencias Clave

| Categoría | Librerías | Propósito |
| :--- | :--- | :--- |
| **Data Fetching** | `@tanstack/react-query`, `axios` | Gestión de caché, sincronización y estado del servidor. |
| **Formularios** | `react-hook-form`, `zod`, `@hookform/resolvers` | Validación y gestión eficiente de formularios. |
| **UX/UI** | `react-tag-input`, `react-hot-toast`, `react-icons` | Componentes avanzados para etiquetas, notificaciones y sistema de iconos. |

---

## ⚙️ Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia la aplicación en modo desarrollo. |
| `npm run build` | Compila la aplicación para producción en la carpeta `dist`. |
| `npm run lint` | Ejecuta **ESLint** para identificar y reportar problemas en el código. |
| `npm run preview` | Sirve la compilación de producción localmente. |

---

## 🔑 Configuración de Entorno

La aplicación requiere una única variable de entorno para establecer la conexión con el servicio de *backend*.

Debe crear un archivo **`.env`** en la raíz del proyecto (o usar la sintaxis específica de su entorno de *deploy*) con la siguiente variable:

| Variable | Tipo | Descripción | Valor por Defecto (si no se define) |
| :--- | :--- | :--- | :--- |
| **`VITE_INDROX_URL_BACKEND`** | URL | URL base del servicio API REST que gestiona las campañas. | `http://localhost:8000` |

---

## 🚀 Instalación y Despliegue

### A. Instalación y Ejecución Local (Sin Docker)

Esta es la forma más sencilla para el desarrollo.

#### 1. Requisitos

* Tener **Node.js 18+** y **npm** instalados localmente.

#### 2. Pasos de Ejecución

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO> amazon_ads_frontend
cd amazon_ads_frontend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de configuración de entorno (opcional)
touch .env
echo "VITE_INDROX_URL_BACKEND=<TU_API_URL>" >> .env

# 4. Iniciar el servidor de desarrollo
npm run dev

# La aplicación estará disponible en la URL indicada por Vite (ej. http://localhost:5173)
```

---

### B. Despliegue con Docker (Producción Recomendada)

Se utiliza un `Dockerfile` multi-etapa que compila la aplicación con **Vite** y la sirve con un servidor web **Nginx:Alpine** ligero.

#### 1. Requisitos

* Tener **Docker** instalado.

#### 2. Pasos de Despliegue

```bash
# 1. Construir la imagen de Docker
# (Este paso ejecuta 'npm install' y 'npm run build' dentro del contenedor)
docker build -t amazon-ads-frontend:latest .

# 2. Ejecutar el contenedor
# Mapear el puerto 80 del contenedor al puerto 3000 de su máquina host
docker run -d --name amazon-ads -p 3000:80 amazon-ads-frontend:latest

# La aplicación estará disponible en http://localhost:3000
```
> **Nota de Nginx para SPAs:** La imagen final de Nginx ya está configurada para manejar las rutas del *client-side routing* de React.

---

## ✨ Estructura y Funcionalidad

### Estructura de Componentes

La aplicación se organiza en torno a dos componentes principales (`App.tsx`):

1.  **`CampaignForm`**: Permite la creación de nuevas campañas.
2.  **`CampaignList`**: Muestra el listado de las campañas, ofreciendo monitoreo y herramientas de filtrado.

### Flujo de Creación de Campañas (`CampaignForm`)

* **Validación:** Usa **`react-hook-form`** con **`zod`** para validar los campos (`name`, `budget`, `keywords`) antes de enviar.
* **Keywords:** Las palabras clave se gestionan con el componente **`react-tag-input`** en un campo controlado.
* **Sincronización:** Tras una creación exitosa, se utiliza `queryClient.invalidateQueries(["campaigns"])` para forzar la actualización del listado.

### Monitoreo de Campañas (`CampaignList`)

El listado es robusto e incluye las siguientes características, todas implementadas con **React Query** para un rendimiento óptimo:

* **Data Fetching:** Se utiliza el *hook* `useCampaigns` que automáticamente re-valida los datos con el *backend* cada **5 segundos** (`refetchInterval: 5000`).
* **Búsqueda (`CampaignSearch`):** Permite el filtrado dinámico de las campañas por el nombre. La búsqueda se aplica en tiempo real (`onChange`).
* **Visualización:** Los datos se presentan en una tabla (`CampaignTable`) con columnas para Nombre, Presupuesto, Keywords, ID Externo y **Status**.
* **Estado Visual (`CampaignStatusBadge`):** Utiliza insignias (`badges`) con colores distintivos (ej. **`PENDING`** - Amarillo, **`ACTIVE`** - Verde, **`FAILED`** - Rojo) para indicar el estado de la campaña.
* **UX Avanzada:**
    * **Paginación:** Las campañas se muestran en bloques de **10 ítems por página** (`Pagination`).
    * **Skeleton:** Mientras se cargan los datos, se muestra un *skeleton* animado (`CampaignSkeleton`) para mejorar la percepción de velocidad.
    * **Refresco Manual:** Incluye un botón de refresco para forzar una consulta inmediata al servidor.