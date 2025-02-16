import Matter from "matter-js";
import Constants from "./Constants";

let playerColor = "green";
let collisionOccurred = false;

const Physics = (entities, { touches, time }) => {
  if (!time) return entities; // Ensure time exists to avoid errors

  let engine = entities.physics.engine;
  let world = engine.world;
  const player = entities.CenterSquare.body;
  const enemy = entities.Square.body;

  // Handle button presses for player movement
  if (entities.Square.input && entities.Square.input.length > 0) {
    const input = entities.Square.input[0];
    switch (input) {
      case "up":
        Matter.Body.setVelocity(player, { x: 0, y: -5 });
        break;
      case "down":
        Matter.Body.setVelocity(player, { x: 0, y: 5 });
        break;
      case "left":
        Matter.Body.setVelocity(player, { x: -5, y: 0 });
        break;
      case "right":
        Matter.Body.setVelocity(player, { x: 5, y: 0 });
        break;
    }
    entities.Square.input = []; // Clear the input after processing
  }

  // Collision detection
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    pairs.forEach((pair) => {
      if (
        (pair.bodyA === player && pair.bodyB === enemy) ||
        (pair.bodyA === enemy && pair.bodyB === player)
      ) {
        // Player-Enemy collision
        Matter.Body.setVelocity(player, { x: 0, y: 0 });
        collisionOccurred = true;
      } else if (
        pair.bodyA.label.includes("boundary") ||
        pair.bodyB.label.includes("boundary")
      ) {
        // Player-Boundary collision
        playerColor = `rgb(${Math.random() * 255}, ${Math.random() * 235}, ${
          Math.random() * 235
        })`;
      }
    });
  });

  if (collisionOccurred) {
    // Randomly relocate enemy
    Matter.Body.setPosition(enemy, {
      x: Math.random() * (Constants.WINDOW_WIDTH - 20) + 10,
      y: Math.random() * (Constants.WINDOW_HEIGHT / 2 - 20) + 10,
    });
    // Change player color
    playerColor = `rgb(${Math.random() * 255}, ${Math.random() * 235}, ${
      Math.random() * 235
    })`;
    // Reset flags
    collisionOccurred = false;
  }

  Matter.Engine.update(engine, time.delta);

  // Update positions and colors for rendering
  entities.CenterSquare.position = player.position;
  entities.CenterSquare.color = playerColor;
  entities.Square.position = enemy.position;

  return entities;
};

export default Physics;
