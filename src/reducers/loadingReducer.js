
// Actions
const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";
export const initialLoaderState = { isLoading: false };
// Reducer function
export const loaderReducer = (state, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { isLoading: true };
    case HIDE_LOADER:
      return { isLoading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Initial state

