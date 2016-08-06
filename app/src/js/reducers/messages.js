'use strict';

import { RECEIVE_MESSAGE, DISCONNECT, CONNECT } from '../constants/ActionTypes';

import Message from '../utils/message.js';

const initialState = {
  conversation: [],
  status: false
};

export default function messages(state = initialState, action) {

  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        conversation: [ ...state.conversation, new Message(action.message)]
      }

    case CONNECT:
      return {
        conversation: [],
        status: true
      }

    case DISCONNECT:
      return {
        conversation: [],
        status: false
      }

    default:
      return state;
  }

}
