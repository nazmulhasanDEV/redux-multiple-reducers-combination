const { default: axios } = require("axios");
const { createStore, combineReducers, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const thunk = require("redux-thunk").default;

const REQUEST_SENT = "REQUEST_SENT";
const SUCESS = "SUCESS";
const ERROR = "ERROR";

const API_URL = "https://jsonplaceholder.typicode.com/todo";

const initialState = {
  todos: [],
  isError: null,
  isLoading: null,
};

const requestSent = () => {
  return {
    type: REQUEST_SENT,
  };
};

const requestSuccess = (value) => {
  return {
    type: SUCESS,
    payload: value,
  };
};

const requestFailed = (value) => {
  return {
    type: ERROR,
    payload: value,
  };
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
      };
    case SUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: action.payload,
      };

    case ERROR:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };

    default:
      return state;
  }
};

const fetchTodos = () => {
  return (dispatch) => {
    dispatch(requestSent());
    axios
      .get(API_URL)
      .then((response) => {
        // console.log(response.data);
        dispatch(requestSuccess(response.data));
      })
      .catch((error) => {
        const emsg = error.message;
        // console.log(error.message);
        dispatch(requestFailed(emsg));
      });
  };
};

const store = createStore(todoReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchTodos());
