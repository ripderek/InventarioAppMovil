import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import { Link } from "expo-router";
import Screen from "../../components/Screen";
import { Stack } from "expo-router";
import { Search, Add_circle } from "../Icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Select_Producto } from "../DataBase";
import { Loader } from "../Layouts/Loader";

export function Productos() {
  //Recargar para obtener la lista
  useFocusEffect(
    useCallback(() => {
      ObtenerLista();
    }, [])
  );
  const [Lista, SetLista] = useState([]);
  const [Load, SetLoad] = useState(false);
  const ObtenerLista = async () => {
    SetLoad(true);
    const lista = await Select_Producto();
    SetLista(lista);
    //console.log("ver lista");
    //console.log(Lista);
    SetLoad(false);
  };
  const renderItem = ({ item }) => (
    <Link asChild href={`VerProducto/${item.Id}`}>
      <TouchableOpacity className="flex-1 bg-slate-50 m-2 p-4 rounded-xl items-center">
        <Text className="text-lg font-bold text-slate-800">
          {item.Producto}
        </Text>
        <Text className="text-sm text-gray-500">{item.PrecioVenta}</Text>
      </TouchableOpacity>
    </Link>
  );
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#303032" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Productos",
          headerTitleAlign: "center",
        }}
      />

      {/* VER EL LOAD */}
      {Load && <Loader />}
      {/* Header para busqueda y creacion*/}
      <View className="flex flex-wrap flex-row gap-2 ">
        <View className="flex-1  flex-row bg-slate-50 rounded-2xl border border-gray-300 w-4/6 items-center">
          <TextInput
            placeholder="Buscar"
            placeholderTextColor="black"
            className="flex-1 p-2 uppercase"
            inputMode="url"
            //value={InfoRegistrar.nombres}
            //onChangeText={(value) => HandleChange("nombres", value)}
          />
          <TouchableOpacity className="p-3">
            <Search colorIcon="gray" sizeIcon={20} />
          </TouchableOpacity>
        </View>

        <View>
          <Link asChild href={"crear-producto"}>
            <TouchableOpacity className="w-full bg-slate-900 p-3 rounded-2xl  border border-1 border-gray-300">
              <Add_circle colorIcon={"white"} sizeIcon={20} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      {/* LISTA EN FORMA DE CUADRICULA DE 2 COLUMNAS */}
      {Lista && Lista.length > 0 ? (
        <FlatList
          data={Lista}
          keyExtractor={(item) => item.Id}
          renderItem={renderItem}
          numColumns={2} // Dos columnas
          contentContainerStyle={{ padding: 8 }} // Padding general
          refreshControl={
            <RefreshControl refreshing={Load} onRefresh={ObtenerLista} />
          }
        />
      ) : (
        <View>
          <Text className="text-lg text-center text-slate-500 mt-8">
            No hay productos guadados
          </Text>
        </View>
      )}
    </Screen>
  );
}
