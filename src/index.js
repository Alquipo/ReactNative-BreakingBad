import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import Modal from "react-native-modal";
import { SearchBar, Tooltip, Text } from "react-native-elements";

import api from "./services/api";

export default function App() {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const response = await api.get(`/characters?name=${searchQuery}`);

      setItems(response.data);
    };

    fetchItems();
  }, [searchQuery]);

  // const toggleModal = (id) => {
  //   setModalVisible(!isModalVisible);

  //   api.get(`/characters/${id}`).then((response) => {
  //     setItemId(response.data);
  //   });
  // };

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <StatusBar style="auto" />

      <SafeAreaView style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#15351d", "#040404"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <SearchBar
          platform={"android"}
          placeholder="Search Characters"
          onChangeText={onChangeSearch}
          value={searchQuery}
          containerStyle={styles.input}
          // showLoading
        />

        <FlatList
          data={items}
          keyExtractor={(item) => item.char_id.toString()}
          numColumns={2}
          renderItem={({ item: item }) => (
            <>
              <View style={styles.itemContainer}>
                <Tooltip
                  height={300}
                  width={300}
                  popover={
                    <>
                      <StatusBar
                        style="auto"
                        backgroundColor={"rgba(250, 250, 250, 0.70)"}
                      />
                      <View key={item.char_id}>
                        <Text style={styles.title}>{item.name}</Text>

                        <Text style={styles.contentTitle}>
                          <Text style={styles.titleText}>Actor Name: </Text>
                          {item.portrayed}
                        </Text>

                        <Text style={styles.contentTitle}>
                          <Text style={styles.titleText}>Nickname: </Text>
                          {item.nickname}
                        </Text>

                        <Text style={styles.contentTitle}>
                          <Text style={styles.titleText}>Birthday: </Text>

                          {item.birthday}
                        </Text>

                        <Text style={styles.contentTitle}>
                          <Text style={styles.titleText}>Status: </Text>
                          {item.status}
                        </Text>
                      </View>
                    </>
                  }
                >
                  <Image style={styles.logo} source={{ uri: item.img }} />
                </Tooltip>

                {/* <TouchableHighlight
                  underlayColor
                  onPress={() => toggleModal(item.char_id)}
                > 
                  <Image style={styles.logo} source={{ uri: item.img }} />
                </TouchableHighlight>  */}
              </View>
            </>
          )}
        />

        {/* <Modal
          isVisible={isModalVisible}
          avoidKeyboard
          statusBarTranslucent
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={2000}
          animationOutTiming={1000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={1000}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.content}>
            {itemId.map((item) => (
              <View key={item.char_id}>
                <Text style={styles.title}>{item.name}</Text>

                <Text style={styles.contentTitle}>
                  <Text style={styles.titleText}>Actor Name: </Text>
                  {item.portrayed}
                </Text>

                <Text style={styles.contentTitle}>
                  <Text style={styles.titleText}>Nickname: </Text>
                  {item.nickname}
                </Text>

                <Text style={styles.contentTitle}>
                  <Text style={styles.titleText}>Birthday: </Text>

                  {item.birthday}
                </Text>

                <Text style={styles.contentTitle}>
                  <Text style={styles.titleText}>Status: </Text>
                  {item.status}
                </Text>
              </View>
            ))}
          </View>
        </Modal> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    marginTop: 5,
  },
  logo: {
    width: 180,
    height: 250,
    flexGrow: 1,
    margin: 5,
  },
  // content: {
  //   // backgroundColor: "white",
  //   padding: 22,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 4,
  //   borderColor: "rgba(0, 0, 0, 0.1)",
  // },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: "white",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 40,
    marginBottom: 12,
    color: "white",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    textAlign: "center",
  },
  input: {
    // height: 50,
    borderColor: "white",
    // borderWidth: 1,
    marginTop: 50,
    borderRadius: 5,
    width: "90%",
    // backgroundColor: "white",
    marginBottom: 10,
  },
});
