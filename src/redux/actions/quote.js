import axios from 'axios';
import { APP } from '../../utils/constant';

export const IS_FETCHING_QUOTE = 'IS_FETCHING_QUOTE';
export const FETCH_QUOTE = 'FETCH_QUOTE';
export const FETCHED_QUOTE = 'FETCHED_QUOTE';
export const setIsFetchingQuote = (payload) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_QUOTE,
    payload,
  });
};
export const setFetchedQuote = (payload) => (dispatch) => {
  dispatch({
    type: FETCHED_QUOTE,
    payload,
  });
};

export const fetchQuote = () => (dispatch, getState) => {
  dispatch(setIsFetchingQuote(true));
  axios
    .get('https://api.api-ninjas.com/v1/quotes?category=intelligence', {
      headers: {
        'X-Api-Key': '2zLH0GZA8etsPv5V1ZZuBA==AGAlwa3DpOMqZXev',
      },
    })
    .then((res) => {
      dispatch(setIsFetchingQuote(false));
      dispatch(setFetchedQuote(res.data[0]));
    })
    .catch((error) => {
      dispatch(setIsFetchingQuote(false));
      console.log(error);
    });
};
