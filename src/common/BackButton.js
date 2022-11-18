import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
export default function ({ style }) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={goBack}>
      <AntDesign name="left" size={30} color={"white"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 40,
    left: 0,
    zIndex: 5,
  },
});
