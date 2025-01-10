//import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
//initialize the database, esto es para crear las tablas en el contexto principal
export const initializeDatabase = async (db) => {
  try {
    //creacion de la tabla de proveedores
    await db.execAsync(`
           CREATE TABLE IF NOT EXISTS Proveedores (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Proveedor TEXT NOT NULL UNIQUE, Descripcion TEXT);
        `);
    console.log("Database initialized !");
  } catch (error) {
    console.log("Error while initializing the database : ", error);
  }
};
//creacion de tabla productos
export const creacionTablaProductos = async (db) => {
  try {
    // Creación de la tabla de Productos
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Productos (
        Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        Producto TEXT NOT NULL UNIQUE,
        Descripcion TEXT,
        PrecioCompra DECIMAL(10, 2) NOT NULL,
        PrecioVenta DECIMAL(10, 2) NOT NULL,
        Stock INTEGER NOT NULL CHECK (Stock >= 0),
        ProveedorId INTEGER,
        FOREIGN KEY (ProveedorId) REFERENCES Proveedores (Id)
      );
    `);
    console.log("Database iniciado Productos");
  } catch (error) {
    console.log("Error while initializing the database: ", error);
  }
};
//Creacion de tabla Compras
/*
    ID_Compra   --> Se hace un count del total de registros agrupados por el ID_Compra + 1
    Fecha_Compra
    ProductoID 
    Precio_Compra_Producto --> Se almacena el precio de compra del producto por si acaso modifica el producto
*/
export const creacionTablaCompras = async (db) => {
  try {
    // Creación de la tabla de Productos
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Compras (
        Compra_Id INTEGER NOT NULL,
        Producto_ID INTEGER NOT NULL,
        PrecioCompra DECIMAL(10, 2) NOT NULL,
        Fecha_Compra TEXT NOT NULL,
        FOREIGN KEY (Producto_ID) REFERENCES Productos (Id)
      );
    `);
    console.log("Database iniciado Compras");
  } catch (error) {
    console.log("Error while initializing the database: ", error);
  }
};

//conectar a la bd cuando se recarga la wea y para abrir y cerrar conexcion desde aqui mismo
export const OpenConexionDB = async () => {
  const database = await SQLite.openDatabaseAsync("inventario.db", {
    // useNewConnection: true,
  });
  return database;
};

//Crear Proveedor
export const Insert_Proveedor = async (proveedor, descripcion) => {
  try {
    const database = await OpenConexionDB();
    //si ya existe entonces no crearlo
    const existingSupplier = await database.getFirstAsync(
      "SELECT * FROM Proveedores WHERE Proveedor = ?",
      [proveedor]
    );
    if (existingSupplier) {
      database.closeAsync();
      throw new Error("El proveedor ya existe.");
    }
    await database.runAsync(
      "INSERT INTO Proveedores (Proveedor, Descripcion) VALUES (?, ?)",
      [proveedor, descripcion]
    );
    database.closeAsync();
    return "Proveedor registrado correctamente."; // Mensaje
  } catch (error) {
    console.log(`Error en Insert_Proveedor: ${error.message}`);
    throw error;
  }
};

//Ver proveedores
export const Select_Proveedor = async () => {
  try {
    const database = await OpenConexionDB();
    const existingSupplier = await database.getAllAsync(
      "SELECT * FROM Proveedores"
    );
    database.closeAsync();

    return existingSupplier; //ver que devuelve para poderlo listar
  } catch (error) {
    console.log(`Error en Select_Proveedor: ${error.message}`);
    throw error;
  }
};

//obtener info del proveedor segun el id
export const Select_ID_Proveedor = async (idproveedor) => {
  try {
    if (idproveedor) {
      const database = await OpenConexionDB();
      const existingSupplier = await database.getFirstAsync(
        "SELECT * FROM Proveedores where Id  = ? ",
        [idproveedor]
      );
      database.closeAsync();
      return await existingSupplier; //ver que devuelve para poderlo listar
    }
    return;
  } catch (error) {
    console.log(`Error en Select_ID_Proveedor: ${error.message}`);
    throw error;
  }
};

//Editar proveedor
export const Update_Proveedor = async (proveedor) => {
  try {
    const database = await OpenConexionDB();

    await database.runAsync(
      "update Proveedores set Proveedor=?, Descripcion=? where Id=?",
      [proveedor.Proveedor, proveedor.Descripcion, proveedor.Id]
    );
    database.closeAsync();
    return "Proveedor editado correctamente."; // Mensaje
  } catch (error) {
    console.log(`Error en Update_Proveedor: ${error.message}`);
    throw error;
  }
};
//eliminar
export const Delete_Proveedor = async (proveedor) => {
  try {
    const database = await OpenConexionDB();
    //primero consultar si ese proveedor esta registrado con productos para no poderlo eliminar primero
    const existingSupplier = await database.getFirstAsync(
      "SELECT * FROM Productos WHERE ProveedorId = ?",
      [proveedor.Id]
    );
    if (existingSupplier) {
      database.closeAsync();
      throw new Error(
        "El proveedor no puede eliminarse porque esta registrado en productos"
      );
    }
    await database.runAsync("DELETE FROM Proveedores WHERE Id = ?", [
      proveedor.Id,
    ]);
    database.closeAsync();
    return "Proveedor eliminado correctamente."; // Mensaje
  } catch (error) {
    console.log(`Error en Delete_Proveedor: ${error.message}`);
    throw error;
  }
};
//Gurdar producto
export const Insert_Producto = async (producto, ProveedorId) => {
  try {
    //console.log(producto);
    const database = await OpenConexionDB();
    //si ya existe entonces no crearlo
    const existingProduct = await database.getFirstAsync(
      "SELECT * FROM Productos WHERE Producto = ?",
      [producto.Producto]
    );
    if (existingProduct) {
      database.closeAsync();
      throw new Error("El producto ya existe.");
    }
    if (ProveedorId === 0) {
      database.closeAsync();
      throw new Error("Seleccione un proveedor");
    }

    if (producto.PrecioCompra <= 0 || producto.PrecioVenta <= 0)
      throw new Error("El precio venta o compra no puede ser negativo o 0");

    await database.runAsync(
      "INSERT INTO Productos (Producto, Descripcion, PrecioCompra, PrecioVenta, Stock, ProveedorId) VALUES (?, ?,?,?,?,?)",
      [
        producto.Producto,
        producto.Descripcion,
        producto.PrecioCompra,
        producto.PrecioVenta,
        producto.Stock,
        ProveedorId,
      ]
    );
    database.closeAsync();
    return "Producto registrado correctamente."; // Mensaje
  } catch (error) {
    console.log(`Error en Insert_Producto: ${error.message}`);
    throw error;
  }
};
//Ver producto
export const Select_Producto = async () => {
  try {
    const database = await OpenConexionDB();
    const existingProducts = await database.getAllAsync(
      "SELECT * FROM Productos"
    );
    database.closeAsync();
    console.log(existingProducts);
    return existingProducts; //ver que devuelve para poderlo listar
  } catch (error) {
    console.log(`Error en Select_Producto: ${error.message}`);
    throw error;
  }
};
//Ver producto por id
export const Select_ID_Producto = async (idproducto) => {
  //console.log(idproducto);
  try {
    if (idproducto) {
      //console.log("Entrando a Select_ID_Producto");
      //console.log(idproducto);
      const database = await OpenConexionDB();
      const existingSupplier = await database.getFirstAsync(
        "SELECT p.Producto,p.Descripcion,p.Id,p.PrecioCompra,p.PrecioVenta,pp.Proveedor,p.ProveedorId,p.Stock  FROM Productos p inner join Proveedores pp on p.ProveedorId=pp.Id where p.Id  = ? ",
        // "SELECT * FROM Productos where Id  = ? ",
        [idproducto]
      );
      database.closeAsync();
      console.log("Resultado del selec id producto");
      console.log(existingSupplier);
      return await existingSupplier; //ver que devuelve para poderlo listar
    }
    return;
  } catch (error) {
    console.log(`Error en Select_ID_Producto: ${error.message}`);
    throw error;
  }
};
//eliminar producto
export const Delete_Producto = async (producto) => {
  try {
    const database = await OpenConexionDB();

    await database.runAsync("DELETE FROM Productos WHERE Id = ?", [
      producto.Id,
    ]);
    database.closeAsync();
    return "Producto eliminado correctamente."; // Mensaje
  } catch (error) {
    console.log(`Error en Delete_Producto: ${error.message}`);
    throw error;
  }
};

//Editar producto
export const Update_Producto = async (producto) => {
  try {
    console.log("update producto");
    console.log(producto);
    if (producto.PrecioCompra <= 0 || producto.PrecioVenta <= 0)
      throw new Error("El precio venta o compra no puede ser negativo o 0");
    const database = await OpenConexionDB();
    await database.runAsync(
      "update Productos set Producto=?, Descripcion=? ,PrecioCompra=?,PrecioVenta=?,Stock=?, ProveedorId=? where Id=?",
      [
        producto.Producto,
        producto.Descripcion,
        producto.PrecioCompra,
        producto.PrecioVenta,
        producto.Stock,
        producto.ProveedorId,
        producto.Id,
      ]
    );
    database.closeAsync();
    return "Producto editado correctamente."; // Mensaje
  } catch (error) {
    console.log(`Error en Update_Producto: ${error.message}`);
    throw error;
  }
};

//Busqueda del proveedor por palabra clave hacer un limit
//SELECT * FROM Proveedores WHERE Proveedor LIKE ?;
export const Select_Proveedor_Busqueda = async (palabraClave) => {
  try {
    const palabraBusqueda = `%${palabraClave}%`;
    const database = await OpenConexionDB();
    const existingSupplier = await database.getAllAsync(
      "SELECT * FROM Proveedores WHERE Proveedor LIKE ? LIMIT 6;",
      [palabraBusqueda]
    );
    database.closeAsync();
    // console.log(existingSupplier);
    return existingSupplier; //ver que devuelve para poderlo listar
  } catch (error) {
    console.log(`Error en Select_Proveedor_Busqueda: ${error.message}`);
    throw error;
  }
};

//busqueda de producto por palabra clave limit 6
export const Select_Producto_Busqueda = async (palabraClave) => {
  try {
    const palabraBusqueda = `%${palabraClave}%`;
    const database = await OpenConexionDB();
    const existingSupplier = await database.getAllAsync(
      "SELECT * FROM Productos p inner join Proveedores pp on p.ProveedorId=pp.Id WHERE p.Producto LIKE ? LIMIT 6;",
      [palabraBusqueda]
    );
    database.closeAsync();
    // console.log(existingSupplier);
    return existingSupplier; //ver que devuelve para poderlo listar
  } catch (error) {
    console.log(`Error en Select_Producto_Busqueda: ${error.message}`);
    throw error;
  }
};
