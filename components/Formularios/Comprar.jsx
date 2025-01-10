import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Button,
} from "react-native";
import { Stack, useNavigation } from "expo-router";
import Screen from "../../components/Screen";
import {
  Update_Producto,
  Select_ID_Producto,
  Delete_Producto,
} from "../DataBase";
import { Loader } from "../Layouts/Loader";
import { Add_circle, ErrorIcon } from "../Icons";
import { SeleccionarProducto } from "../Listas/SeleccionarProducto";

export function Comprar() {
  const [Load, SetLoad] = useState(false);
  const [openProductos, SetopenProductos] = useState(false);

  //estado para almacenar toda la informacion
  const [InfoRegistrar, SetInfoRegistrar] = useState([]);

  //funcion para enviar los datos a la API
  const EnviarDatosRegistrar = async () => {
    //primero hay que verificar si la informacion esta correcta por ejemplo si no van vacios los inputs y el tamano de la cedula y celular
    if (VerficarInformacion()) {
      try {
        //const mensaje = await Update_Producto(InfoRegistrar);
        Alert.alert("Correcto", mensaje);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const navigation = useNavigation(); // Hook para acceder a la navegación
  //    navigation.navigate("lista-producto");

  const anadirProducto = (item) => {
    SetInfoRegistrar((prevInfo) => {
      // Verificar si el producto con el mismo Id ya existe
      const existe = prevInfo.some((producto) => producto.Id === item.Id);
      if (existe) {
        // Si ya existe, mostramos alerta y retornamos el estado actual
        alert(`El producto ${item.Producto} ya está en la lista.`);
        return prevInfo;
      }

      // Si no existe, agregamos la propiedad 'Cantidad' con un valor inicial de 1
      const nuevoItem = {
        ...item,
        Cantidad: 1,
        TotalProducto: item.PrecioCompra,
      };

      // Cerramos el selector de productos
      SetopenProductos(false);

      // Añadimos el nuevo item al estado
      return [...prevInfo, nuevoItem];
    });
  };
  //quitar elemento de la lista
  const eliminarProducto = (id) => {
    SetInfoRegistrar((prevInfo) => {
      // Filtrar los elementos que no tengan el Id especificado
      return prevInfo.filter((producto) => producto.Id !== id);
    });
  };
  //Actualizar la cantidad segun el boton
  const actualizarCantidad = (id, accion) => {
    SetInfoRegistrar((prevInfo) =>
      prevInfo.map((producto) => {
        if (producto.Id === id) {
          if (accion === "suma") {
            // Incrementar la cantidad en 1
            const new_Cantidad = producto.Cantidad + 1;
            const Total = new_Cantidad * producto.PrecioCompra;
            //TotalProducto
            return {
              ...producto,
              Cantidad: new_Cantidad,
              TotalProducto: parseFloat(Total).toFixed(2),
            };
          } else if (accion === "resta" && producto.Cantidad > 1) {
            // Decrementar la cantidad en 1 solo si es mayor que 1
            const new_Cantidad = producto.Cantidad - 1;
            const Total = new_Cantidad * producto.PrecioCompra;
            return {
              ...producto,
              Cantidad: new_Cantidad,
              TotalProducto: parseFloat(Total).toFixed(2),
            };
          }
        }
        return producto; // Mantener los demás productos sin cambios
      })
    );
  };
  const renderItem = ({ item }) => (
    <View className="bg-slate-50 m-1  p-3 rounded-xl ">
      <View className="Flex flex-row">
        <View className="flex-1 ">
          <Text className="text-sm font-bold text-slate-900">
            {item ? item.Producto : ""}
          </Text>
          <Text className="text-xs text-slate-400">
            {item ? item.Proveedor : ""}
          </Text>
          <View className="flex flex-row">
            <Text className="text-sm font-bold text-slate-500">
              PVC:
              <Text className="text-lg font-bold text-green-900">
                {item ? item.PrecioCompra.toString() : ""}
              </Text>
            </Text>
            <Text className="text-sm font-bold text-slate-500 ml-3">
              PVP:
              <Text className="text-lg font-bold text-green-900">
                {item ? item.PrecioVenta.toString() : ""}
              </Text>
            </Text>
          </View>
          <View className="flex flex-row">
            <TouchableOpacity
              className="bg-red-900 h-8 w-8 "
              onPress={() => actualizarCantidad(item.Id, "resta")}
            >
              <Text className="text-xl font-bold text-white text-center items-center mx-auto">
                -
              </Text>
            </TouchableOpacity>
            <Text className="flex-1 text-center text-sm text-slate-800">
              Cantidad: {item ? item.Cantidad : ""}
            </Text>
            <TouchableOpacity
              className="bg-green-900 h-8 w-8"
              onPress={() => actualizarCantidad(item.Id, "suma")}
            >
              <Text className="text-xl font-bold text-white text-center items-center mx-auto">
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-sm font-bold text-slate-500  text-center">
            Total:{"  "}
            <Text className="text-lg font-bold text-green-900">
              {item ? item.TotalProducto.toString() : ""}
            </Text>
          </Text>
        </View>

        <View className="ml-3">
          <TouchableOpacity
            className="p-1"
            onPress={() => eliminarProducto(item.Id)}
          >
            <ErrorIcon colorIcon="black" sizeIcon={27} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#303032" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: "Comprar Productos",
          headerTitleAlign: "center",
        }}
      />
      {/* VER EL LOAD */}
      {Load && <Loader />}
      {/* ABRIR EL MODAL DE SELECCIONAR PROVEEDOR */}
      {openProductos && (
        <SeleccionarProducto
          cerrar={() => SetopenProductos(false)}
          anadirProducto={anadirProducto}
        />
      )}

      {/* Form */}
      <View className="flex ">
        <View className="flex-row ">
          <Text className="flex-1 text-base  text-gray-500  text-left ml-1">
            Añadir producto
          </Text>
          <TouchableOpacity
            className="p-2 bg-slate-900 rounded-lg"
            onPress={() => SetopenProductos(true)}
          >
            <Add_circle colorIcon="white" sizeIcon={25} />
          </TouchableOpacity>
        </View>

        {/* Flatlist de los productos agregados con su precio de compra y el total de la compra */}
        {InfoRegistrar && InfoRegistrar.length > 0 ? (
          <FlatList
            data={InfoRegistrar}
            keyExtractor={(item) => item.Id}
            renderItem={renderItem}
            numColumns={1} // Dos columnas
            contentContainerStyle={{ padding: 10 }} // Padding general
            /*
              refreshControl={
                <RefreshControl refreshing={Load} onRefresh={Busqueda} />
              }
              */
          />
        ) : (
          <View>
            <Text className="text-sm text-center text-slate-400 ">
              No tiene productos añadidos a la lista de compras
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
