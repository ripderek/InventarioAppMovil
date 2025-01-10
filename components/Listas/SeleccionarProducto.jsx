import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  RefreshControl,
  FlatList,
} from "react-native";
import { ErrorIcon, Search } from "../../components/Icons";
import { useState } from "react";
import { Select_Producto_Busqueda } from "../DataBase";
import { Loader } from "../Layouts/Loader";
const transparent = "rgba(0,0,0,0.5)";

export function SeleccionarProducto({ cerrar, anadirProducto }) {
  const [InfoRegistrar, SetInfoRegistrar] = useState({ Busqueda: "" });
  const [ListaProveedores, setListaProveedores] = useState([]);
  const HandleChange = (name, value) => {
    //console.log(name, value);
    SetInfoRegistrar({ ...InfoRegistrar, [name]: value });
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  const [Load, SetLoad] = useState(false);
  const Busqueda = async () => {
    SetLoad(true);
    const lista = await Select_Producto_Busqueda(InfoRegistrar.Busqueda);
    setListaProveedores(lista);
    SetLoad(false);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-1 bg-slate-800 m-1  p-3 rounded-xl items-center"
      onPress={() => anadirProducto(item)}
    >
      <Text className="text-sm font-bold text-slate-50">
        {item ? item.Producto : ""}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: transparent,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            width: "90%",
            borderRadius: 25,
          }}
        >
          <View className="flex-row  flex">
            <Text className="flex-1 text-lg font-bold text-slate-600 ">
              Seleccionar producto
            </Text>
            <View>
              <TouchableOpacity onPress={() => cerrar()}>
                <ErrorIcon colorIcon={"black"} sizeIcon={30} />
              </TouchableOpacity>
            </View>
          </View>
          {/* VER EL LOAD */}
          {Load && <Loader />}
          {/* AQUI MOSTAR EL CUADRO DE BUSQUEDA*/}
          <View className="flex flex-wrap flex-row gap-2 mt-3 mb-3">
            <View className="flex-1  flex-row bg-slate-50 rounded-2xl border border-gray-300 w-4/6 items-center">
              <TextInput
                placeholder="Buscar"
                placeholderTextColor="black"
                className="flex-1 p-2 "
                inputMode="url"
                value={InfoRegistrar.Busqueda}
                onChangeText={(value) => HandleChange("Busqueda", value)}
              />
              <TouchableOpacity className="p-3" onPress={Busqueda}>
                <Search colorIcon="gray" sizeIcon={20} />
              </TouchableOpacity>
            </View>
          </View>
          {/* AQUI MOSTART EL FLATLIST CON LOS RESULTADOS DE LA BUSQUEDA */}
          {ListaProveedores && ListaProveedores.length > 0 ? (
            <FlatList
              data={ListaProveedores}
              keyExtractor={(item) => item.Id}
              renderItem={renderItem}
              numColumns={1} // Dos columnas
              contentContainerStyle={{ padding: 10 }} // Padding general
              refreshControl={
                <RefreshControl refreshing={Load} onRefresh={Busqueda} />
              }
            />
          ) : (
            <View>
              <Text className="text-sm text-center text-slate-300 ">
                Resultados de la busqueda
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
