/* OJO QUE ESTE APP JS NO HACE NADA ASI QUE NO HAY QUE TOMARLO EN CUENTA  */
/* PERO ES UN ERROR GRAVISIMO, DE MOMENTO NO IMPORTA PORQUE ES UNA APP DE PRUEBA PERO PARA EL PROXIMO PROYECTO */
/* CORREGIR ESTO YA QUE EL CONTEXTO GENERAL NO SE ESTA EJECUTNADO BIEN */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "./components/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161F30",
    alignItems: "center",
    justifyContent: "center",
  },
});
