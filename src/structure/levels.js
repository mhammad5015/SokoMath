module.exports = class Levels {
  static selectLevel(level) {
    let levelAndRequired = [];
    switch (level) {
      case 1:
        let level_1 = [
          ["#", "#", "#", "#", "#"],
          ["#", "#", "=", "#", "#"],
          ["#", 2, " ", 2, "#"],
          ["#", "#", "#", "#", "#"],
        ];
        let requiredCells_level_1 = {
          "2,1": true,
          "2,2": false,
          "2,3": true,
        };
        levelAndRequired.push(level_1, requiredCells_level_1);
        return levelAndRequired;
      case 2:
        let level_2 = [
          ["#", "#", "#", "#", "#", "#", "#"],
          ["#", 4, " ", " ", " ", 4, "#"],
          ["#", "#", "#", "=", "#", "#", "#"],
          ["#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_2 = {
          "1,2": false,
          "1,3": false,
          "1,4": false,
        };
        levelAndRequired.push(level_2, required_level_2);
        return levelAndRequired;
      case 3:
        let level_3 = [
          ["#", "#", "#", "#", "#", "#", "#", "#"],
          ["#", " ", " ", 1, " ", " ", 3, "#"],
          ["#", 2, "+", "#", "=", "#", "#", "#"],
          ["#", "#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_3 = {
          "1,1": false,
          "1,2": false,
          "1,3": true,
          "1,4": false,
          "1,5": false,
        };
        levelAndRequired.push(level_3, required_level_3);
        return levelAndRequired;
      case 4:
        let level_4 = [
          ["#", "#", "#", "#", "#"],
          ["#", "#", 1, "#", "#"],
          ["#", 2, 2, 1, "#"],
          ["#", "#", "=", " ", "#"],
          ["#", "#", "#", "#", "#"],
        ];
        const required_level_4 = {
          "1,2": true,
          "2,1": true,
          "2,2": true,
          "2,3": true,
          "3,2": true,
        };
        levelAndRequired.push(level_4, required_level_4);
        return levelAndRequired;
      case 5:
        let level_5 = [
          ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
          ["#", "+", " ", " ", " ", "=", 2, 1, "#"],
          ["#", 3, "#", "#", " ", "#", "#", "#", "#"],
          ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_5 = {
          "1,1": true,
          "1,2": false,
          "1,3": false,
          "1,4": false,
          "1,5": true,
        };
        levelAndRequired.push(level_5, required_level_5);
        return levelAndRequired;
      case 6:
        let level_6 = [
          ["#", "#", "#", "#", "#"],
          ["#", "=", "#", "#", "#"],
          ["#", 3, " ", " ", "#"],
          ["#", 3, "#", " ", "#"],
          ["#", " ", " ", " ", "#"],
          ["#", "#", "#", "#", "#"],
        ];
        const required_level_6 = {
          "4,1": false,
          "4,2": false,
          "4,3": false,
        };
        levelAndRequired.push(level_6, required_level_6);
        return levelAndRequired;
      case 7:
        let level_7 = [
          ["#", "#", "#", "#", "#", "#", "#", "#"],
          ["#", 2, " ", " ", " ", " ", 2, "#"],
          ["#", 1, "#", " ", "#", "#", "=", "#"],
          ["#", "=", "#", " ", " ", " ", 1, "#"],
          ["#", "#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_7 = {
          "1,1": true,
          "2,1": true,
          "3,1": true,
          "1,4": false,
          "1,5": false,
          "1,6": true,
        };
        levelAndRequired.push(level_7, required_level_7);
        return levelAndRequired;
      case 8:
        let level_8 = [
          ["#", "#", "#", "#", "#", "#", "#"],
          ["#", "#", " ", " ", " ", "#", "#"],
          ["#", "-", 1, " ", " ", 3, "#"],
          ["#", "#", 4, " ", "#", "#", "#"],
          ["#", "#", "=", "#", "#", "#", "#"],
          ["#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_8 = {
          "2,1": true,
          "2,2": true,
          "2,3": false,
          "2,4": false,
          "2,5": true,
        };
        levelAndRequired.push(level_8, required_level_8);
        return levelAndRequired;
      case 9:
        let level_9 = [
          ["#", "#", "#", "#", "#", "#", "#"],
          ["#", 8, 3, "+", "=", 5, "#"],
          ["#", "#", "=", " ", 3, 3, "#"],
          ["#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_9 = {
          "1,1": true,
          "1,2": true,
          "1,3": true,
          "1,4": true,
          "1,5": true,
          "2,3": false,
          "2,4": true,
          "2,5": true,
        };
        levelAndRequired.push(level_9, required_level_9);
        return levelAndRequired;
      case 10:
        let level_10 = [
          ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
          ["#", 1, ">", 2, ">", 3, " ", " ", "#"],
          ["#", "#", "#", " ", " ", "#", "#", "#", "#"],
          ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ];
        const required_level_10 = {
          "1,3": true,
          "1,4": true,
          "1,5": true,
          "1,6": false,
          "1,7": false,
        };
        levelAndRequired.push(level_10, required_level_10);
        return levelAndRequired;
      default:
        break;
    }
  }
};
