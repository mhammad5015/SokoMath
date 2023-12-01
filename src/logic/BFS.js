const Structure = require("../structure/structure");
const Helper = require("../structure/helper");

module.exports = class BFS {
  static start(initialState, requiredCells) {
    const queue = [];
    const visited = new Set();
    const parentMap = new Map();

    console.time("BFS Time");
    queue.push([initialState, requiredCells]);
    visited.add(JSON.stringify(initialState));

    while (queue.length > 0) {
      const currentElement = queue.shift();
      visited.add(JSON.stringify(currentElement[0]));
      Structure.statesPath.push(currentElement[0]);

      // Check if the current state is the goal state
      if (Structure.isFinal(currentElement[0], currentElement[1])) {
        Structure.printState(currentElement[0]);
        console.log(
          `\n--------------------------- \n|\t SOLVED \t  |\n---------------------------`
        );
        Helper.printAlgorithmInfo(
          currentElement,
          visited,
          parentMap,
          "BFS Time"
        );
        break;
      }
      Structure.printState(currentElement[0]);
      console.log("---------------------------------");
      // Generate next states from the current state
      const nextStates = Structure.generateNextStates(
        currentElement[0],
        currentElement[1]
      );
      for (const nextState of nextStates) {
        if (!visited.has(JSON.stringify(nextState[0]))) {
          queue.push(nextState);
          parentMap.set(nextState, currentElement);
          Structure.treeDepth = Math.max(
            Structure.treeDepth,
            Structure.getDepth(nextState, parentMap)
          );
        }
      }
    }
  }
};
