import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import MyInput from "../../common/MyInput";
import MyButton from "../../common/MyButton";
const { width, height } = Dimensions.get("window");
const AfterSignUp = ({ route }) => {
  const { phones, passwords } = route?.params;
  const [phone, setPhone] = useState(phones ? phones : "");
  const [password, setPassword] = useState(passwords ? passwords : "");
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const goSignUp = () => {
    navigation.navigate("SignUpScreen");
  };
  const login = () => {
    state.login(phone, password);
  };
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/sushi.jpg")}
        style={styles.imageContainer}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
      </ImageBackground>
      <View style={styles.authContainer}>
        <Text style={styles.title}>Нэвтрэх</Text>
        <MyInput placeholder="Утас" value={phone} onChangeText={setPhone} />
        <MyInput
          placeholder="Нууц үг"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={{ width }}>
          <Text style={styles.forgetPassword}>
            Нууц үг мартсан мартсан бол?
          </Text>
        </TouchableOpacity>
        <MyButton onPress={login} title="Нэвтрэх" />

        <Text
          style={[
            styles.forgetPassword,
            { textAlign: "center", marginTop: 16 },
          ]}
        >
          Эсвэл бүртгүүлэх
        </Text>
        <MyButton onPress={goSignUp} title="Бүртгүүлэх" />
      </View>
    </ScrollView>
  );
};

export default AfterSignUp;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", height, width },
  imageContainer: {
    width,
    height: 200,
  },
  authContainer: { marginHorizontal: 16 },
  logo: {
    width: 150,
    height: 50,
    position: "absolute",
    zIndex: 3,
    resizeMode: "contain",
    bottom: 10,
    right: 0,
  },
  title: {
    color: "#3498DB",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 6,
  },
  forgetPassword: {
    fontWeight: "400",
    fontSize: 14,
    color: "#cccccc",
  },
});
