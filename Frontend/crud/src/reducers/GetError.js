const getErrorReducer = (state = [], action) => {
  switch (action.type) {
    case "GETERROR":
      state = [action.payload];
      return state;

    default:
      return state;
  }
};

export default getErrorReducer;
