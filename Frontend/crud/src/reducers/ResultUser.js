const resultUserReducer = (state = [], action) => {
  switch (action.type) {
    case "RESULT":
      state = [action.payload];
      console.log(state)
      return state;

    default:
      return state;
  }
};

export default resultUserReducer;
