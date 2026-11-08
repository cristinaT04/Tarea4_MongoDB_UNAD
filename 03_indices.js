
﻿// Tarea 4 - Big Data UNAD
// Creacion y verificacion de indices MongoDB

const tienda = db.getSiblingDB("unad_tarea4_tienda_demo");

// Indice para buscar ventas por cliente
print("1. INDICE DE CLIENTES");
printjson(
  tienda.ventas.createIndex({ clienteId: 1 })
);

// Indice para buscar ventas por producto
print("2. INDICE DE PRODUCTOS");
printjson(
  tienda.ventas.createIndex({ productoId: 1 })
);

// Indice para filtrar productos por categoria
print("3. INDICE DE CATEGORIAS");
printjson(
  tienda.productos.createIndex({ categoria: 1 })
);

// Verificar los indices
print("4. INDICES DE VENTAS");
printjson(tienda.ventas.getIndexes());

print("5. INDICES DE PRODUCTOS");
printjson(tienda.productos.getIndexes());
