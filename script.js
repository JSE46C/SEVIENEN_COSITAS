// Array para almacenar los items del presupuesto
let items = [];
let itemIdCounter = 1;

// Inicializar la fecha actual
window.onload = function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;

    // Generar número de presupuesto automático
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    document.getElementById('numeroPpto').value = `${year}-${random}`;
};

// Función para agregar un item a la lista
function agregarItem() {
    const descripcion = document.getElementById('itemDesc').value.trim();
    const cantidad = parseFloat(document.getElementById('itemCantidad').value) || 1;
    const precio = parseFloat(document.getElementById('itemPrecio').value) || 0;

    if (!descripcion) {
        alert('Por favor ingresa una descripción');
        return;
    }

    if (precio <= 0) {
        alert('Por favor ingresa un precio válido');
        return;
    }

    const item = {
        id: itemIdCounter++,
        descripcion: descripcion,
        cantidad: cantidad,
        precio: precio,
        subtotal: cantidad * precio
    };

    items.push(item);
    actualizarTablaItems();
    calcularTotales();

    // Limpiar campos
    document.getElementById('itemDesc').value = '';
    document.getElementById('itemCantidad').value = '1';
    document.getElementById('itemPrecio').value = '';
    document.getElementById('itemDesc').focus();
}

// Función para actualizar la tabla de items
function actualizarTablaItems() {
    const tbody = document.getElementById('itemsBody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.descripcion}</td>
            <td style="text-align: center;">${item.cantidad}</td>
            <td style="text-align: right;">$${item.precio.toFixed(2)}</td>
            <td style="text-align: right;">$${item.subtotal.toFixed(2)}</td>
            <td style="text-align: center;">
                <button class="btn-delete" onclick="eliminarItem(${item.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para eliminar un item
function eliminarItem(id) {
    if (confirm('¿Estás seguro de eliminar este item?')) {
        items = items.filter(item => item.id !== id);
        actualizarTablaItems();
        calcularTotales();
    }
}

// Función para calcular los totales
function calcularTotales() {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const iva = subtotal * 0.16; // 16% de IVA
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('iva').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Función para generar la vista previa del presupuesto
function generarVista() {
    const numeroPpto = document.getElementById('numeroPpto').value;
    const fecha = document.getElementById('fecha').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const vehiculo = document.getElementById('vehiculo').value;
    const placa = document.getElementById('placa').value;
    const notas = document.getElementById('notas').value;

    if (!nombreCliente) {
        alert('Por favor ingresa el nombre del cliente');
        return;
    }

    if (items.length === 0) {
        alert('Por favor agrega al menos un item al presupuesto');
        return;
    }

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    // Formatear fecha
    const fechaObj = new Date(fecha + 'T00:00:00');
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Generar HTML del presupuesto
    let itemsHTML = '';
    items.forEach(item => {
        itemsHTML += `
            <tr>
                <td>${item.descripcion}</td>
                <td style="text-align: center;">${item.cantidad}</td>
                <td style="text-align: right;">$${item.precio.toFixed(2)}</td>
                <td style="text-align: right;"><strong>$${item.subtotal.toFixed(2)}</strong></td>
            </tr>
        `;
    });

    const presupuestoHTML = `
        <div class="ppto-header">
            <div class="ppto-title">PRESUPUESTO</div>
            <div style="font-size: 1.2em; color: #666;">Nº ${numeroPpto}</div>
            <div style="color: #999; margin-top: 5px;">${fechaFormateada}</div>
        </div>

        <div class="ppto-info">
            <div class="ppto-section">
                <div class="ppto-section-title">📋 Datos del Cliente</div>
                <div class="ppto-field"><strong>Nombre:</strong> ${nombreCliente}</div>
                ${telefono ? `<div class="ppto-field"><strong>Teléfono:</strong> ${telefono}</div>` : ''}
                ${email ? `<div class="ppto-field"><strong>Email:</strong> ${email}</div>` : ''}
            </div>
            <div class="ppto-section">
                <div class="ppto-section-title">🚗 Datos del Vehículo</div>
                ${vehiculo ? `<div class="ppto-field"><strong>Vehículo:</strong> ${vehiculo}</div>` : '<div class="ppto-field">No especificado</div>'}
                ${placa ? `<div class="ppto-field"><strong>Placa:</strong> ${placa}</div>` : ''}
            </div>
        </div>

        <div class="ppto-table">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="background: #667eea; color: white;">
                    <tr>
                        <th style="padding: 12px; text-align: left; width: 50%;">Descripción</th>
                        <th style="padding: 12px; text-align: center; width: 10%;">Cant.</th>
                        <th style="padding: 12px; text-align: right; width: 20%;">Precio Unit.</th>
                        <th style="padding: 12px; text-align: right; width: 20%;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
        </div>

        <div class="ppto-totales">
            <div class="ppto-totales-row">
                <strong>Subtotal:</strong> $${subtotal.toFixed(2)}
            </div>
            <div class="ppto-totales-row">
                <strong>IVA (16%):</strong> $${iva.toFixed(2)}
            </div>
            <div class="ppto-total-final">
                TOTAL: $${total.toFixed(2)}
            </div>
        </div>

        ${notas ? `
            <div class="ppto-notas">
                <strong>📝 Notas:</strong><br>
                ${notas.replace(/\n/g, '<br>')}
            </div>
        ` : ''}

        <div class="ppto-footer">
            <p>Presupuesto válido por 15 días</p>
            <p>Gracias por su preferencia</p>
        </div>
    `;

    document.getElementById('presupuestoPreview').innerHTML = presupuestoHTML;
    document.getElementById('previewSection').style.display = 'block';
    document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
}

// Función para cerrar la vista previa
function cerrarVista() {
    document.getElementById('previewSection').style.display = 'none';
}

// Función para imprimir el presupuesto
function imprimirPresupuesto() {
    window.print();
}

// Función para copiar el presupuesto como texto para email
function copiarTexto() {
    const numeroPpto = document.getElementById('numeroPpto').value;
    const fecha = document.getElementById('fecha').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const vehiculo = document.getElementById('vehiculo').value;
    const placa = document.getElementById('placa').value;
    const notas = document.getElementById('notas').value;

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    // Formatear fecha
    const fechaObj = new Date(fecha + 'T00:00:00');
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    let texto = `
═══════════════════════════════════════
    PRESUPUESTO Nº ${numeroPpto}
═══════════════════════════════════════

Fecha: ${fechaFormateada}

DATOS DEL CLIENTE
─────────────────────────────────────
Nombre: ${nombreCliente}
${telefono ? `Teléfono: ${telefono}` : ''}
${email ? `Email: ${email}` : ''}

DATOS DEL VEHÍCULO
─────────────────────────────────────
${vehiculo ? `Vehículo: ${vehiculo}` : 'No especificado'}
${placa ? `Placa: ${placa}` : ''}

DETALLE DEL PRESUPUESTO
─────────────────────────────────────
`;

    items.forEach((item, index) => {
        texto += `\n${index + 1}. ${item.descripcion}
   Cantidad: ${item.cantidad} x $${item.precio.toFixed(2)} = $${item.subtotal.toFixed(2)}`;
    });

    texto += `

─────────────────────────────────────
Subtotal:      $${subtotal.toFixed(2)}
IVA (16%):     $${iva.toFixed(2)}
─────────────────────────────────────
TOTAL:         $${total.toFixed(2)}
═══════════════════════════════════════
`;

    if (notas) {
        texto += `\nNOTAS:\n${notas}\n\n`;
    }

    texto += `
Presupuesto válido por 15 días
Gracias por su preferencia
    `;

    // Copiar al portapapeles
    navigator.clipboard.writeText(texto).then(() => {
        alert('✅ Presupuesto copiado al portapapeles!\nPuedes pegarlo directamente en tu email.');
    }).catch(err => {
        console.error('Error al copiar:', err);
        // Método alternativo
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ Presupuesto copiado al portapapeles!');
    });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    if (items.length > 0) {
        if (!confirm('¿Estás seguro de limpiar todo el formulario?')) {
            return;
        }
    }

    // Limpiar campos del cliente
    document.getElementById('nombreCliente').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('vehiculo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('notas').value = '';

    // Limpiar items
    items = [];
    actualizarTablaItems();
    calcularTotales();

    // Generar nuevo número de presupuesto
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    document.getElementById('numeroPpto').value = `${year}-${random}`;

    // Cerrar vista previa si está abierta
    document.getElementById('previewSection').style.display = 'none';

    // Enfocar en el primer campo
    document.getElementById('nombreCliente').focus();
}

// Permitir agregar items con Enter
document.addEventListener('DOMContentLoaded', function() {
    const itemInputs = ['itemDesc', 'itemCantidad', 'itemPrecio'];

    itemInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarItem();
                }
            });
        }
    });
});

// Guardar presupuesto en localStorage (opcional)
function guardarBorrador() {
    const borrador = {
        numeroPpto: document.getElementById('numeroPpto').value,
        fecha: document.getElementById('fecha').value,
        nombreCliente: document.getElementById('nombreCliente').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        vehiculo: document.getElementById('vehiculo').value,
        placa: document.getElementById('placa').value,
        notas: document.getElementById('notas').value,
        items: items
    };

    localStorage.setItem('presupuestoBorrador', JSON.stringify(borrador));
    console.log('Borrador guardado');
}

// Auto-guardar cada 30 segundos
setInterval(() => {
    if (items.length > 0 || document.getElementById('nombreCliente').value) {
        guardarBorrador();
    }
}, 30000);

// Cargar borrador al iniciar (si existe)
window.addEventListener('load', function() {
    const borrador = localStorage.getItem('presupuestoBorrador');
    if (borrador) {
        const confirmar = confirm('Se encontró un borrador guardado. ¿Deseas cargarlo?');
        if (confirmar) {
            const datos = JSON.parse(borrador);
            document.getElementById('numeroPpto').value = datos.numeroPpto || '';
            document.getElementById('fecha').value = datos.fecha || '';
            document.getElementById('nombreCliente').value = datos.nombreCliente || '';
            document.getElementById('telefono').value = datos.telefono || '';
            document.getElementById('email').value = datos.email || '';
            document.getElementById('vehiculo').value = datos.vehiculo || '';
            document.getElementById('placa').value = datos.placa || '';
            document.getElementById('notas').value = datos.notas || '';
            items = datos.items || [];
            actualizarTablaItems();
            calcularTotales();
        }
    }
});
