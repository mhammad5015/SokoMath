const Structure = require("../structure/structure");
const Helper = require("../structure/helper");

module.exports = class Astar {
  static start(initialState, requiredCells) {
    var queue = new PriorityQueue();
    const visited = new Set();
    const parentMap = new Map();

    console.time("A* Time");
    queue.enqueue([initialState, requiredCells], 0);

    while (!queue.isEmpty()) {
      const currentQElement = queue.dequeue();
      const currentElement = currentQElement.element;
      if (visited.has(JSON.stringify(currentElement[0]))) continue;
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
          "A* Time"
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
          parentMap.set(nextState, currentElement);
          let h = this.heuristic(nextState[0], nextState[1]);
          let g = Structure.getDepth(nextState, parentMap);
          let f = g + h;
          if (queue.replace(nextState, f, g, h)) {
            continue;
          }
          queue.enqueue(nextState, f);
          Structure.treeDepth = Math.max(
            Structure.treeDepth,
            Structure.getDepth(nextState, parentMap)
          );
        }
      }
    }
  }

  static heuristic(state, requiredCells) {
    return (
      this.inPlace(state, requiredCells) + this.equation(state, requiredCells)
    );
  }

  static inPlace(state, requiredCells) {
    let totalDistance = 0;
    for (const cellCoord in requiredCells) {
      if (
        requiredCells.hasOwnProperty(cellCoord) &&
        !requiredCells[cellCoord]
      ) {
        const [row, col] = cellCoord.split(",");
        const requiredCellRow = parseInt(row);
        const requiredCellCol = parseInt(col);
        const cell = state[requiredCellRow][requiredCellCol];
        
        for (let i = 0; i < state.length; i++) {
          for (let j = 0; j < state[i].length; j++) {
            if((state[i][j] !== '#' || state[i][j] !== ' ') && requiredCells[`${i},${j}`] == false){
              this.manDistance();
            }
          }
        }
      }
    }
    return totalDistance;
  }

  static manDistance(){

  }

  static equation(state, requiredCells) {
    let heuristic = 10;
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (this.isTrue(state)) {
          return 0;
        } else if (state[i][j] == "=") {
          if (
            typeof state[i][j - 1] == "number" &&
            typeof state[i][j + 1] == "number"
          ) {
            return heuristic - 2;
          }
        }
      }
    }
    return heuristic;
  }
  static isTrue(state) {
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (state[i][j] === "#") continue;
        if (
          (state[i][j - 1] == state[i][j + 1] &&
            typeof state[i][j - 1] === "number" &&
            state[i - 1][j] == state[i + 1][j] &&
            typeof state[i - 1][j] === "number") ||
          (state[i][j - 1] == state[i][j + 1] &&
            typeof state[i][j - 1] === "number") ||
          (state[i - 1][j] == state[i + 1][j] &&
            typeof state[i - 1][j] === "number")
        ) {
          return true;
        }
      }
    }
  }
};

// User defined class to store element and its priority
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  // enqueue(item, priority) enqueue function to add element to the queue as per priority
  enqueue(element, priority) {
    // creating object from queue element
    var qElement = new QElement(element, priority);
    var contain = false;
    // iterating through the entire item array to add element at the correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    // if the element have the highest priority it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }

  // dequeue method to remove element from the queue
  dequeue() {
    // return the dequeued element and remove it. if the queue is empty returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  // pop method to remove last element from the queue
  pop() {
    // return the poped element and remove it. if the queue is empty returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }

  // front function
  front() {
    // returns the highest priority element in the Priority queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  // rear function
  rear() {
    // returns the lowest priority element of the queue
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }

  // prints all the element of the queue
  printPQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i].element + " ";
    return str;
  }

  compare(priority1, priority2) {
    return priority1 - priority2;
  }

  replace(element, priority, g, h) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].element === element) {
        if (this.compare(this.items[i].priority, priority) < 0) {
          this.items.splice(i, 1, element);
          return true;
        } else if (this.compare(this.items[i].priority, priority) == 0) {
          if (this.compare(this.items[i].priority - g, h) < 0) {
            this.items.splice(i, 1, element);
            return true;
          }
        }
      }
    }
    return false;
  }
}
