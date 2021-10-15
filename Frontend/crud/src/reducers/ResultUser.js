const resultUserReducer = (state = [], action) => {
  switch (action.type) {
    case "RESULT":
      state = [action.payload];
      return state;

    default:
      return state;
  }
};

export default resultUserReducer;
