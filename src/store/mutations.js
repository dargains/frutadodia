export default {
  writeDatabase(state, token) {
    state.database = token;
  },
  writeStorage(state, token) {
    state.storage = token;
  },
  allFetched(state) {
    state.allFetched = true;
  },
  writeFruits(state, token) {
    state.fruits.push(...token);
  },
  writeDays(state, token) {
    state.days.push(...token);
  },
  writeFruitOfTheDay(state, token) {
    state.fruitOfTheDay.push(...token);
  }
}
