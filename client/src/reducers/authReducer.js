import { FETCH_USER } from '../actions/types';

export default function(state = null, action) { // -> null : we dont know if the user is logged in
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // -> false : not logged in
    default:
      return state;
  }
}