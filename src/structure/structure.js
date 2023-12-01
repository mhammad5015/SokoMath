const MovesCheck = require("./moveCheck");

module.exports = class Structure {
  static statesPath = [];
  static solPath = [];
  static treeDepth = 0;

  static getPossibleActions(state, row, col) {
    let possibleActions = [];
    if (MovesCheck.checkUpMove(state, row, col)) {
      possibleActions.push("up");
    }
    if (MovesCheck.checkDownMove(state, row, col)) {
      possibleActions.push("down");
    }
    if (MovesCheck.checkLeftMove(state, row, col)) {
      possibleActions.push("left");
    }
    if (MovesCheck.checkRightMove(state, row, col)) {
      possibleActions.push("right");
    }
    if (possibleActions.length === 0) {
      return ["none"];
    } else {
      return possibleActions;
    }
  }

  static applyMove(_state, requiredCells, row, col, action) {
    const state = structuredClone(_state);
    switch (action) {
      case "up":
        if (MovesCheck.checkUpMove(state, row, col)) {
          // check required before moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
          // moving
          let temp = state[row][col];
          state[row][col] = " ";
          while (row > 0 && state[row - 1][col] === " ") {
            row--;
          }
          state[row][col] = temp;
          // check required after moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
        }
        return [state, requiredCells];
      case "down":
        if (MovesCheck.checkDownMove(state, row, col)) {
          // check required before moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
          // moving
          let temp = state[row][col];
          state[row][col] = " ";
          while (row < state.length && state[row + 1][col] === " ") {
            row++;
          }
          state[row][col] = temp;
          // check required after moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
        }
        return [state, requiredCells];
      case "left":
        if (MovesCheck.checkLeftMove(state, row, col)) {
          // check required before moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
          // moving
          let temp = state[row][col];
          state[row][col] = " ";
          while (col > 0 && state[row][col - 1] === " ") {
            col--;
          }
          state[row][col] = temp;
          // check required after moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
        }
        return [state, requiredCells];
      case "right":
        if (MovesCheck.checkRightMove(state, row, col)) {
          // check required before moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
          // moving
          let temp = state[row][col];
          state[row][col] = " ";
          while (col < state[row].length && state[row][col + 1] === " ") {
            col++;
          }
          state[row][col] = temp;
          // check required after moving
          if (Object.keys(requiredCells).includes(`${row},${col}`)) {
            requiredCells[`${row},${col}`] = !requiredCells[`${row},${col}`];
          }
        }
        return [state, requiredCells];
      default:
        // console.log("no possible actions");
        return [state, requiredCells];
    }
  }

  static addToStatesPath(nextState) {
    this.statesPath.push(nextState);
  }

  static generateNextStates(_state, requiredCells) {
    const state = structuredClone(_state);
    let nextStates = [];
    let selectableElements = this.getSelectableElements(state);
    for (let element of selectableElements) {
      const row = parseInt(element.match(/\[(\d+)\]/gi)[0][1]);
      const col = parseInt(element.match(/\[(\d+)\]/gi)[1][1]);
      let possibleActions = this.getPossibleActions(state, row, col);
      for (let action of possibleActions) {
        let nextStateAndRequired = this.applyMove(
          JSON.parse(JSON.stringify(state)),
          JSON.parse(JSON.stringify(requiredCells)),
          row,
          col,
          action
        );
        nextStates.push(nextStateAndRequired);
      }
    }
    return nextStates;
  }

  static extractItems(str) {
    const regex = /\((.*?)\)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }

  static getSelectableElements(state) {
    let selectableElements = [];
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (state[i][j] !== "#" && state[i][j] !== " ") {
          selectableElements.push(`(${state[i][j]})->[${i}][${j}]`);
        }
      }
    }
    return selectableElements;
  }

  static printState(state) {
    let output = "";
    for (let row of state) {
      for (let col of row) {
        output += col.toString() + "  ";
      }
      output += "\n";
    }
    console.log(output.trim());
  }

  static equal(state1, state2) {
    if (JSON.stringify(state1) === JSON.stringify(state2)) {
      return true;
    }
    return false;
  }

  static isFinal(state, requiredCells) {
    if (this.requiredCheck(requiredCells) && this.equationCheck(state)) {
      return true;
    } else {
      return false;
    }
  }

  static requiredCheck(requiredCells) {
    for (const key in requiredCells) {
      if (requiredCells[key] === false) {
        return false;
      }
    }
    return true;
  }

  static equationCheck(state) {
    let operators = ["=", ">", "<"];
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        let op = "";
        if (operators.includes(state[i][j])) {
          op = state[i][j];
        }
        if (state[i][j] === op) {
          if (
            (this.left_right_check(state, i, j, op) &&
              this.above_below_check(state, i, j, op)) ||
            this.left_right_check(state, i, j, op) ||
            this.above_below_check(state, i, j, op)
          ) {
            return true;
          } else {
            let splitedRow = state[i].join("").split(op);
            let equation = splitedRow.map((item) => item.replace(/[#]/g, ""));
            let left = equation[0];
            let right = equation[1];
            let resault;
            if (left.includes("+")) {
              resault = this.doTheMath(left, "+");
              if (resault === +right) {
                return true;
              }
            } else if (left.includes("-")) {
              resault = this.doTheMath(left, "-");
              if (resault === +right) {
                return true;
              }
            } else if (right.includes("+")) {
              resault = this.doTheMath(right, "+");
              if (resault === +left) {
                return true;
              }
            } else if (right.includes("-")) {
              resault = this.doTheMath(right, "-");
              if (resault === +left) {
                return true;
              }
            }
            // the equation is not correct
            return false;
          }
        }
      }
    }
  }

  static left_right_check(state, row, col, operator) {
    let left = state[row][col - 1];
    let right = state[row][col + 1];
    switch (operator) {
      case "=":
        if (this.isNumber(right) && this.isNumber(right)) return left === right;
        break;
      case ">":
        if (this.isNumber(right) && this.isNumber(right)) return left > right;
        break;
      case "<":
        if (this.isNumber(right) && this.isNumber(right)) return left < right;
        break;
      default:
        break;
    }
    return false;
  }

  static above_below_check(state, row, col, operator) {
    let above = state[row - 1][col];
    let below = state[row + 1][col];
    switch (operator) {
      case "=":
        if (this.isNumber(above) && this.isNumber(below))
          return above === below;
        break;
      case ">":
        if (this.isNumber(above) && this.isNumber(below)) return above > below;
        break;
      case "<":
        if (this.isNumber(above) && this.isNumber(below)) return above < below;
        break;
      default:
        break;
    }
    return false;
  }

  static doTheMath(mathematical, operation) {
    switch (operation) {
      case "+":
        let plus = mathematical.split("+");
        return +plus[0] + +plus[1];
      case "-":
        let subtract = mathematical.split("-");
        return +subtract[0] - +subtract[1];
      default:
        break;
    }
  }

  static printStatesPath() {
    console.log("\n---------------------------------");
    console.log("State Path:");
    console.log("---------------------------------");
    for (let i = 0; i < this.statesPath.length; i++) {
      console.log(`${i}:`);
      this.printState(this.statesPath[i]);
      console.log("---------------------------------");
    }
  }

  static printStates(states) {
    // console.log(`Visited States: `);
    for (const state of states) {
      this.printState(state);
      console.log("---------------------------------");
    }
  }

  static getDepth(state, parentMap) {
    let depth = 0;
    let parent = parentMap.get(state);
    while (parent) {
      depth++;
      parent = parentMap.get(parent);
    }
    return depth;
  }

  static getCost() {
    return this.statesPath.length - 1;
  }

  static isNumber(value) {
    return typeof value === "number";
  }
};
