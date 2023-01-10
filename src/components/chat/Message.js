import React, { Component } from "react"

class Message extends Component {
  constructor() {
    super()
  }
    render() {
        const {messages} = this.props;
        return (
          <ul id="message" className="Messages-list">
            {messages.map(m => this.renderMessage(m))}
          </ul>
        );
      }
    
      renderMessage(message) {
        const {currentMember} = this.props;
        const messageFromMe = (message.isBot === false);
        const className = messageFromMe ?
          "Messages-message currentMember" : "Messages-message";
        return (
          <li className={className}>
          <span
            className="avatar"
            style={{backgroundColor: currentMember.color}}
          />
            <div className="Message-content">
              <div className="username">
                {currentMember.username}
              </div>
              <div className="text">{message.body}</div>
            </div>
          </li>
        );
      }
}

export default Message