export const deleted = (object) => {
    return {
      type: "DELETED",
      payload: object,
    };
  };