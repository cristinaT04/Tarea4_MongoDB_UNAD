// Tarea 4 - Big Data UNAD
// Carga de datos simulados en MongoDB

const tienda = db.getSiblingDB("unad_tarea4_tienda_demo");

const colecciones = ["productos", "clientes", "ventas"];

const existenDatos = colecciones.some(
  nombre => tienda.getCollection(nombre).countDocuments({}) > 0
);

if (existenDatos) {
  print("La base ya contiene datos. No se insertaron duplicados.");
} else {

  const nombres = [
    "Mouse inalambrico",
    "Teclado mecanico",
    "Audifonos Bluetooth",
    "Memoria USB 64GB",
    "Cuaderno universitario",
    "Boligrafos",
    "Agenda personal",
    "Lampara de escritorio",
    "Botella termica",
    "Organizador de escritorio",
    "Cargador USB",
    "Soporte para portatil"
  ];

  const categorias = [
    "Tecnologia", "Tecnologia", "Tecnologia", "Tecnologia",
    "Papeleria", "Papeleria", "Papeleria",
    "Hogar", "Hogar", "Hogar",
    "Tecnologia", "Tecnologia"
  ];

  const precios = [
    45000, 150000, 95000, 35000,
    12000, 5000, 25000, 75000,
    40000, 30000, 55000, 85000
  ];

  const stocks = [
    50, 30, 40, 70, 100, 200,
    60, 35, 80, 45, 55, 25
  ];

  const productos = nombres.map((nombre, i) => ({
    _id: i + 1,
    nombre,
    categoria: categorias[i],
    precio: precios[i],
    stock: stocks[i]
  }));

  tienda.productos.insertMany(productos);

  const clientes = Array.from({ length: 20 }, (_, i) => ({
    _id: i + 1,
    nombre: `Cliente ${i + 1}`,
    ciudad: ["Bogota", "Cali", "Medellin", "Pasto", "Popayan"][i % 5],
    correo: `cliente${i + 1}@ejemplo.com`,
    edad: 20 + (i % 30)
  }));

  tienda.clientes.insertMany(clientes);

  const ventas = Array.from({ length: 120 }, (_, i) => {
    const producto = productos[i % productos.length];
    const cantidad = (i % 5) + 1;

    return {
      _id: i + 1,
      clienteId: (i % 20) + 1,
      productoId: producto._id,
      cantidad,
      precioUnitario: producto.precio,
      total: cantidad * producto.precio,
      fecha: new Date(Date.UTC(2026, 10, (i % 20) + 1)),
      estado: "Completada"
    };
  });

  tienda.ventas.insertMany(ventas);

  print("Datos de prueba insertados correctamente.");
}

printjson({
  productos: tienda.productos.countDocuments({}),
  clientes: tienda.clientes.countDocuments({}),
  ventas: tienda.ventas.countDocuments({})
});
