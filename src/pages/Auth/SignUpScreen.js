import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import MyInput from "../../common/MyInput";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../../common/MyButton";
import BackButton from "../../common/BackButton";
import { api } from "../../../Constants";
import axios from "axios";
const { width, height } = Dimensions.get("window");
const SignUpScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const goLogin = () => {
    navigation.navigate("LoginScreen");
  };
  const goVerify = () => {
    setLoading(true);
    axios
      .post(`${api}/api/v1/users/send`, { phone: phone })
      .then((res) => {
        navigation.navigate("OtpVerifyScreen", { phone, password });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <BackButton />

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
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: height / 2,
          }}
        >
          <ActivityIndicator size={"large"} color={"#3498DB"} />
        </View>
      ) : (
        <View style={styles.authContainer}>
          <Text style={styles.title}>Бүртгүүлэх</Text>
          <MyInput placeholder="Утас" value={phone} onChangeText={setPhone} />
          <MyInput
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <MyInput
            placeholder="Нууц үг давтах"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <MyButton onPress={goVerify} title="Үргэлжлүүлэх" />

          <Text
            style={[
              styles.forgetPassword,
              { textAlign: "center", marginTop: 16 },
            ]}
          >
            Эсвэл нэвтрэх
          </Text>
          <MyButton onPress={goLogin} title="Hэвтрэх" />
        </View>
      )}
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", height, width },
  imageContainer: {
    width,
    height: 200,
  },
  logo: {
    width: 150,
    height: 50,
    position: "absolute",
    zIndex: 3,
    resizeMode: "contain",
    bottom: 10,
    right: 0,
  },
  authContainer: { marginHorizontal: 16 },
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
