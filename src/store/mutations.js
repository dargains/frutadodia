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
  writeFruitOfTheDay(state, token) {
    const fruits = [];
    token.forEach(element => {
      let fruit = state.fruits.find(fruit => fruit.name === element);
      fruit.image = `../assets/images/${fruit.name}.png`;
      fruits.push(fruit)
    });
    state.fruitOfTheDay.push(...fruits);
  }
}
