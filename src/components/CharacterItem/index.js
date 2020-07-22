import React from "react";
import { View, Text } from "react-native";

const CharacterItem = ({ item }) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default CharacterItem;
