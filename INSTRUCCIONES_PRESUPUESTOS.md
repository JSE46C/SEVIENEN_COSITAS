# 🔧 Sistema de Presupuestos - Taller Mecánico

## Descripción
Aplicación web para crear presupuestos rápidos de servicios de taller mecánico. Diseñada para que los jefes mecánicos puedan generar presupuestos profesionales y enviarlos por email a los clientes de forma rápida.

## Características

- ✅ **Interfaz moderna y fácil de usar**
- ✅ **Cálculo automático de totales** (Subtotal + IVA 16%)
- ✅ **Agregar múltiples items** (servicios y repuestos)
- ✅ **Vista previa profesional** del presupuesto
- ✅ **Impresión directa** con diseño optimizado
- ✅ **Copiar para email** en formato texto
- ✅ **Auto-guardado** cada 30 segundos
- ✅ **Número de presupuesto automático**
- ✅ **Completamente responsivo** (funciona en móviles y tablets)

## Cómo usar

### 1. Abrir la aplicación
Simplemente abre el archivo `presupuestos.html` en tu navegador web preferido:
- Chrome
- Firefox
- Edge
- Safari

### 2. Llenar los datos del presupuesto

#### Datos generales:
- **Número de Presupuesto**: Se genera automáticamente (puedes modificarlo)
- **Fecha**: Se establece con la fecha actual (puedes cambiarla)

#### Datos del cliente:
- Nombre del cliente (obligatorio)
- Teléfono
- Email
- Vehículo (marca, modelo, año)
- Placa

#### Agregar items/servicios:
1. Escribe la **descripción** del servicio o repuesto
2. Indica la **cantidad**
3. Ingresa el **precio unitario**
4. Haz clic en **"+ Agregar"** o presiona **Enter**

Ejemplos de items:
- Cambio de aceite y filtro
- Pastillas de freno delanteras
- Revisión general de motor
- Balatas traseras
- Alineación y balanceo

#### Notas adicionales:
Puedes agregar observaciones como:
- Tiempos de entrega
- Condiciones de pago
- Garantías
- Recomendaciones adicionales

### 3. Ver el presupuesto
Haz clic en **"👁️ Vista Previa"** para ver cómo quedará el presupuesto final.

### 4. Enviar al cliente

#### Opción 1: Imprimir
- Haz clic en **"🖨️ Imprimir"**
- Selecciona tu impresora o "Guardar como PDF"
- Envía el PDF por email

#### Opción 2: Copiar para email
- Haz clic en **"📋 Copiar para Email"**
- El presupuesto se copiará en formato texto
- Abre tu cliente de email
- Pega el presupuesto (Ctrl+V o Cmd+V)
- Envía el email al cliente

### 5. Crear nuevo presupuesto
- Haz clic en **"🗑️ Limpiar"** para empezar uno nuevo
- O simplemente modifica los datos del actual

## Características especiales

### Auto-guardado
La aplicación guarda automáticamente tu trabajo cada 30 segundos. Si cierras el navegador por accidente, al volver te preguntará si quieres recuperar el borrador.

### Atajos de teclado
- **Enter**: Agregar item rápidamente cuando estás en los campos de item
- **Ctrl+P** (o Cmd+P): Imprimir desde la vista previa

### Edición de items
- Puedes eliminar items haciendo clic en el botón 🗑️ de cada fila

## Archivos incluidos

```
presupuestos.html    - Archivo principal (abre este)
styles.css           - Estilos de la aplicación
script.js            - Funcionalidad JavaScript
```

## Requisitos

- **Navegador web moderno** (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- **No requiere internet** - funciona completamente offline
- **No requiere instalación** - solo abre el archivo HTML

## Personalización

### Cambiar el IVA
Si necesitas cambiar el porcentaje de IVA, edita el archivo `script.js` y busca:
```javascript
const iva = subtotal * 0.16; // Cambia 0.16 por el porcentaje deseado
```

### Cambiar colores
Edita el archivo `styles.css` y busca `#667eea` para cambiar el color principal.

### Agregar logo de la empresa
Edita `presupuestos.html` en la sección `<header>` y agrega:
```html
<img src="tu-logo.png" alt="Logo" style="max-width: 200px;">
```

## Soporte y mejoras futuras

### Posibles mejoras:
- [ ] Guardar presupuestos en base de datos
- [ ] Historial de presupuestos
- [ ] Envío directo por email
- [ ] Catálogo de servicios predefinidos
- [ ] Múltiples monedas
- [ ] Exportar a Excel
- [ ] Sistema de clientes frecuentes

## Problemas comunes

**P: No se ve bien en mi móvil**
R: Asegúrate de usar un navegador actualizado. La aplicación es responsive.

**P: No puedo copiar el presupuesto**
R: Algunos navegadores bloquean el acceso al portapapeles. Prueba con otro navegador o usa la función de imprimir a PDF.

**P: Perdí mi presupuesto**
R: Revisa el auto-guardado. Al abrir la aplicación te preguntará si quieres recuperar el borrador.

## Contacto

Para soporte o consultas sobre la aplicación, contacta al administrador del sistema.

---

**Versión:** 1.0
**Fecha:** Noviembre 2024
**Desarrollado para:** Taller Mecánico
