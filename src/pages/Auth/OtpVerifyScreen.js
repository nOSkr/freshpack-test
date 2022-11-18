import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import axios from "axios";
import { api } from "../../../Constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import MyButton from "../../common/MyButton";
import BackButton from "../../common/BackButton";
const { width, height } = Dimensions.get("window");
const OtpVerifyScreen = (props) => {
  const navigation = useNavigation();
  const { phone, password } = props.route.params;
  const [random, setRandom] = useState();
  const [counter, setCounter] = useState(59);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const signUpHandler = () => {
    axios
      .post(`${api}/api/v1/users`, {
        phone: phone,
        password: password,
        random: random,
      })
      .then((res) => {
        navigation.navigate("AfterSignUp", {
          phones: phone,
          passwords: password,
        });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/users/send`, { phone: phone })
      .then((res) => {})
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        navigation.goBack();
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <BackButton />
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../../assets/sushi.jpg")}
          style={styles.imageContainer}
          imageStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
          />
        </ImageBackground>
        <Text style={styles.headerText}>Хэрэглэгч баталгаажуулах</Text>
        <Text style={styles.headerInfo}>
          Таны оруулсан <Text>{phone}</Text> дугаар луу 4 оронтой код явуулсан.
        </Text>
        <View
          style={{ flex: 1, marginTop: 20, bottom: 20, marginHorizontal: 20 }}
        >
          <OTPInputView
            pinCount={4}
            code={random}
            onCodeChanged={(val) => setRandom(val)}
            autoFocusOnLoad
            codeInputFieldStyle={{ color: "#3498DB", borderRadius: 10 }}
            codeInputHighlightStyle={{
              borderColor: "#3498DB",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              borderColor: "#3498DB",
              alignSelf: "flex-end",
              padding: 10,
              borderRadius: 10,
              borderWidth: 2,
            }}
          >
            {counter > 0 ? (
              <Text style={styles.resetText}>
                Дахин мессеж илгээх 00:{counter}
              </Text>
            ) : (
              <Text
                style={styles.resetText}
                onPress={() => {
                  sendMessage();
                  setCounter(59);
                }}
              >
                Дахин мессеж илгээх
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <MyButton
        title={"Бүртгүүлэх"}
        onPress={signUpHandler}
        style={{ marginBottom: 20, marginHorizontal: 16 }}
      />
    </KeyboardAvoidingView>
  );
};

export default OtpVerifyScreen;

const styles = StyleSheet.create({
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
  headerText: {
    fontSize: 16,
    color: "#3498DB",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 10,
  },
  headerInfo: {
    fontSize: 12,
    color: "#3498DB",
    textAlign: "center",
    marginTop: 10,
  },
  resetText: { textAlign: "right", fontWeight: "300", fontSize: 12 },
});
