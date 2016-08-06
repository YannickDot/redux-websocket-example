export default class ChatWS {
  constructor(url, dispatcher) {
    this.websocket = new WebSocket(`wss://${url}`);
    this.dispatcher = dispatcher
    this.websocket.onmessage = function (event) {
      dispatcher(event.data)
    }
  }

  postMessage(text) {
    this.websocket.send(
      text
    );
  }

  close() {
    this.websocket.close();
  }

}
