import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import Screen from "../../components/Screen";
import axios from "axios";
import { Loader } from "../../components/Layouts/Loader";
import { Alerta } from "../../components/Layouts/Alerta";
import { err } from "react-native-svg";

export function VerificacionIdPersona({ IDPersona }) {
  const [OpenLoader, setOpenLoader] = useState(false);
  const [openSuccesful, setopenSuccesful] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  //colocar un useEffect para que envie la peticion para el envio del codigo
  useEffect(() => {
    PeticionCodigo();
  }, [IDPersona]);
  const PeticionCodigo = async () => {
    //primero hay que verificar si la informacion esta correcta por ejemplo si no van vacios los inputs y el tamano de la cedula y celular
    setOpenLoader(true);
    try {
      const result = await axios.post(
        "http://aplicaciones.uteq.edu.ec:9500/api/persona/enviarCodigo",
        { id: IDPersona },
        {
          withCredentials: true,
        }
      );
      //console.log(result);
      setOpenLoader(false);
    } catch (error) {
      //alert("Error en la peticion");
      console.log(error);
      setOpenLoader(false);
    }
  };
  //funcion para enviar la verificacion del codigo
  const EnviarVerificacionCodigo = async () => {
    setOpenLoader(true);
    try {
      console.log({ id: IDPersona, code: parseInt(optString) });
      const result = await axios.post(
        "http://aplicaciones.uteq.edu.ec:9500/api/persona/verificarCodigo",
        { id: IDPersona, code: parseInt(optString) },
        {
          withCredentials: true,
        }
      );
      //console.log(result);
      setOpenLoader(false);
      //setOpenModal(true);
      setopenSuccesful(true);
    } catch (error) {
      // alert("Error");
      console.log(error);
      setOpenLoader(false);
      setOpenError(true);
      //aqui capturar el error que se envia desde la API
      setMensajeError(error.response.data.error);
    }
  };

  //prueba para la funcion del OTP para separar en varios textinputs el codigo de verificacion
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [optString, setOtpString] = useState("");
  const handleChange = (text, index) => {
    const newOtp = [...otp];

    // Si el usuario presiona retroceso y el campo está vacío, borra el anterior
    if (text === "" && otp[index] === "" && index > 0) {
      refs[index - 1].focus();
      newOtp[index - 1] = "";
    } else {
      // De lo contrario, actualiza el valor del campo actual
      newOtp[index] = text;
      if (text && index < otp.length - 1) {
        refs[index + 1].focus();
      }
    }
    setOtp(newOtp);
    setOtpString(newOtp.join(""));
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      refs[index - 1].focus();
    }
  };

  const refs = [];

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#14522d" },
          headerTintColor: "white",
          headerLeft: null,
          headerRight: () => {},
          headerTitle: "Código de seguridad",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
      {OpenLoader ? <Loader /> : ""}
      {/* ALERTA SI EL CODIGO FUE VERIFICADO */}
      {openSuccesful ? (
        <Alerta
          cerrar={() => setopenSuccesful(false)}
          titulo={"El codigo es correcto"}
          mensaje={"Puede iniciar sesión"}
          tipo={"Check"}
          link={"/"}
        />
      ) : (
        ""
      )}
      {openError ? (
        <Alerta
          cerrar={() => setOpenError(false)}
          titulo={"Error en la verificación"}
          mensaje={mensajeError}
          tipo={"Error"}
        />
      ) : (
        ""
      )}

      <View className="flex text-center justify-center items-center space-y-4">
        <View className="flex-row ">
          <Text className=" text-2xl  text-green-900  mt-6 text-center">
            Ingresa tu código de verificación
          </Text>
        </View>
      </View>

      <View className="items-center justify-center text-center">
        <View style={styles.container}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (refs[index] = ref)}
              style={styles.input}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              className="border-2 p-3 rounded-lg border-gray-500/50"
            />
          ))}
        </View>
      </View>
      <View className="w-full mt-6 items-center">
        {optString.length === 6 ? (
          <TouchableOpacity
            className="w-2/3 bg-green-900 p-3 rounded-3xl mb-3"
            onPress={() => EnviarVerificacionCodigo()}
          >
            <Text className=" text-lg font-bold text-white text-center">
              Verificar código
            </Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
        {/* OPCION PARA ENVIAR EL CODIGO DE NUEVO */}
        <TouchableOpacity
          className="w-2/3 bg-transparent p-3 rounded-3xl mb-3"
          onPress={() => PeticionCodigo()}
        >
          <Text className=" text-xs  text-center underline ml-2 mr-1 text-lime-700">
            Volver a enviar código
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  input: {
    fontSize: 24,
    textAlign: "center",
    width: 40,
    marginHorizontal: 5,
  },
});
