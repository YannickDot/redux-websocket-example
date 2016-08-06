import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import Chat from './components/chat.js';
import WSInstance from './utils/ChatWebsocket.js';
import * as ChatActions from './actions/ChatActionsCreators.js';
import * as ActionTypes from './constants/ActionTypes.js';

const reducer = combineReducers(reducers);

function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
  const store = finalCreateStore(reducer);

  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      const nextRootReducer = require('./reducers/index.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const redux = configureStore();

function selectState(state) {
  return state;
}

React.render(
  <div>
    <Provider store={redux}>
      {() => <Chat />}
    </Provider>
    <DebugPanel top right bottom>
       <DevTools store={redux}
                 monitor={LogMonitor}
                 select={selectState} />
     </DebugPanel>
  </div>,
  document.getElementById("appview")
);


const URL = 'echo.websocket.org';

const sock = {
  ws: null,
  URL: 'echo.websocket.org',
  wsDipatcher: (msg) => {
    return redux.dispatch(ChatActions.receiveMessage(msg));
  },
  wsListener: () => {
    const { lastAction } = redux.getState();

    switch (lastAction.type) {
      case ActionTypes.POST_MESSAGE:
        return sock.ws.postMessage(lastAction.text);

      case ActionTypes.CONNECT:
        return sock.startWS();

      case ActionTypes.DISCONNECT:
        return sock.stopWS();

      default:
        return;
    }
  },
  stopWS: () => {
    sock.ws.close();
    sock.ws = null
  },
  startWS: () => {
    if(!!sock.ws) sock.ws.close();

    sock.ws = new WSInstance(sock.URL, sock.wsDipatcher)
  }
};

redux.subscribe(() => sock.wsListener());
