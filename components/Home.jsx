import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Screen from "../components/Screen";
import { Stack } from "expo-router";
import { Shopping_bag, Pocket, Shoppingcartcheckout, Shopify } from "./Icons";
export function Home() {
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#303032" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Inventario App",
          headerTitleAlign: "center",
        }}
      />
      {/* Accesos Rapidos Proveedores Productos*/}
      <View>
        <View className="flex flex-wrap flex-row gap-2  text-center justify-center">
          {/*BOTON PRODUCTOS */}
          <Link asChild href={"lista-producto"}>
            <TouchableOpacity
              className="w-2/5 bg-slate-50 rounded-xl flex p-2"
              //onPress={() => IniciarSesion()}
            >
              <View className="text-center items-center justify-center">
                <Shopping_bag colorIcon={"gray"} sizeIcon={30} />
              </View>
              <View>
                <Text className="text-base font-bold text-green-900 text-center ">
                  Productos
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          {/*BOTON Proveedores */}
          <Link asChild href={"lista-proveedores"}>
            <TouchableOpacity
              className="w-2/5 bg-slate-50 rounded-xl flex p-2"
              //onPress={() => IniciarSesion()}
            >
              <View className="text-center items-center justify-center">
                <Pocket colorIcon={"gray"} sizeIcon={30} />
              </View>
              <View>
                <Text className="text-base font-bold text-green-900 text-center ">
                  Proveedores
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      {/* Accesos Rapidos Compras Ventas*/}
      <View className="mt-2">
        <View className="flex flex-wrap flex-row gap-2  text-center justify-center">
          {/*BOTON PRODUCTOS */}
          <Link asChild href={"Auth/register-account"}>
            <TouchableOpacity
              className="w-2/5 bg-slate-50 rounded-xl flex p-2"
              //onPress={() => IniciarSesion()}
            >
              <View className="text-center items-center justify-center">
                <Shoppingcartcheckout colorIcon={"gray"} sizeIcon={30} />
              </View>
              <View>
                <Text className="text-base font-bold text-green-900 text-center ">
                  Compras
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          {/*BOTON Proveedores */}
          <Link asChild href={"Auth/register-account"}>
            <TouchableOpacity
              className="w-2/5 bg-slate-50 rounded-xl flex p-2"
              //onPress={() => IniciarSesion()}
            >
              <View className="text-center items-center justify-center">
                <Shopify colorIcon={"black"} sizeIcon={30} />
              </View>
              <View>
                <Text className="text-base font-bold text-green-900 text-center ">
                  Ventas
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
