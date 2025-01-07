import { View, Modal } from "react-native";
import LottieView from "lottie-react-native";
const transparent = "rgba(0,0,0,0.5)";

export function Loader() {
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
            width: "25%",
            height: "13%",
            borderRadius: 15,
          }}
          className="justify-center"
        >
          <LottieView
            style={{
              height: 500,
            }}
            source={require("../../assets/loader.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    </Modal>
  );
}
