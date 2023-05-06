const { createStore, combineReducers, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

const ADD_PRODUCT = "ADD_PRODUCT";
const GET_RPODUCT = "GET_RPODUCT";

const initialProductState = {
  products: ["Trouser", "shirt", "t-shirt"],
  numberOfProducts: 3,
};

const addProduct = (value) => {
  return {
    type: ADD_PRODUCT,
    payload: value,
  };
};

const getProduct = () => {
  return {
    type: GET_RPODUCT,
  };
};

const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        numberOfProducts: (state.numberOfProducts += 1),
      };
    case GET_RPODUCT:
      return state;

    default:
      return state;
  }
};

const store = createStore(productReducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(getProduct());
store.dispatch(addProduct("unique product"));
