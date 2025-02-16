import { View, StyleSheet } from "react-native";
import Matter from "matter-js";

const Red = (props) => {
  const { body, color } = props;
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={[
        styles.box,
        {
          width,
          height,
          left: x,
          top: y,
          backgroundColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    position: "absolute",
  },
});

export default (world, color, pos, size) => {
  const redBox = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Red" }
  );
  Matter.World.add(world, redBox);
  return {
    body: redBox,
    color,
    pos,
    size,
    renderer: (props) => <Red {...props} />,
  };
};