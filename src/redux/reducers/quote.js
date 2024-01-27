import { IS_FETCHING_QUOTE, FETCHED_QUOTE } from '../actions/quote';

const initialState = {
  is_fetching_quote: false,
  fetched_quote: {},
};

export const randomQuote = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_QUOTE:
      return {
        ...state,
        is_fetching_quote: action.payload,
      };
    case FETCHED_QUOTE:
      return {
        ...state,
        fetched_quote: action.payload,
      };
    default:
      return state;
  }
};
