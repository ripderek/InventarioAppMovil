import { View, Text, TouchableOpacity, Modal } from "react-native";
import { InfoIcon2, ErrorIcon, CheckIcon } from "../../components/Icons";
import { Link } from "expo-router";
const transparent = "rgba(0,0,0,0.5)";

export function Alerta({ tipo, cerrar, titulo, mensaje, link }) {
  /*
    Error
    Alert
    Check
    link example: Auth/VerficarCodigo/${ID_Persona}
    */

  //funcion para retonar el icono
  function renderIcon() {
    switch (tipo) {
      case "Error":
        return <ErrorIcon colorIcon={"gold"} sizeIcon={30} />;
      case "Alert":
        return <InfoIcon2 colorIcon={"gold"} sizeIcon={30} />;
      case "Check":
        return <CheckIcon colorIcon={"gold"} sizeIcon={30} />;
      default:
        return <ErrorIcon colorIcon={"gold"} sizeIcon={30} />;
    }
  }

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
            width: "70%",
            borderRadius: 25,
          }}
        >
          <View className="text-center items-center justify-center">
            {renderIcon()}
          </View>
          <View className="text-center items-center justify-center">
            <Text className=" text-lg font-bold text-green-900  text-center mt-2">
              {titulo}
            </Text>
          </View>
          <View className="text-center items-center justify-center">
            <Text className=" text-base  text-gray-700  text-center mt-2">
              {mensaje}
            </Text>
          </View>
          <View className="w-full mt-3">
            {link ? (
              <Link asChild href={link}>
                <TouchableOpacity
                  className="w-full bg-green-900 p-3 rounded-3xl mb-3"
                  onPress={() => cerrar()}
                >
                  <Text className=" text-xl font-bold text-white text-center">
                    Aceptar
                  </Text>
                </TouchableOpacity>
              </Link>
            ) : (
              <TouchableOpacity
                className="w-full bg-green-900 p-3 rounded-3xl mb-3"
                onPress={() => cerrar()}
              >
                <Text className=" text-xl font-bold text-white text-center">
                  Aceptar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
