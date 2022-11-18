import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "../../common/Header";
import { FlashList } from "@shopify/flash-list";
import Products from "../../components/Products";
import axios from "axios";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ProductDetail from "../../components/ProductDetail";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";
import MyButton from "../../common/MyButton";
const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState();
  const state = useContext(UserContext);
  let isMounted = true;
  const snapPoints = useMemo(() => ["1%", "80%"], []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
      )
      .then((res) => {
        if (isMounted) {
          setData([...data, ...res.data]);
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleSnapPress(1);
        setItemDetail(item);
      }}
    >
      <Products item={item} setIsOpen={setIsOpen} />
    </TouchableOpacity>
  );
  const renderLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size={"large"} color={"#3498DB"} />
      </View>
    );
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  const logout = () => {
    state.logout();
  };
  const deleteAccount = () => {
    axios
      .delete(`${api}/api/v1/users/${state.userId}`)
      .then(() => state.logout())
      .catch((err) => console.log(err));
  };
  if (error) {
    return (
      <View>
        <Text>Алдаа гарлаа</Text>
      </View>
    );
  }
  return (
    <>
      <Header
        titleLeft={
          <AntDesign
            name="notification"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        }
        titleRight={
          <AntDesign
            name="logout"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
            onPress={logout}
          />
        }
      />

      {loading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={"large"} color={"#3498DB"} />
        </View>
      ) : (
        <View
          style={{ flex: 1, marginHorizontal: 10, opacity: isOpen ? 0.1 : 1 }}
        >
          <FlashList
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={166}
            renderItem={renderItem}
            ListHeaderComponent={
              <>
                <MyButton
                  onPress={deleteAccount}
                  title={"Бүртгэл устгах"}
                  style={{ marginHorizontal: 10 }}
                />
                <ImageBackground
                  source={require("../../../assets/friday.jpg")}
                  style={{ width: "100%", height: 120, marginVertical: 10 }}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <View style={{ margin: 10 }}>
                    <Text
                      style={{
                        fontWeight: "300",
                        fontSize: 20,
                        color: "white",
                      }}
                    >
                      Онцгой хямдрал
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        color: "white",
                      }}
                    >
                      -50%
                    </Text>
                  </View>
                </ImageBackground>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#3498DB",
                    marginBottom: 10,
                  }}
                >
                  Онцлох бүтээгдэхүүн
                </Text>
              </>
            }
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
          />
        </View>
      )}

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
          <ProductDetail itemDetail={itemDetail} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#3498DB",
    marginTop: 10,
    paddingLeft: 30,
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 9,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
