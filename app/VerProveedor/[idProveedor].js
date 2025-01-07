import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { VerProveedor } from "../../components/Formularios/VerProveedor";

export default function VerProveedorEdit() {
  const { idProveedor } = useLocalSearchParams();
  const [IdProveedor, setIdProveedor] = useState();
  useEffect(() => {
    setIdProveedor(idProveedor);
  }, [idProveedor]);

  return <VerProveedor idProveedor={IdProveedor} />;
}
