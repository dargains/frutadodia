export default {
  writeDatabase(state, token) {
    state.database = token;
  },
  dataFetched(state) {
    state.dataFetched = true;
  },
  writeFruits(state, token) {
    state.fruits.push(...token);
    state.fruitsFetched = true;
  },
  writeDays(state, token) {
    state.days.push(...token);
    state.daysFetched = true;
  }
}
