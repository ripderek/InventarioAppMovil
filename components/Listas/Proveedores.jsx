import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { Link } from "expo-router";
import Screen from "../../components/Screen";
import { Stack } from "expo-router";
import { Search, Add_circle } from "../Icons";

export function Proveedores() {
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#303032" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Proveedores",
          headerTitleAlign: "center",
        }}
      />
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
          <Link asChild href={"crear-proveedor"}>
            <TouchableOpacity className="w-full bg-slate-900 p-3 rounded-2xl  border border-1 border-gray-300">
              <Add_circle colorIcon={"white"} sizeIcon={20} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      {/* LISTA EN FORMA DE CUADRICULA DE 2 COLUMNAS */}
    </Screen>
  );
}
