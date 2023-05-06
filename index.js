const { createStore, combineReducers } = require("redux");

const ADD_PRODUCT = "ADD_PRODUCT";
const GET_RPODUCT = "GET_RPODUCT";

const CART_ITEMS = "CART_ITEMS";
const ADD_CART_ITEMS = "ADD_CART_ITEMS";

const initialProductState = {
  products: ["Trouser", "shirt", "t-shirt"],
  numberOfProducts: 3,
};

const initialCartState = {
  cartItems: ["Trouser"],
  numberOfItems: 1,
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

const addCartItems = (value) => {
  return {
    type: ADD_CART_ITEMS,
    payload: value,
  };
};

const getCartItems = () => {
  return {
    type: CART_ITEMS,
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

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_CART_ITEMS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        numberOfItems: (state.numberOfItems += 1),
      };
    case CART_ITEMS:
      return state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
});

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(getProduct());
store.dispatch(addProduct("unique product"));
store.dispatch(getCartItems("pant"));
store.dispatch(addCartItems("pant"));
