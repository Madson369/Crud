const getLoginReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      state = [action.payload];
      console.log(JSON.stringify(action.payload));
      console.log(JSON.stringify(action.payload).length);
      if (JSON.stringify(action.payload).length > 2) {
        return false;
      } else {
        return true;
      }
      return state;

    default:
      return state;
  }
};

export default getLoginReducer;
