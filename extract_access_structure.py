import struct
import sys

def read_accdb_tables(filename):
    """Intenta leer información básica de un archivo .accdb"""
    try:
        with open(filename, 'rb') as f:
            # Leer primeros bytes para verificar el formato
            header = f.read(100)

            print("=== INFORMACIÓN DEL ARCHIVO ===")
            print(f"Primeros 20 bytes (hex): {header[:20].hex()}")

            # Buscar strings en el archivo que podrían ser nombres de tablas
            f.seek(0)
            content = f.read()

            # Buscar cadenas de texto que parezcan nombres de tablas
            print("\n=== POSIBLES TABLAS Y CAMPOS ===")

            # Convertir a string ignorando errores
            text = content.decode('latin-1', errors='ignore')

            # Buscar patrones comunes
            keywords = ['tabla', 'Table', 'SELECT', 'INSERT', 'cliente', 'presupuesto',
                       'precio', 'descripcion', 'fecha', 'nombre', 'total', 'cantidad',
                       'articulo', 'servicio', 'mano', 'obra', 'repuesto']

            found_items = set()
            for keyword in keywords:
                if keyword.lower() in text.lower():
                    found_items.add(keyword)
                    print(f"✓ Encontrado: {keyword}")

            # Buscar bloques de texto que parezcan nombres de campo
            import re
            # Buscar palabras que empiecen con mayúscula seguidas de otras palabras
            patterns = re.findall(r'\b[A-Z][a-zA-Z]{2,20}\b', text)

            print("\n=== NOMBRES POTENCIALES DE CAMPOS ===")
            field_names = [p for p in set(patterns) if len(p) > 3 and len(p) < 20]
            for field in sorted(field_names)[:30]:  # Mostrar primeros 30
                print(f"  - {field}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    read_accdb_tables("PRESUPUESTOS.accdb")
