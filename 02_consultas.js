
﻿// Tarea 4 - Big Data UNAD
// Consultas y análisis con MongoDB
// Datos simulados de una tienda virtual

const tienda = db.getSiblingDB("unad_tarea4_tienda_demo");

// 1. Consultas de selección y filtros
print("\n1. PRODUCTOS DE TECNOLOGIA");
printjson(
  tienda.productos.find({ categoria: "Tecnologia" }).limit(5).toArray()
);

print("\n2. VENTAS SUPERIORES A 200000");
printjson(
  tienda.ventas.find({ total: { $gt: 200000 } }).limit(5).toArray()
);

// 2. Inserción, actualización y eliminación
// Se utiliza un producto temporal para no afectar los datos originales.

print("\n3. OPERACIONES CRUD");

if (tienda.productos.findOne({ _id: 999 })) {
  print("Ya existe el producto temporal 999. No se modifico.");
} else {
  print("Insercion:");
  printjson(tienda.productos.insertOne({
    _id: 999,
    nombre: "Producto temporal",
    categoria: "Prueba",
    precio: 10000,
    stock: 5
  }));

  print("Actualizacion:");
  printjson(tienda.productos.updateOne(
    { _id: 999 },
    { $set: { precio: 12000 } }
  ));

  print("Documento actualizado:");
  printjson(tienda.productos.findOne({ _id: 999 }));

  print("Eliminacion:");
  printjson(tienda.productos.deleteOne({ _id: 999 }));

  print("Comprobacion de eliminacion:");
  printjson(tienda.productos.findOne({ _id: 999 }));
}

// 3. Relacionar ventas, clientes y productos
print("\n4. CONSULTA CON LOOKUP");

printjson(tienda.ventas.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "clienteId",
      foreignField: "_id",
      as: "cliente"
    }
  },
  { $unwind: "$cliente" },
  {
    $lookup: {
      from: "productos",
      localField: "productoId",
      foreignField: "_id",
      as: "producto"
    }
  },
  { $unwind: "$producto" },
  {
    $project: {
      _id: 1,
      cliente: "$cliente.nombre",
      producto: "$producto.nombre",
      cantidad: 1,
      total: 1
    }
  },
  { $sort: { _id: 1 } },
  { $limit: 5 }
]).toArray());

// 4. Estadísticas generales
print("\n5. ESTADISTICAS GENERALES");

printjson(tienda.ventas.aggregate([
  {
    $group: {
      _id: null,
      numeroVentas: { $sum: 1 },
      unidadesVendidas: { $sum: "$cantidad" },
      ingresosTotales: { $sum: "$total" },
      promedioPorVenta: { $avg: "$total" }
    }
  },
  {
    $project: {
      _id: 0,
      numeroVentas: 1,
      unidadesVendidas: 1,
      ingresosTotales: 1,
      promedioPorVenta: { $round: ["$promedioPorVenta", 2] }
    }
  }
]).toArray());

// 5. Productos más vendidos
print("\n6. PRODUCTOS MAS VENDIDOS");

printjson(tienda.ventas.aggregate([
  {
    $group: {
      _id: "$productoId",
      unidadesVendidas: { $sum: "$cantidad" },
      ingresos: { $sum: "$total" }
    }
  },
  {
    $lookup: {
      from: "productos",
      localField: "_id",
      foreignField: "_id",
      as: "producto"
    }
  },
  { $unwind: "$producto" },
  {
    $project: {
      _id: 0,
      producto: "$producto.nombre",
      unidadesVendidas: 1,
      ingresos: 1
    }
  },
  { $sort: { unidadesVendidas: -1, ingresos: -1 } },
  { $limit: 5 }
]).toArray());

// 6. Ingresos por categoría
print("\n7. INGRESOS POR CATEGORIA");

printjson(tienda.ventas.aggregate([
  {
    $lookup: {
      from: "productos",
      localField: "productoId",
      foreignField: "_id",
      as: "producto"
    }
  },
  { $unwind: "$producto" },
  {
    $group: {
      _id: "$producto.categoria",
      numeroVentas: { $sum: 1 },
      unidadesVendidas: { $sum: "$cantidad" },
      ingresosTotales: { $sum: "$total" }
    }
  },
  { $sort: { ingresosTotales: -1 } }
]).toArray());

// 7. Comprobación final
print("\n8. TOTAL DE DOCUMENTOS");

printjson({
  productos: tienda.productos.countDocuments({}),
  clientes: tienda.clientes.countDocuments({}),
  ventas: tienda.ventas.countDocuments({})
});
