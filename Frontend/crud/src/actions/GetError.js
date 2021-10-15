export const geterror = (object) => {
    return {
      type: "GETERROR",
      payload: object,
    };
  };
  
  export const clear = () => {
    return {
      type: "CLEAR",
    };
  };
  