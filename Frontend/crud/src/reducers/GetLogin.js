const getLoginReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      state = [action.payload];
      return state;

    default:
      return state;
  }
};

export default getLoginReducer;
