module.exports = class MovesCheck {
  static checkLeftMove(state, row, col) {
    if (col > 0 && state[row][col - 1] === " ") return true;
  }
  static checkRightMove(state, row, col) {
    if (col < state[row].length - 1 && state[row][col + 1] === " ") return true;
  }
  static checkUpMove(state, row, col) {
    if (row > 0 && state[row - 1][col] === " ") return true;
  }
  static checkDownMove(state, row, col) {
    if (row < state.length - 1 && state[row + 1][col] === " ") return true;
  }
};
