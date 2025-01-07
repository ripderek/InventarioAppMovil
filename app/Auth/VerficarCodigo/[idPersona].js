import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { VerificacionIdPersona } from "../../../components/Auth/VerificarCodigoSeguridad";

export default function code_verify() {
  const { idPersona } = useLocalSearchParams();
  const [IDPersona, setIDPersona] = useState();
  useEffect(() => {
    setIDPersona(idPersona);
  }, [idPersona]);

  return <VerificacionIdPersona IDPersona={IDPersona} />;
}
