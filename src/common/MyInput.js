import React from "react";
import { TextInput, StyleSheet } from "react-native";
export default function (props) {
  return (
    <>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
        style={[styles.inputField, props.style]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#EBF5FB",
    borderColor: "#EBF5FB",
  },
});
