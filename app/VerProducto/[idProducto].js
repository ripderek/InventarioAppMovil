import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { VerProducto } from "../../components/Formularios/VerProducto";

export default function VerProveedorEdit() {
  const { idProducto } = useLocalSearchParams();
  const [Id_producto, setId_Producto] = useState();
  useEffect(() => {
    setId_Producto(idProducto);
  }, [idProducto]);

  return <VerProducto idProducto={Id_producto} />;
}
