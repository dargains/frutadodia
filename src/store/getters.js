const toDateTime = secs => {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
}

export default {
  fruitToday(state) {
    if (!state.dataFetched || !state.fruitsFetched || !state.daysFetched) return;
    const newDate = new Date();
    const today = state.days.find(day => toDateTime(day.day.seconds).getDate() === newDate.getDate());
    const fruit = today ? state.fruits.find(fruit => fruit.name === today.name) : {name: 'nenhuma', image:'img/nenhuma.png'}
    state.storage.ref(`fruits/${fruit.name}.png`).getDownloadURL().then(url => {
      fruit.image = url;
    })
    return fruit;
  },
  // fruitYesterday(state) {
  //   if (!state.dataFetched || !state.fruitsFetched || !state.daysFetched) return;
  //   const newDate = new Date();
  //   const today = state.days.find(day => toDateTime(day.day.seconds).getDate() === newDate.getDate() - 1);
  //   return state.fruits.find(fruit => fruit.name === today.name)
  // },
  fruitNames(state) {
    if (!state.dataFetched || !state.fruitsFetched || !state.daysFetched) return;
    const list = []
    state.fruits.forEach(fruit => {
      list.push(fruit.name);
    });
    return list;
  }
}
