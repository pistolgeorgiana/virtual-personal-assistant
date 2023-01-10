import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './style.css';
import Messages from "./Message";
import Input from "./Input";
import RequestStore from '../../stores/RequestStore'

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class ChatUI extends Component {
  constructor() {
    super();
    this.state = {
      reply: null,
      requests : [],
      member : {
        color: randomColor()
      }
    }
    this.store = new RequestStore()

    this.onSendMessage = async (message) => {
      await this.store.addOne({
          body : `${message}`,
          date : new Date(),
          isBot : false
      })
      this.setState({
        reply : this.store.state.reply
      })
      await this.store.addOne({
          body : `${this.state.reply}`,
          date : new Date(),
          isBot : true
      })
      if(this.state.reply.includes('Navigating')) {
        this.props.history.push('/scheduler')
      } else if(this.state.reply.includes('change the mode')) {
        this.props.history.push('/voice')
      }
    }
  }

  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_USER_REQUESTS_SUCCESS', () => {
      this.setState({
        requests : this.store.requests
      })
    })
  }

  render() {
    return (
      <div className="contains">
        <div className="App-header">
          <h1>Chat with Botino</h1>
        </div>
        <Messages
          messages={this.state.requests}
          currentMember={this.state.member}
        />
        <footer className="send">
        <Input 
          onSendMessage={this.onSendMessage}
        />
        </footer>
      </div>
    )
  }

}

export default withRouter(ChatUI)