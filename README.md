# Conversor de Temperaturas

Aplicativo web estático, moderno y accesible para convertir temperaturas entre Celsius (°C), Fahrenheit (°F) y Kelvin (K). Funciona directamente en el navegador, sin instalación, compilación, backend ni dependencias externas.

## Características principales

- Conversión automática entre las tres unidades.
- Soporte para todas las combinaciones, incluidas unidades iguales.
- Botón para intercambiar las unidades y recalcular al instante.
- Validación de campos vacíos, números no finitos y valores inferiores al cero absoluto.
- Resultados redondeados a un máximo de dos decimales, sin ceros innecesarios.
- Indicador térmico con cinco niveles: muy fría, fría, templada, caliente y muy caliente.
- Diseño responsive para computador, portátil, tablet y celular.
- Navegación por teclado, mensajes accesibles y foco visible.
- Compatibilidad con `prefers-reduced-motion`.
- Sin recursos externos, frameworks ni dependencias de npm.

## Estructura de carpetas

```text
conversor-temperaturas/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── favicon.svg
├── README.md
└── .gitignore
```

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con variables, Grid, Flexbox y media queries
- JavaScript vanilla
- SVG local para el favicon y los iconos de la interfaz

## Ejecución local

### Opción directa

1. Descarga o clona el proyecto.
2. Abre `index.html` en un navegador moderno.

### Opción con servidor local

Desde la carpeta del proyecto, ejecuta:

```bash
python -m http.server 8000
```

Después, abre `http://localhost:8000` en el navegador.

## Subir el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub, por ejemplo `conversor-temperaturas`.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta los siguientes comandos, reemplazando `TU_USUARIO` por tu usuario de GitHub:

```bash
git init
git add .
git commit -m "Crear conversor de temperaturas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/conversor-temperaturas.git
git push -u origin main
```

## Publicar con GitHub Pages

1. En GitHub, abre el repositorio.
2. Ve a **Settings** > **Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda la configuración.
6. GitHub mostrará la dirección pública del sitio cuando el despliegue esté disponible.

Las rutas del proyecto son relativas, por lo que funcionan tanto localmente como en un sitio de proyecto de GitHub Pages.

## Fórmulas utilizadas

- Celsius a Fahrenheit: `(°C × 9/5) + 32`
- Celsius a Kelvin: `°C + 273.15`
- Fahrenheit a Celsius: `(°F - 32) × 5/9`
- Fahrenheit a Kelvin: `(°F - 32) × 5/9 + 273.15`
- Kelvin a Celsius: `K - 273.15`
- Kelvin a Fahrenheit: `(K - 273.15) × 9/5 + 32`

La implementación convierte primero el valor a Celsius y luego a la unidad de destino. Cuando ambas unidades son iguales, conserva el valor original.

## Personalización de colores y estilos

Los colores, espacios, radios, sombras y transiciones principales se encuentran como variables en `:root`, al inicio de `css/styles.css`. Puedes modificar, entre otras:

- `--color-primary`
- `--cold`
- `--cool`
- `--mild`
- `--hot`
- `--very-hot`
- `--shadow-card`
- `--radius-lg`

Los rangos del indicador térmico se configuran en la función `getThermalState` de `js/script.js`. Están expresados en Celsius para mantener una clasificación consistente, sin importar la unidad de destino.

## Accesibilidad

- Documento configurado en español.
- Etiquetas asociadas con cada control.
- Controles operables con teclado.
- Regiones `aria-live` para resultados y validaciones.
- Mensajes de error específicos y estado `aria-invalid`.
- Indicadores térmicos que combinan color, texto e iconos.
- Contraste visual, tamaños táctiles cómodos y foco visible.
- Reducción de animaciones si el sistema tiene activado `prefers-reduced-motion`.

## Licencia

Se sugiere publicar este proyecto bajo la licencia MIT. Para formalizarla, agrega un archivo `LICENSE` con el texto oficial de MIT y los datos del titular de los derechos.
