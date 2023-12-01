const Helper = require("../structure/helper");
const Structure = require("../structure/structure");

module.exports = class DFS {
  static stack = [];
  static visited = new Set();
  static parentMap = new Map();

  static start(initialState, requiredCells) {
    console.time("DFS Time");
    this.stack.push([initialState, requiredCells]);
    this.visited.add(JSON.stringify(initialState));

    while (this.stack.length > 0) {
      const currentElement = this.stack.pop();
      this.visited.add(JSON.stringify(currentElement[0]));
      Structure.statesPath.push(currentElement[0]);

      // Check if the current state is the goal state
      if (Structure.isFinal(currentElement[0], currentElement[1])) {
        Structure.printState(currentElement[0]);
        console.log(
          `\n--------------------------- \n|\t SOLVED \t  |\n---------------------------`
        );
        Helper.printAlgorithmInfo(
          currentElement,
          this.visited,
          this.parentMap,
          "DFS Time"
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
        if (!this.visited.has(JSON.stringify(nextState[0]))) {
          this.stack.push(nextState);
          this.parentMap.set(nextState, currentElement);
          Structure.treeDepth = Math.max(
            Structure.treeDepth,
            Structure.getDepth(nextState, this.parentMap)
          );
        }
      }
    }
  }
};
