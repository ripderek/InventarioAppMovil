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
import { Stack } from "expo-router";
import Screen from "../../components/Screen";
import { Insert_Producto } from "../DataBase";
import { Loader } from "../Layouts/Loader";
import { SeleccionarProveedor } from "../Listas/SeleccionarProveedor";
export function CrearProducto() {
  const [OpenLoader, setOpenLoader] = useState(false);
  const [openProveedor, SetOpenProveedor] = useState(false);

  //estado para almacenar toda la informacion
  const [InfoRegistrar, SetInfoRegistrar] = useState({
    Producto: "",
    Descripcion: "",
    PrecioCompra: 0,
    PrecioVenta: 0,
    Stock: 0,
  });
  const [Proveedor, SetProveedor] = useState({
    Id: 0,
    Proveedor: "",
  });
  const actualizarProveedor = (id, proveedor) => {
    SetProveedor({
      Id: id,
      Proveedor: proveedor,
    });
    SetOpenProveedor(false);
  };
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
    //setOpenLoader(true);
    if (VerficarInformacion()) {
      try {
        const mensaje = await Insert_Producto(InfoRegistrar, Proveedor.Id);
        //setOpenLoader(false);
        Alert.alert("Correcto", mensaje);
      } catch (error) {
        //setOpenLoader(false);
        Alert.alert("Error", error.message);
      }
    }
  };

  //funcion para verificar que no vayan vacias las propiedades del estado que contiene la informacion
  const VerficarInformacion = () => {
    const isEmpty = (str) => !str.trim();
    if (isEmpty(InfoRegistrar.Producto)) {
      alert("El campo producto no puede estar vacío");
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
          headerTitle: "Crear Producto",
          headerTitleAlign: "center",
        }}
      />

      {/* PARA ABRIR EL LOADER*/}
      {OpenLoader ? <Loader /> : ""}
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
            <View>{/* <UserIcon colorIcon={"gray"} sizeIcon={20} />*/}</View>
            <Text className=" text-base  text-gray-500  text-left ml-1">
              Datos generales
            </Text>
          </View>

          <View className="bg-slate-50  border border-1 border-gray-300 p-2  rounded-2xl w-full">
            <TextInput
              placeholder="Producto"
              placeholderTextColor={"black"}
              //className="uppercase"
              inputMode="url"
              value={InfoRegistrar.Producto}
              onChangeText={(value) => HandleChange("Producto", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Descripcion"
              placeholderTextColor={"black"}
              //className="uppercase"
              value={InfoRegistrar.Descripcion}
              inputMode="url"
              onChangeText={(value) => HandleChange("Descripcion", value)}
            />
          </View>
          {/* VER EL PROVEEDOR Y EL ID SELECCIONADO */}
          {Proveedor.Proveedor && (
            <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
              <TextInput
                placeholder="Proveedor"
                placeholderTextColor={"black"}
                //className="uppercase"
                value={`${Proveedor.Id} - ${Proveedor.Proveedor}`}
                inputMode="url"
                editable={false}
              />
            </View>
          )}

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
              value={InfoRegistrar.PrecioCompra}
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
              value={InfoRegistrar.PrecioVenta}
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
              value={InfoRegistrar.Stock}
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
