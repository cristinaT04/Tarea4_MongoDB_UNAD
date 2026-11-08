
# Tarea 4 - Almacenamiento y Consultas de Datos en Big Data

**Universidad Nacional Abierta y a Distancia (UNAD)**

Curso: Big Data - 202016911  
Grupo: 202016911_79

## Descripción del proyecto

Este proyecto corresponde a la Tarea 4 del curso Big Data.

Se desarrolló una base de datos en MongoDB para simular la gestión de productos, clientes y ventas de una tienda virtual.

El objetivo es almacenar información y realizar consultas para analizar las ventas, identificar los productos más vendidos y calcular estadísticas comerciales.

## Base de datos

Nombre: `unad_tarea4_tienda_demo`

Se utilizaron tres colecciones:

- productos: 12 documentos.
- clientes: 20 documentos.
- ventas: 120 documentos.

Total: 152 documentos ficticios.

## Consultas realizadas

Se implementaron las siguientes operaciones:

- Inserción de documentos.
- Selección y consultas con filtros.
- Actualización y eliminación.
- Relaciones entre colecciones con `$lookup`.
- Estadísticas mediante `$group`, `$sum` y `$avg`.
- Productos más vendidos.
- Ingresos por categoría.
- Creación de índices.

## Resultados principales

| Indicador | Resultado |
|---|---:|
| Transacciones | 120 |
| Unidades vendidas | 360 |
| Ingresos totales | 19.560.000 |
| Promedio por venta | 163.000 |

La categoría Tecnología generó los mayores ingresos, con 13.950.000 unidades monetarias.

Todos los datos son simulados y se utilizaron exclusivamente con fines académicos.

## Archivos del proyecto

- `01_cargar_datos.js`: crea y carga los datos de prueba.
- `02_consultas.js`: ejecuta las consultas y estadísticas.
- `03_indices.js`: crea y verifica los índices.

## Requisitos

- MongoDB Community Server.
- MongoDB Shell (mongosh).

## Ejecución

Desde la carpeta del proyecto:

```bash
mongosh --file 01_cargar_datos.js
mongosh --file 02_consultas.js
mongosh --file 03_indices.js
```

El archivo de carga evita insertar duplicados cuando detecta documentos existentes. Para reproducir el proyecto desde cero, se recomienda utilizar una base de datos de prueba vacía.

## Conclusión

MongoDB permitió almacenar y consultar información de productos, clientes y ventas mediante documentos y operaciones de agregación.

Las consultas realizadas facilitaron la identificación de resultados comerciales útiles para el análisis de la información.
