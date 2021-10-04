import React, { createContext } from "react";

interface State {
  count: number;
}

type Actions = { type: "increment" } | { type: "decrement" };
type DispatchType = React.Dispatch<Actions>;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Invalid action");
  }
};

const StateContext = React.createContext<State | undefined>(undefined);
StateContext.displayName = "StateContext";

const DispatchContext = React.createContext<DispatchType | undefined>(
  undefined
);
DispatchContext.displayName = "DispatchContext";

interface StateProviderProps {
  children: React.ReactNode;
  initialCount?: number;
}

export const StateProvider = (props: StateProviderProps) => {
  const { children, initialCount = 0 } = props;

  const [state, dispatch] = React.useReducer(reducer, { count: initialCount });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useState = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  if (!state || !dispatch) {
    throw Error("Cannot find context. Ensure you are using <StateProvider/>");
  }
  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  return {
    state,
    increment,
    decrement
  };
};
