import GreenBox from "../components/GreenBox";
import Red from "../components/Red";
import BoundaryLeft from "../components/BoundaryLeft";
import BoundaryTop from "../components/BoundaryTop";
import BoundaryRight from "../components/BoundaryRight";
import BoundaryBottom from "../components/BoundaryBottom";
import BoundaryCenter from "../components/BoundaryCenter";
import ControlButtons from "../components/ControlButtons";

import Matter from "matter-js";
import Constants from "../Constants";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default (onMove, playerInput) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  // Disable gravity
  engine.world.gravity.y = 0;

  // Create static boundaries
  const TopBoundary = BoundaryTop(
    world,
    "red",
    { x: Constants.WINDOW_WIDTH / 2, y: 0 },
    { height: 20, width: Constants.WINDOW_WIDTH }
  );
  const BottomBoundary = BoundaryBottom(
    world,
    "red",
    { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
    { height: 30, width: Constants.WINDOW_WIDTH }
  );
  const LeftBoundary = BoundaryLeft(
    world,
    "red",
    { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
    { height: Constants.WINDOW_HEIGHT, width: 30 }
  );
  const RightBoundary = BoundaryRight(
    world,
    "red",
    { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
    { height: Constants.WINDOW_HEIGHT, width: 60 }
  );
  const CenterBoundary = BoundaryCenter(
    world,
    "red",
    { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 + 100 },
    { height: 20, width: Constants.WINDOW_WIDTH }
  );

  // Create player and enemy bodies
  const Greensquare = GreenBox(
    world,
    "green",
    { x: 100, y: 120 },
    { width: 40, height: 40 },
    { isStatic: false }
  );
  const Redsqaure = Red(
    world,
    "red",
    { x: screenWidth / 2, y: screenHeight / 2 - 120 },
    { width: 20, height: 20 }
  );

  // Update the Square entity to include the input array
  Greensquare.input = playerInput;

  return {
    physics: { engine, world },

    Square: Greensquare,
    CenterSquare: Redsqaure,

    TopBoundary,
    BottomBoundary,
    LeftBoundary,
    RightBoundary,
    CenterBoundary,

    ControlButtons: {
      type: "ui",
      renderer: () => <ControlButtons onMove={onMove} box={Redsqaure} />,
    },
  };
};
