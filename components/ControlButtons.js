import Matter from "matter-js";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ControlButtons = ({ onMove, box }) => {
  return (
    <View style={styles.container}>
      {/* Up Button */}
      <TouchableOpacity
        style={styles.upButton}
        onPress={() => {
          Matter.Body.setVelocity(box.body, { x: 0, y: -5 });
          onMove("up");
        }}
      >
        <Text style={styles.text}>Up</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        {/* Left Button */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => {
            Matter.Body.setVelocity(box.body, { x: -5, y: 0 });
            onMove("left");
          }}
        >
          <Text style={styles.text}>Left</Text>
        </TouchableOpacity>
        {/* Down Button */}
        <TouchableOpacity
          style={styles.downButton}
          onPress={() => {
            Matter.Body.setVelocity(box.body, { x: 0, y: 5 });

            onMove("down");
          }}
        >
          <Text style={styles.text}>Down</Text>
        </TouchableOpacity>
        {/* Right Button */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => {
            Matter.Body.setVelocity(box.body, { x: 5, y: 0 });

            onMove("right");
          }}
        >
          <Text style={styles.text}>Right</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
        }}
      >
        Anjal Binayak
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60, // Adjust based on your UI
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  upButton: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  downButton: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  sideButton: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ControlButtons;
