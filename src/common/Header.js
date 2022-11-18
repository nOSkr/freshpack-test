import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Header = ({ titleLeft, style, titleRight }) => {
  const insents = useSafeAreaInsets();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insents.top, paddingBottom: 10 },
        style,
      ]}
    >
      {titleLeft ? (
        titleLeft
      ) : (
        <AntDesign
          name="left"
          size={24}
          color={"white"}
          style={{ marginLeft: 16 }}
          onPress={goBack}
        />
      )}
      <Image
        source={require("../../assets/headerLogo.png")}
        style={{
          width: 100,
          height: 50,
          resizeMode: "contain",
        }}
      />
      {titleRight ? (
        titleRight
      ) : (
        <AntDesign
          name="left"
          size={24}
          color={"#3498DB"}
          style={{ marginLeft: 16 }}
          onPress={goBack}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3498DB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
