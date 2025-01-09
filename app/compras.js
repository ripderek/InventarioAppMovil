import React from "react";
import { Productos } from "../components/Listas/Productos";
import { SQLiteProvider } from "expo-sqlite";
import { creacionTablaProductos } from "../components/DataBase";
export default function compras() {
  return (
    //el inciador crea las tablas en caso de no estar creadas
    <SQLiteProvider
      databaseName="inventario.db"
      onInit={creacionTablaProductos}
    >
      <Productos />
    </SQLiteProvider>
  );
}
