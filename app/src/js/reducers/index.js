import messages from './messages.js';

function lastAction(state = null, action) {
  return action;
}

export default { messages, lastAction };
