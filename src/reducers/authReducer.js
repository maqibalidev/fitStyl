export const INITIALVALUES = {
  loading: false,
  success: false,
  error: [],
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case "FAILED": {
      return {
        error: action.payload.error,
        success: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
