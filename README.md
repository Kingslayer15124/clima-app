# App del Clima

Una aplicación web sencilla para consultar el clima actual de cualquier ciudad del mundo. Escribe el nombre de una ciudad y obtén de inmediato la temperatura, la humedad, la velocidad del viento y una descripción del estado del cielo en español.

![Stack](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple)

## Características

- Busca el clima por nombre de ciudad (con geolocalización automática).
- Muestra temperatura actual, humedad, velocidad del viento y estado del cielo.
- Descripciones del clima en español (despejado, nublado, lluvia, nieve, tormentas…).
- Manejo de estados: carga, errores (ciudad no encontrada o problemas con la API).
- Diseño responsive con un degradado de fondo elegido para la app.

## Tecnologías

- [React](https://react.dev) 19
- [Vite](https://vite.dev) 8
- [Open-Meteo API](https://open-meteo.com) — datos meteorológicos y geocodificación
- ESLint con los presets recomendados para React

## Requisitos

- Node.js 18 o superior
- npm (o tu gestor de paquetes favorito)

## Instalación

```bash
# 1. Clona el repositorio
git clone <url-del-repositorio>
cd clima-app

# 2. Instala las dependencias
npm install

# 3. Ejecuta el servidor de desarrollo
npm run dev
```

Abre la URL que indica la terminal (por defecto <http://localhost:5173>).

## Scripts disponibles

| Comando        | Descripción                              |
| -------------- | ---------------------------------------- |
| `npm run dev`  | Inicia el servidor de desarrollo con HMR |
| `npm run build`| Genera la versión de producción en `dist/` |
| `npm run preview` | Previsualiza la build de producción    |
| `npm run lint` | Ejecuta ESLint sobre el código           |

## Cómo funciona

La app hace dos llamadas a la API de Open-Meteo:

1. **Geocodificación**: convierte el nombre de la ciudad en coordenadas
   (`geocoding-api.open-meteo.com`).
2. **Clima actual**: consulta la temperatura, humedad, viento y código de tiempo
   para esas coordenadas (`api.open-meteo.com`).

El código de tiempo (WMO) se traduce a una descripción legible en español mediante un diccionario dentro de `src/App.jsx`.

## Estructura del proyecto

```
clima-app/
├── public/            # Estáticos (favicon, iconos)
└── src/
    ├── App.jsx        # Componente principal con la lógica de la app
    ├── App.css        # Estilos del componente (no utilizado)
    ├── index.css      # Estilos globales
    └── main.jsx       # Punto de entrada de React
```

## Licencia

Este proyecto es de uso libre. Si lo usas como base para tu propia app, no olvides revisar los términos de uso de la [API de Open-Meteo](https://open-meteo.com/en/terms).

##Autor

Autor: - *(Ricardo Bonachea Ramirez)* Proyecto hecho con fines de aprendizaje.