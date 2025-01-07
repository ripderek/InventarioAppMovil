import React from "react";
import { Proveedores } from "../components/Listas/Proveedores";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../components/DataBase";
export default function register_account() {
  return (
    //el inciador crea las tablas en caso de no estar creadas
    <SQLiteProvider databaseName="inventario.db" onInit={initializeDatabase}>
      <Proveedores />
    </SQLiteProvider>
  );
}
