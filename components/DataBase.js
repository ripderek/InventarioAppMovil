//import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
//initialize the database, esto es para crear las tablas en el contexto principal
export const initializeDatabase = async (db) => {
  try {
    //creacion de la tabla de proveedores
    await db.execAsync(`
           CREATE TABLE IF NOT EXISTS Proveedores (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Proveedor TEXT NOT NULL UNIQUE, Descripcion TEXT);
        `);
    //creacion de tabla productos
    console.log("Database initialized !");
  } catch (error) {
    console.log("Error while initializing the database : ", error);
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
