export default {
  fruitNames(state) {
    if (!state.dataFetched) return;
    const list = []
    state.fruits.forEach(fruit => {
      list.push(fruit.name);
    });
    return list;
  }
}
