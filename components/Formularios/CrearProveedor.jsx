import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Stack, useNavigation } from "expo-router";
import Screen from "../../components/Screen";
import { Insert_Proveedor } from "../DataBase";

export function CrearProveedor() {
  //estado para almacenar toda la informacion
  const [InfoRegistrar, SetInfoRegistrar] = useState({
    proveedor: "",
    descripcion: "",
  });
  //contexto para obtener la bd
  //constante para guardar los nuevos datos
  const HandleChange = (name, value) => {
    //console.log(name, value);
    SetInfoRegistrar({ ...InfoRegistrar, [name]: value });
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  //funcion para enviar los datos a la API
  const EnviarDatosRegistrar = async () => {
    //primero hay que verificar si la informacion esta correcta por ejemplo si no van vacios los inputs y el tamano de la cedula y celular
    if (VerficarInformacion()) {
      try {
        const mensaje = await Insert_Proveedor(
          InfoRegistrar.proveedor,
          InfoRegistrar.descripcion
        );
        Alert.alert("Correcto", mensaje);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  //funcion para verificar que no vayan vacias las propiedades del estado que contiene la informacion
  const VerficarInformacion = () => {
    const isEmpty = (str) => !str.trim();
    if (isEmpty(InfoRegistrar.proveedor)) {
      alert("El campo proveedor no puede estar vacío");
      return false;
    }
    //Descripcion si puede estar vacio
    /* 
    if (isEmpty(InfoRegistrar.descripcion)) {
      alert("El campo apellidos no puede estar vacío");
      return false;
    }
  */
    return true;
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#303032" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Crear Proveedor",
          headerTitleAlign: "center",
        }}
      />

      <ScrollView>
        {/* Form */}
        <View className="flex mx-4 space-y-4">
          <View className="flex-row ">
            <View>{/* <UserIcon colorIcon={"gray"} sizeIcon={20} />*/}</View>
            <Text className=" text-base  text-gray-500  text-left ml-1">
              Datos generales
            </Text>
          </View>

          <View className="bg-slate-50  border border-1 border-gray-300 p-2  rounded-2xl w-full">
            <TextInput
              placeholder="Proveedor"
              placeholderTextColor={"black"}
              // className="uppercase"
              inputMode="url"
              value={InfoRegistrar.proveedor}
              onChangeText={(value) => HandleChange("proveedor", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2  rounded-2xl w-full">
            <TextInput
              placeholder="Descripcion"
              placeholderTextColor={"black"}
              // className="uppercase"
              inputMode="url"
              value={InfoRegistrar.descripcion}
              onChangeText={(value) => HandleChange("descripcion", value)}
            />
          </View>
          <View className="w-full">
            <TouchableOpacity
              className="w-full bg-slate-900 p-3 rounded-2xl mb-3"
              onPress={() => EnviarDatosRegistrar()}
            >
              <Text className=" text-sm font-bold text-white text-center">
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
