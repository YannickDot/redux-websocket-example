import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from './../actions/ChatActionsCreators.js';
import ChatLogin from './chatlogin.js';

function mapStateToProps(state) {
  return {
    messages: state.messages,
    isConnected : state.messages.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  };
}


class Chat extends React.Component {

  handleSendPost(){
    const messageNode = React.findDOMNode(this.refs.message);
    let text = messageNode.value.trim();

    if(!text){
      return;
    }

    this.props.actions.postMessage(text);
    messageNode.value = '';
  }


  renderMessages(){
   return (
     <div style={styles.container}>
       <ChatLogin />
       <div style={styles.header}>
         { this.props.isConnected ? 'Status : connected' : 'Status : disconnected' }
       </div>
       <div style={styles.msgInput}>
         <input style={styles.msgArea} type="text" ref="message" placeholder="message"/>
         <button
            style={styles.msgBtn}
            type="button"
            onClick={() => this.handleSendPost()}></button>
       </div>

       <div style={styles.msgListContainer}>
         <ul style={styles.msgList}>
           {
             this.props.messages.conversation.map(msg =>
               <li style={styles.message}>{msg.message}</li>
             )
           }
         </ul>
       </div>
     </div>
   );
  }

  renderMessagesEmpty(){
    return (
      <div style={styles.container}>
        <ChatLogin />
        <div style={styles.header}>
          { this.props.isConnected ? 'Status : connected' : 'Status : disconnected' }
        </div>
        <div style={styles.msgInput}>
          <input style={styles.msgArea} type="text" ref="message" placeholder="message"/>
          <button style={styles.msgBtn} type="button" onClick={() => this.handleSendPost()}></button>
        </div>

        <p>No messages</p>
      </div>
    );
  }

  render(){
    const { messages } = this.props;

    if(messages.conversation.length === 0) {
      return this.renderMessagesEmpty();
    } else {
      return this.renderMessages();
    }
  }

}


const styles = {
  hidden: {
    display: 'none'
  },
  header: {
    display: 'flex',
    width: '100%',
    height: '52px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  msgInput: {
    position: 'absolute',
    bottom: 0,
    // left: 0,
    // right: 0,
    width: '360px',
    padding: '12px 0',
    background: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgArea: {
    width: '60%',
    padding: '8px 8px',
    borderRadius: '5px',
    border:' 1px solid transparent',
  },
  msgBtn: {
    marginLeft: '15px',
    padding: '10px',
    borderRadius: '100px',
    border: '1px solid black',
    width: '30px',
    height: '30px',
    'backgroundColor': 'green',
  },
  container: {
    width: '360px',
    position: 'relative',
    minHeight: '100vh'
  },
  message: {
    color: 'white',
    background: '#222',
    padding: '15px 10px',
    maxWidth: '70%',
    display: 'inline-block',
    margin: '4px 0',
    alignSelf: 'flex-start',
    borderRadius: '6px',
  },
  msgList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '80%'
  },
  msgListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Chat);
