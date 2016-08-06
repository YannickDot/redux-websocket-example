export default class Message {
  constructor(message, isRead) {
    this.message = message;
    this.read = isRead || false;
  }

  read() {
    this.read = true;
    return this;
  }

}
