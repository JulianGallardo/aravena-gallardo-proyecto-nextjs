# Proyecto: Tienda en Línea con Next.js

### **Descripción del Proyecto:**

El proyecto consiste en desarrollar una tienda en línea utilizando Next.js, donde el usuario final pueda comprar productos o servicios y el usuario administrador pueda gestionar los productos o servicios y los pedidos de los usuarios finales. La aplicación deberá ofrecer una experiencia de usuario óptima tanto en la navegación como en la compra para el usuario final y la gestión de productos para el usuario administrador, utilizando las funcionalidades modernas de Next.js.

### **Aclaraciones:**

- **Gestión de Stock:** No es necesario implementar un sistema de gestión de stock para los productos.
- **Simplicidad en los Pagos:** Se espera que la integración con Mercado Pago sea básica, manejando únicamente el flujo de pago sin necesidad de configurar opciones avanzadas ni que el usuario tenga que registrarse en la aplicación.
- **Autenticación:** La autenticación de usuarios administradores no necesita manejar recuperación de contraseñas o confirmación de emails; un sistema básico de login/logout será suficiente.
- **Diseño:** El diseño no necesita ser extremadamente elaborado pero debe ser limpio y funcional, asegurando una buena experiencia de usuario y accesibilidad.

### **Ejemplos de Productos y Servicios:**

- **Productos Físicos:** Electrónica (auriculares, ratones, teclados), libros, artículos de decoración.
- **Productos Digitales:** Software, fotografías digitales, música o vídeos descargables.
- **Servicios:** Consultorías, cursos en línea, reservaciones para eventos, subscripciones a servicios online.

### **Requerimientos del Proyecto**

1. **Estilos:**
    - Implementar alguno de los métodos de estilización disponibles en Next.js para la aplicación.
    - Se recomienda el uso de Tailwind CSS.
2. **Optimizaciones:**
    - Optimizar imágenes utilizando el componente **`Image`** de Next.js para la carga perezosa y la optimización automática.
    - Optimizar la precarga de enlaces y fuentes para mejorar la velocidad de carga de la página.
3. **Ruteo:**
    - Crear un sistema de layouts anidados y páginas utilizando el enrutamiento basado en el sistema de archivos de Next.js.
    - Configurar rutas dinámicas para los productos o servicios.
4. **Obtención de Datos:**
    - Configurar una base de datos en Vercel utilizando Postgres y demostrar las mejores prácticas para la obtención y transmisión de datos.
5. **Búsqueda y Paginación:**
    - Implementar funcionalidades de búsqueda y paginación en la lista de productos utilizando parámetros de búsqueda en la URL.
6. **Mutación de Datos:**
    - Demostrar cómo mutar datos utilizando React Server Actions.
    - Revalidar el caché de Next.js después de las mutaciones de datos para asegurar que la UI está actualizada.
7. **Manejo de Errores:**
    - Implementar manejo de errores generales y específicos para errores 404 no encontrados.
8. **Validación de Formularios y Accesibilidad:**
    - Realizar validación de formularios en el lado del servidor.
    - Aplicar prácticas recomendadas para mejorar la accesibilidad en la aplicación.
9. **Autenticación:**
    - Añadir autenticación a la aplicación utilizando NextAuth.js y Middleware para proteger las rutas y el contenido sensible, con roles diferenciados para usuarios administradores y finales.
    - Debe haber un usuario administrador cuyo email sea `admin@admin.com` y la password sea `admin`
10. **Integración de Pagos:**
    - Integrar la plataforma de Mercado Pago para procesar pagos en la aplicación, permitiendo a los usuarios finales completar la compra de productos o servicios.
11. **Consumo de una API Externa:**
    - Incorporar datos o funcionalidades de una API externa que agregue valor a los productos o servicios ofrecidos. Por ejemplo, una API de reseñas de productos, información climática para eventos programados, o cualquier otro servicio que complemente la oferta de la tienda.
    - Incorporar contenido de páginas externas a través de embeber otros sitios, como mapas de google maps no se considera como que se está consumiendo una API externa. El requerimiento implica hacer un requerimiento a un servicio (API) externo y procesar la respuesta para mostrar la información obtenida.
12. **Producción de una API para Terceros:**
    - Desarrollar una API que permita a terceros acceder a la información de productos y servicios ofrecidos, incluyendo precios y descripciones. Esta API no debe permitir modificar la información disponible.

### **Entregables:**

- Código fuente del proyecto en un repositorio de GitHub cuyo nombre debe *incluir* la palabra `proyecto-nextjs`.
- Link a la aplicación desplegada en Vercel.

### Comisiones:

- El proyecto se realizará en comisiones de a 2 alumnos.
- Cada comisión debe informar a la cátedra los integrantes del grupo utilizando [este](https://forms.gle/pDSCaJpJC6aD7P3eA) formulario, incluyendo el nombre del repositorio a usar. Recuerden que el nombre del repositorio debe tener la palabra `proyecto-nextjs`.
- La cátedra le asignará un ayudante el cual será el encargado del seguimiento y la corrección del proyecto.

### Punto de Control:

- Será necesario al menos un punto de control con el ayudante asignado, el cual debe ser coordinado informalmente en el aula o via mensaje en la plataforma Moodle.
- El objetivo del punto de control es explicar la idea a realizar del proyecto y el grado de avance en el momento de realizar el control.

### Fecha de Entrega:

- La fecha de entrega del proyecto es el día Domingo 23 a las 23:59 hs.
- Se debe realizar un Pull Request incluyendo todos los cambios realizados para el desarrollo del proyecto.
- El PR debe incluir en el mensaje un link al deploy funcional de Vercel (de producción, no preview).
- Además, se puede incluir cualquier nota que sea requerida en dicho PR.
- El no cumplimiento de alguno de los puntos anteriores invalida la entrega por completo del proyecto.

### Defensa:

- Se asignará un horario a cada comisión para la defensa del proyecto el día 27 de Junio, de 20 minutos.
- En dicha defensa deberán explicar el funcionamiento de su tienda online, tanto para el usuario final como para el administrador, y responder consultas de la cátedra respecto a la implementación del mismo como las decisiones de diseño.

### **Criterios de Evaluación:**

- **Completitud:** Cumplimiento de todos los requerimientos listados.
- **Funcionalidad:** Correcto funcionamiento de todas las características implementadas.
- **Calidad del Código:** Organización, legibilidad y uso de buenas prácticas de programación.
- **Diseño y UX:** Atractivo visual y facilidad de uso de la aplicación.
