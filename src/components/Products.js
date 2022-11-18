import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
const Products = ({ item, setIsOpen }) => {
  return (
    <View style={styles.container} onPress={() => setIsOpen(true)}>
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={{
          width: width / 2.2,
          height: 150,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <Text numberOfLines={1} style={styles.title}>
        {item.title.slice(0, 10)}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          {Math.floor(Math.random() * 100000) + 10000}₮
        </Text>
        <Text style={styles.star}>
          <Text style={{ color: "#FCA800" }}>★</Text>
          {Math.floor(Math.random() * 5) + 0.4}
        </Text>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", marginTop: 5, borderRadius: 10 },
  title: {
    fontWeight: "500",
    fontSize: 14,
    margin: 5,
  },
  price: {
    fontWeight: "700",
    fontSize: 16,
    margin: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  star: {
    fontWeight: "300",
    fontSize: 16,
    margin: 5,
  },
});
