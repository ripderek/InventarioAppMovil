import { useState, useEffect } from "react";
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
import {
  Update_Proveedor,
  Select_ID_Proveedor,
  Delete_Proveedor,
} from "../DataBase";
import { Loader } from "../Layouts/Loader";
import { Trash } from "../Icons";

export function VerProveedor({ idProveedor }) {
  const [Load, SetLoad] = useState(false);

  //estado para almacenar toda la informacion
  const [InfoRegistrar, SetInfoRegistrar] = useState(); //con un useEffect obtener los datos de ese proveedor segun el id skere modo diablo
  useEffect(() => {
    ObtenerInfoProveedor();
  }, [idProveedor]);

  const ObtenerInfoProveedor = async () => {
    SetLoad(true);
    const info = await Select_ID_Proveedor(idProveedor);
    SetInfoRegistrar(info);
    SetLoad(false);
  };
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
        const mensaje = await Update_Proveedor(InfoRegistrar);
        Alert.alert("Correcto", mensaje);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };
  //funcion para eliminar la wea fobe skere modo dibalo
  const Preguntar_Eliminar = () => {
    Alert.alert(
      "Confirmación",
      "¿Deseas eliminar el proveedor?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => Eliminar(),
        },
      ],
      { cancelable: true }
    );
  };
  //eliminar
  const navigation = useNavigation(); // Hook para acceder a la navegación
  const Eliminar = async () => {
    SetLoad(true);
    try {
      await Delete_Proveedor(InfoRegistrar);
      SetLoad(false);
      navigation.navigate("lista-proveedores");
    } catch (error) {
      SetLoad(false);
      alert(error.message);
    }
  };
  //funcion para verificar que no vayan vacias las propiedades del estado que contiene la informacion
  const VerficarInformacion = () => {
    const isEmpty = (str) => !str.trim();
    if (isEmpty(InfoRegistrar.Proveedor)) {
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
          headerTitle: "Editar Proveedor",
          headerTitleAlign: "center",
        }}
      />
      {/* VER EL LOAD */}
      {Load && <Loader />}
      <ScrollView>
        {/* Form */}
        <View className="flex mx-4 space-y-4">
          <View className="flex-row ">
            <Text className="flex-1 text-base  text-gray-500  text-left ml-1">
              Datos generales
            </Text>
            <TouchableOpacity
              className="p-2 bg-red-700 rounded-lg"
              onPress={Preguntar_Eliminar}
            >
              <Trash colorIcon="white" sizeIcon={20} />
            </TouchableOpacity>
          </View>

          <View className="bg-slate-50  border border-1 border-gray-300 p-2  rounded-2xl w-full">
            <TextInput
              placeholder="Proveedor"
              placeholderTextColor={"black"}
              // className="uppercase"
              inputMode="url"
              value={InfoRegistrar ? InfoRegistrar.Proveedor : ""}
              onChangeText={(value) => HandleChange("Proveedor", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2  rounded-2xl w-full">
            <TextInput
              placeholder="Descripcion"
              placeholderTextColor={"black"}
              // className="uppercase"
              inputMode="url"
              value={InfoRegistrar ? InfoRegistrar.Descripcion : ""}
              onChangeText={(value) => HandleChange("Descripcion", value)}
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
