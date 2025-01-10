import React from "react";
import { Comprar } from "../components/Formularios/Comprar";
import { SQLiteProvider } from "expo-sqlite";
import { creacionTablaCompras } from "../components/DataBase";
export default function RealizarCompra() {
  return (
    //el inciador crea las tablas en caso de no estar creadas
    <SQLiteProvider databaseName="inventario.db" onInit={creacionTablaCompras}>
      <Comprar />
    </SQLiteProvider>
  );
}
