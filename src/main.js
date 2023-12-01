const readlineSync = require("readline-sync");
const UserPlay = require("./logic/userplay");
const Levels = require("./structure/levels");
const BFS = require("./logic/BFS");
const DFS = require("./logic/DFS");
const UCS = require("./logic/UCS");
const Astar = require("./logic/Astar");

let selectedLevel;
let allLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(`Available Levels:`);
console.log(allLevels.join(" , "));
while (!allLevels.includes(selectedLevel)) {
  selectedLevel = readlineSync.question("Select a level: ") | "default";
}
console.log("---------------------------------");
const level = Levels.selectLevel(selectedLevel);
getUserInput();

function getUserInput() {
  console.log("Please enter an option:");
  console.log("1. User play");
  console.log("2. BFS");
  console.log("3. DFS");
  console.log("4. UCS");
  console.log("5. A*");
  console.log("0. Exit");
  let option;
  while (true) {
    option = readlineSync.questionInt("Option: ");
    if (
      option === 1 ||
      option === 2 ||
      option === 3 ||
      option === 4 ||
      option === 5 ||
      option === 0
    ) {
      break;
    } else {
      console.log("Invalid option. Please try again.");
    }
  }
  switch (option) {
    case 1:
      // User play
      UserPlay.play(level[0], level[1]);
      break;
    case 2:
      // BFS
      BFS.start(level[0], level[1]);
      break;
    case 3:
      // DFS
      DFS.start(level[0], level[1]);
    case 4:
      // UCS
      UCS.start(level[0], level[1]);
    case 5:
      // A*
      Astar.start(level[0], level[1]);
    case 0:
      console.log("Exiting...");
      process.exit(0);
    default:
      console.log("Invalid option. Please try again.");
      break;
  }
}
