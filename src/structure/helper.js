const Structure = require("./structure");
const readlineSync = require("readline-sync");

module.exports = class Helper {
  static printAlgorithmInfo(currentElement, visited, parentMap, timeOption) {
    this.endTime(timeOption);
    console.log(`Solution Cost: ${Structure.getCost()}`);
    console.log(`Tree Depth: ${Structure.treeDepth}`);
    this.initSolutionPath(parentMap, currentElement);
    console.log(`Solution Depth: ${Structure.solPath.length}`);
    let visitedNumber = 0;
    let visiteds = [];
    for (const iterator of visited) {
      visitedNumber++;
      visiteds.push(JSON.parse(iterator));
    }
    console.log(`Visited States Number: ${visitedNumber}`);
    console.log("---------------------------------");
    this.getUserInput(visiteds, parentMap, currentElement);
  }

  static getUserInput(visiteds, parentMap, currentElement) {
    console.log("Please enter an option:");
    console.log("1. Print visited states");
    console.log("2. Print states path");
    console.log("3. Print Solution Path");
    console.log("0. Exit");
    let option;
    while (true) {
      option = readlineSync.questionInt("Option: ");
      if (option === 1 || option === 2 || option === 3 || option === 0) {
        break;
      } else {
        console.log("Invalid option. Please try again.");
      }
    }
    switch (option) {
      case 1:
        // print visited
        console.log(`Visited States: `);
        Structure.printStates(visiteds);
        this.getUserInput(visiteds, parentMap, currentElement);
        break;
      case 2:
        // print path
        Structure.printStatesPath();
        this.getUserInput(visiteds, parentMap, currentElement);
        break;
      case 3:
        // print parent path
        this.printParentPath();
        this.getUserInput(visiteds, parentMap, currentElement);
        break;
      case 0:
        console.log("Exiting...");
        process.exit(0);
      default:
        console.log("Invalid option. Please try again.");
        break;
    }
  }

  static endTime(option) {
    switch (option) {
      case "DFS Time":
        console.timeEnd("DFS Time");
        break;
      case "BFS Time":
        console.timeEnd("BFS Time");
        break;
      case "UCS Time":
        console.timeEnd("UCS Time");
        break;
      default:
        break;
    }
  }

  static initSolutionPath(parentMap, currentElement) {
    let parent = parentMap.get(currentElement);
    while (parent) {
      Structure.solPath.push(parent[0]);
      parent = parentMap.get(parent);
    }
  }

  static printParentPath() {
    console.log("Parent Path:");
    Structure.printStates(Structure.solPath.reverse());
  }
};
