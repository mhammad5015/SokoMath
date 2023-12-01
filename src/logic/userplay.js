const readlineSync = require("readline-sync");

module.exports = class Userplay {
  static play(level, requiredCells) {
    const Structure = require("../structure/structure");
    Structure.statesPath.push(level);
    Structure.printState(level);
    let row = 0;
    let col = 0;
    let selectableElements = Structure.getSelectableElements(level);
    console.log("Select one of the following elements:");
    console.log(selectableElements);
    while (
      !selectableElements.includes(`(${level[row][col]})->[${row}][${col}]`)
    ) {
      row = readlineSync.question("Choose the row: ") | 0;
      col = readlineSync.question("Choose the col: ") | 0;
      console.log("---------------------------------");
    }
    let selectedElement = level[row][col];
    let action;
    let possibleActions = Structure.getPossibleActions(level, row, col);
    console.log("the possible actions:\n", possibleActions);
    while (!possibleActions.includes(action)) {
      action = readlineSync.question("Choose the move action: ");
      console.log("---------------------------------");
    }
    let nextState = Structure.applyMove(level, requiredCells, row, col, action);
    if (Structure.isFinal(nextState[0], requiredCells)) {
      Structure.printState(nextState[0])
      console.log(
        `\n--------------------------- \n|\t YOU WIN\t  |\n---------------------------`
      );
    } else {
      this.play(nextState[0], requiredCells);
    }
  }
};
