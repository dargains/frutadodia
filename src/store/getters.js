const toDateTime = secs => {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
}

export default {
  fruitToday(state) {
    const newDate = new Date();
    const today = state.days.find(day => toDateTime(day.day.seconds).getDate() === newDate.getDate());
    return state.fruits.find(fruit => fruit.name === today.name)
  },
  fruitYesterday(state) {
    const newDate = new Date();
    const today = state.days.find(day => toDateTime(day.day.seconds).getDate() === newDate.getDate() - 1);
    return state.fruits.find(fruit => fruit.name === today.name)
  },
  fruitNames(state) {
    const list = []
    state.fruits.forEach(fruit => {
      list.push(fruit.name);
    });
    return list;
  }
}
