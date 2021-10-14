const deletedUserReducer = (state = [], action) => {
  switch (action.type) {
    case "DELETED":
      state = [action.payload];
      return state;

    default:
      return state;
  }
};

export default deletedUserReducer;
