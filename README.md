# Extractor de de JSON desde Tablas

Este proyecto permite extraer datos de tablas en un documento HTML, incluyendo los vínculos presentes en las celdas de las tablas. Los datos extraídos se muestran en formato JSON y pueden copiarse al portapapeles.

## Funcionalidades

- Analizar tablas desde un documento HTML o una URL proporcionada.
- Extraer encabezados de tabla, filas y vínculos en las celdas.
- Mostrar los datos extraídos en una estructura JSON formateada.
- Copiar la salida JSON al portapapeles fácilmente.

## Requisitos Previos

- Un navegador web moderno que soporte JavaScript y la API de Portapapeles (Clipboard API).

## Instalación

1. Clona el repositorio o descarga los archivos.

   ```bash
   git clone https://github.com/andresandres-olarte396/dev-laoz-table-to-json.git
   ```

2. Abre el archivo `index.html` en un navegador web.

## Uso

### Métodos de Entrada

1. **Entrada por URL:**
   - Ingresa la URL de una página web que contenga tablas en el campo de texto etiquetado como "URL."
   - Haz clic en el botón `Procesar` para obtener y analizar el contenido.

2. **Entrada por HTML:**
   - Pega el contenido HTML de una página directamente en el campo de texto etiquetado como "HTML."
   - Haz clic en el botón `Procesar` para analizar el HTML.

### Salida

- Los datos de las tablas analizadas aparecerán en formato JSON en el área de salida debajo de los botones.

### Copiar Datos

- Una vez que se muestren los datos, el botón `Copiar al Portapapeles` estará habilitado.
- Haz clic en el botón para copiar la salida JSON al portapapeles.

## Ejemplo

### Entrada

#### HTML

```html
<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Sitio Web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ejemplo</td>
      <td><a href="https://example.com">Visitar</a></td>
    </tr>
  </tbody>
</table>
```

#### URL

`https://example.com`

### Salida

```json
[
  {
    "tableIndex": 1,
    "headers": ["Nombre", "Sitio Web"],
    "rows": [
      {
        "Nombre": "Ejemplo",
        "Sitio Web": "Visitar",
        "link": "https://example.com"
      }
    ]
  }
]
```

## Estructura del Proyecto

```plaintext
.
├── index.html  # Archivo HTML principal con los campos de entrada y botones
├── script.js   # Lógica en JavaScript para procesar tablas
├── style.css   # Opcional: Agregar estilos para la página
└── README.md   # Documentación del proyecto
```

## Problemas Conocidos

- **Política de CORS:** Si usas una URL, asegúrate de que permita obtener el contenido desde el navegador. Si está bloqueada, utiliza el método de entrada por HTML.
- **Tablas Complejas:** Las tablas con celdas combinadas (`rowspan` o `colspan`) pueden no procesarse correctamente.

## Contribuciones

¡Contribuciones son bienvenidas! No dudes en enviar un pull request o abrir un issue.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
