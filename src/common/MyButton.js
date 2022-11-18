import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "#3498DB",
    marginTop: 16,
  },
  buttonText: { color: "#3498DB", fontSize: 16, fontWeight: "600" },
});
