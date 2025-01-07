import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Stack } from "expo-router";
import Screen from "../../components/Screen";
import {
  UserIcon,
  Phone,
  InfoIcon2,
  AccountICon,
  EyeIcon,
  EyeWithLineIcon,
  CheclMarkIcon,
} from "../../components/Icons";
import { Loader } from "../../components/Layouts/Loader";
import { Link } from "expo-router";

const transparent = "rgba(0,0,0,0.5)";
export function CrearProducto() {
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenLoader, setOpenLoader] = useState(false);

  //estado para almacenar toda la informacion
  const [InfoRegistrar, SetInfoRegistrar] = useState({
    cedula: "",
    correo: "",
    nombres: "",
    apellidos: "",
    numero_telefono: "",
    contrasenia: "",
    genero: "1",
    ciudad: "1",
  });

  //constante para guardar los nuevos datos
  const HandleChange = (name, value) => {
    //console.log(name, value);
    SetInfoRegistrar({ ...InfoRegistrar, [name]: value });
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  //funcion para enviar los datos a la API
  const EnviarDatosRegistrar = () => {
    setOpenModal(true);
    //primero hay que verificar si la informacion esta correcta por ejemplo si no van vacios los inputs y el tamano de la cedula y celular
    /*
      if (VerficarInformacion()) {}
       */
  };

  //funcion para verificar que no vayan vacias las propiedades del estado que contiene la informacion
  const VerficarInformacion = () => {
    const isEmpty = (str) => !str.trim();
    if (isEmpty(InfoRegistrar.nombres)) {
      alert("El campo nombres no puede estar vacío");
      return false;
    }
    if (isEmpty(InfoRegistrar.apellidos)) {
      alert("El campo apellidos no puede estar vacío");
      return false;
    }

    return true;
  };

  //para retornar el modal indicando que se registro el usuario para enviarlo a verificar el codigo para la cuenta
  function renderModal() {
    return (
      <Modal visible={OpenModal} animationType="fade" transparent={true}>
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
              width: "70%",
              borderRadius: 25,
            }}
          >
            <View className="text-center items-center justify-center">
              <InfoIcon2 colorIcon={"gold"} sizeIcon={30} />
            </View>
            <View className="text-center items-center justify-center">
              <Text className=" text-lg font-bold text-green-900  text-center mt-2">
                Usuario registrado exitosamente
              </Text>
            </View>
            <View className="text-center items-center justify-center">
              <Text className=" text-base  text-gray-700  text-center mt-2">
                Se ha enviado un correo de confirmación para activar tu cuenta
              </Text>
            </View>
            <View className="w-full mt-3">
              {/*<Link asChild href={`Auth/VerficarCodigo/${ID_Persona}`}> </Link> */}

              <TouchableOpacity
                className="w-full bg-green-900 p-3 rounded-2xl mb-3"
                onPress={() => setOpenModal(false)}
              >
                <Text className=" text-xl font-bold text-white text-center">
                  Aceptar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

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

      {renderModal()}
      {/* PARA ABRIR EL LOADER*/}
      {OpenLoader ? <Loader /> : ""}

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
              value={InfoRegistrar.nombres}
              onChangeText={(value) => HandleChange("nombres", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Descripcion"
              placeholderTextColor={"black"}
              //className="uppercase"
              value={InfoRegistrar.apellidos}
              inputMode="url"
              onChangeText={(value) => HandleChange("apellidos", value)}
            />
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
              value={InfoRegistrar.numero_telefono}
              onChangeText={(value) => HandleChange("numero_telefono", value)}
            />
          </View>
          <View className="bg-slate-50  border border-1 border-gray-300 p-2 rounded-2xl w-full">
            <TextInput
              placeholder="Precio de venta"
              placeholderTextColor={"black"}
              //className="uppercase"
              inputMode="numeric"
              maxLength={10}
              value={InfoRegistrar.numero_telefono}
              onChangeText={(value) => HandleChange("numero_telefono", value)}
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
