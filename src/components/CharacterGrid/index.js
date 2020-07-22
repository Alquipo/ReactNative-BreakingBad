import React from "react";
import CharacterItem from "../CharacterItem";

import { View, StyleSheet } from "react-native";

const CharacterGrid = ({ items }) => {
  return (
    <View>
      {items.map((item) => (
        <CharacterItem key={item.char_id} item={item}></CharacterItem>
      ))}
    </View>
  );
};

export default CharacterGrid;
