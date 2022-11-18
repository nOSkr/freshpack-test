import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import MyButton from "../common/MyButton";
const { width } = Dimensions.get("window");
const ProductDetail = ({ itemDetail }) => {
  return (
    <>
      {itemDetail && (
        <View>
          <Image
            source={{ uri: itemDetail.thumbnailUrl }}
            style={styles.image}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={styles.star}>
              <Text style={[styles.star, { fontWeight: "200" }]}>Үнэлгээ:</Text>{" "}
              <Text style={{ color: "#FCA800" }}>★</Text>
              {Math.floor(Math.random() * 5) + 0.4}
            </Text>
            <Text style={styles.title}>
              <Text style={[styles.title, { fontWeight: "200" }]}>Хоол:</Text>{" "}
              {itemDetail.title.slice(0, 10)}
            </Text>
            <Text style={[styles.title, { marginTop: 10 }]}>
              <Text style={[styles.title, { fontWeight: "200" }]}>Үнэ:</Text>{" "}
              {Math.floor(Math.random() * 100000) + 10000}₮
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Дэлгэрэнгүй
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              {itemDetail.title +
                itemDetail.title +
                itemDetail.title +
                itemDetail.title +
                itemDetail.title}
            </Text>
            <MyButton title={"Захиалах"} />
          </View>
        </View>
      )}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  image: { width, height: 200 },
  star: {
    fontWeight: "400",
    fontSize: 20,
    marginVertical: 13,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
  },
});
