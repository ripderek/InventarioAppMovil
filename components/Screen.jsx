import React from "react";
import { View } from "react-native";

export default function Screen({ children }) {
  return <View className="flex-1 bg-slate-200 pt-4 px-2">{children}</View>;
}
