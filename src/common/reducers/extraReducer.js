export const generateExtraReducers =
(pendingActions, fulfilledActions, rejectedActions) => {
  return {
    [pendingActions[0]]: (state) => {
      state.loading = true;
    },
    [fulfilledActions[0]]: (state) => {
      state.loading = false;
    },
    [rejectedActions[0]]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  };
};

export const generateExtraReducersFromActions = (actions) => {
  const { pending, fulfilled, rejected } = actions;
  return generateExtraReducers([pending], [fulfilled], [rejected]);
};
