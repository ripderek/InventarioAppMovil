import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Link } from "expo-router";
import Screen from "../../components/Screen";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import axios from "axios";
import { Loader } from "../../components/Layouts/Loader";
import { Alerta } from "../../components/Layouts/Alerta";

export function Inicio_sesion() {
  const [DatosSesion, setDatosSesion] = useState({
    correo: "",
    contrasenia: "",
  });
  const [OpenLoader, setOpenLoader] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const HandleChange = (name, value) => {
    //console.log(name, value);
    setDatosSesion({ ...DatosSesion, [name]: value });
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };

  //funcion para saber si no estan vacias las credenciales para no hacer peticiones al servidor
  const VerficarInformacion = () => {
    const isEmpty = (str) => !str.trim();
    if (isEmpty(DatosSesion.correo)) {
      alert("El campo correo no puede estar vacío");
      return false;
    }
    if (isEmpty(DatosSesion.contrasenia)) {
      alert("El campo contraseña no puede estar vacío");
      return false;
    }
    return true;
  };

  //enviar la peticion al sevidor para ininicar sesion
  const IniciarSesion = async () => {
    //primero hay que verificar si la informacion esta correcta por ejemplo si no van vacios los inputs y el tamano de la cedula y celular
    if (VerficarInformacion()) {
      // console.log(DatosSesion);
      setOpenLoader(true);
      try {
        const result = await axios.post(
          "http://aplicaciones.uteq.edu.ec:9500/api/persona/login",
          DatosSesion,
          {
            withCredentials: true,
          }
        );
        alert("Iniciada la sesion");
        console.log(result);
        setOpenLoader(false);
      } catch (error) {
        console.log(error);
        // alert(error.response.data.error);
        setOpenLoader(false);
        setOpenError(true);
        //aqui capturar el error que se envia desde la API
        setMensajeError(error.response.data.error);
      }
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#14522d" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Inicio Sesión",
          headerTitleAlign: "center",
        }}
      />
      {/* PARA ABRIR EL LOADER*/}
      {OpenLoader ? <Loader /> : ""}
      {openError ? (
        <Alerta
          cerrar={() => setOpenError(false)}
          titulo={"Error en inicio de sesión"}
          mensaje={mensajeError}
          tipo={"Error"}
        />
      ) : (
        ""
      )}
      {/* Form */}
      <View className="flex-1 items-center  mx-4 space-y-4 ">
        <View
          style={{
            width: "85%",
            height: "20%",
          }}
          className="justify-center mt-9 mb-8"
        >
          <LottieView
            style={{
              height: 600,
            }}
            source={require("../../assets/homeAnimation.json")}
            autoPlay
            loop
          />
        </View>

        <View className="bg-transparent border border-1 border-gray-300 p-3 rounded-3xl w-full">
          <TextInput
            placeholder="CORREO"
            placeholderTextColor={"black"}
            className="uppercase"
            onChangeText={(value) => HandleChange("correo", value)}
          />
        </View>
        <View className="bg-transparent border border-1 border-gray-300 p-3 rounded-3xl w-full">
          <TextInput
            placeholder="CONTRASEÑA"
            placeholderTextColor={"black"}
            className="uppercase"
            onChangeText={(value) => HandleChange("contrasenia", value)}
            secureTextEntry={true}
          />
        </View>

        <View className="w-full items-center">
          <TouchableOpacity
            className="w-3/4 bg-green-900 p-3 rounded-3xl mb-3"
            onPress={() => IniciarSesion()}
          >
            <Text className=" text-xl font-bold text-white text-center">
              Iniciar
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Text className=" text-base  text-black text-center">
            ¿No tienes una cuenta?
          </Text>
          <Link asChild href={"Auth/register-account"}>
            <TouchableOpacity>
              <Text className=" text-base font-bold text-green-900 text-center ml-1">
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
