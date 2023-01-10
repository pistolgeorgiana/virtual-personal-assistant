import React, { Component } from "react"

class Input extends Component {
  constructor() {
    super()
    this.state = {
      text: ""
    }

    this.onChange = e => {
      this.setState({[e.target.name]: e.target.value});
    }

    this.onSubmit = async (e) => {
      e.preventDefault()
      await this.props.onSendMessage(this.state.text)
      this.state.text = ''
    }
  }

  render() {
    return (
      <div className="Input">
        <form autoComplete="off">
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            id="message"
            type="text"
            name="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
          />
          <button type="submit" onClick={this.onSubmit}>Send</button>
        </form>
      </div>
    );
  }
}

export default Input