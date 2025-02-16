import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./Physics";

export default function App() {
  // State to hold player input
  const [playerInput, setPlayerInput] = React.useState([]);

  // Define the onMove function for button presses
  const onMove = (direction) => {
    console.log(`Button Pressed: ${direction}`);
    setPlayerInput([direction]);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={entities(onMove, playerInput)}
        style={styles.gameContainer}>
        <StatusBar style="auto" />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'lightred',
    padding: 8,
  },
  gameContainer: {
    flex: 1,
  },
});