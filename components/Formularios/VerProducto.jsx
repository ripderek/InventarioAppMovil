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
  Update_Producto,
  Select_ID_Producto,
  Delete_Producto,
} from "../DataBase";
import { Loader } from "../Layouts/Loader";
import { Trash } from "../Icons";
import { SeleccionarProveedor } from "../Listas/SeleccionarProveedor";

export function VerProducto({ idProducto }) {
  const [Load, SetLoad] = useState(false);
  const [openProveedor, SetOpenProveedor] = useState(false);

  //estado para almacenar toda la informacion
  const [InfoRegistrar, SetInfoRegistrar] = useState(); //con un useEffect obtener los datos de ese proveedor segun el id skere modo diablo
  useEffect(() => {
    ObtenerInfoProveedor();
  }, [idProducto]);

  const ObtenerInfoProveedor = async () => {
    SetLoad(true);
    const info = await Select_ID_Producto(idProducto);
    SetInfoRegistrar(info);
    SetLoad(false);
  };
  //constante para guardar los nuevos datos
  const HandleChange = (name, value) => {
    //console.log(name, value);
    SetInfoRegistrar({ ...InfoRegistrar, [name]: value });
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
    //console.log(InfoRegistrar);
  };
  //funcion para enviar los datos a la API
  const EnviarDatosRegistrar = async () => {
    //primero hay que verificar si la informacion esta correcta por ejemplo si no van vacios los inputs y el tamano de la cedula y celular
    if (VerficarInformacion()) {
      try {
        const mensaje = await Update_Producto(InfoRegistrar);
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
      "¿Deseas eliminar el producto?",
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
  //eliminarf
  const navigation = useNavigation(); // Hook para acceder a la navegación
  const Eliminar = async () => {
    // console.log(InfoRegistrar);
    SetLoad(true);
    await Delete_Producto(InfoRegistrar);
    SetLoad(false);
    navigation.navigate("lista-producto");
  };
  //funcion para verificar que no vayan vacias las propiedades del estado que contiene la informacion
  const VerficarInformacion = () => {
    const isEmpty = (str) => !str.trim();
    if (isEmpty(InfoRegistrar.Producto)) {
      alert("El campo Producto no puede estar vacío");
      return false;
    }
    return true;
  };
  const actualizarProveedor = (id, proveedor) => {
    //console.log(id);
    SetInfoRegistrar({
      ...InfoRegistrar,
      ProveedorId: id,
      Proveedor: proveedor,
    });
    //console.log(InfoRegistrar);
    // HandleChange("ProveedorId", id);
    //HandleChange("Proveedor", proveedor);
    //console.log(InfoRegistrar);
    //alert("Actualizar Proveedor skere ");
    SetOpenProveedor(false);
  };
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#303032" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Editar Producto",
          headerTitleAlign: "center",
        }}
      />
      {/* VER EL LOAD */}
      {Load && <Loader />}
      {/* ABRIR EL MODAL DE SELECCIONAR PROVEEDOR */}
      {openProveedor && (
        <SeleccionarProveedor
          cerrar={() => SetOpenProveedor(false)}
          actualizarProveedor={actualizarProveedor}
        />
      )}
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
              placeholder="Producto"
              placeholderTextColor={"black"}
              //className="uppercase"
              inputMode="url"
              value={InfoRegistrar ? InfoRegistrar.Producto : ""}
              onChangeText={(value) => HandleChange("Producto", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Descripcion"
              placeholderTextColor={"black"}
              //className="uppercase"
              //value={InfoRegistrar.Descripcion}
              value={InfoRegistrar ? InfoRegistrar.Descripcion : ""}
              inputMode="url"
              onChangeText={(value) => HandleChange("Descripcion", value)}
            />
          </View>
          {/* VER EL PROVEEDOR Y EL ID SELECCIONADO */}

          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Proveedor"
              placeholderTextColor={"black"}
              //className="uppercase"Proveedor
              value={`${InfoRegistrar ? InfoRegistrar.ProveedorId : ""} - ${
                InfoRegistrar ? InfoRegistrar.Proveedor : ""
              }`}
              inputMode="url"
              editable={false}
            />
          </View>

          {/* BOTON PARA SELECCIONAR EL PROVEEDOR */}
          <View className="w-full">
            <TouchableOpacity
              className="w-full bg-slate-100 p-3 rounded-2xl mb-3 border-2"
              onPress={() => SetOpenProveedor(true)}
            >
              <Text className=" text-sm font-bold text-black text-center">
                Seleccionar Proveedor
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row ">
            <View>{/*<Phone colorIcon={"gray"} sizeIcon={20} /> */}</View>
            <Text className=" text-base  text-gray-500  text-left ml-1">
              Detalles de compra/venta
            </Text>
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Precio de compra"
              placeholderTextColor={"black"}
              //className="uppercase"
              inputMode="numeric"
              maxLength={10}
              //value={InfoRegistrar.PrecioCompra}
              value={InfoRegistrar ? InfoRegistrar.PrecioCompra.toString() : ""}
              onChangeText={(value) => HandleChange("PrecioCompra", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Precio de venta"
              placeholderTextColor={"black"}
              //className="uppercase"
              inputMode="numeric"
              maxLength={10}
              //value={InfoRegistrar.PrecioVenta}
              value={InfoRegistrar ? InfoRegistrar.PrecioVenta.toString() : ""}
              onChangeText={(value) => HandleChange("PrecioVenta", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Stock"
              placeholderTextColor={"black"}
              //className="uppercase"
              inputMode="numeric"
              maxLength={10}
              //value={InfoRegistrar.Stock}
              value={InfoRegistrar ? InfoRegistrar.Stock.toString() : ""}
              onChangeText={(value) => HandleChange("Stock", value)}
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
