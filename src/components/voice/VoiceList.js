import React, { Component } from "react";
import RequestStore from "../../stores/RequestStore";
import Voice from "./Voice"

class VoiceList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests : [], 
      reply : null
    };
    
    this.store = new RequestStore();

    this.add = async (request) => {
      await this.store.addOne(request)
      this.setState({
        reply : this.store.state.reply
      })
      await this.store.addOne({
          body : `${this.state.reply}`,
          date : new Date(),
          isBot : true
      })
    }
  }

  render() {
      return (
        <div>
          <Voice onAdd={this.add} reply={this.state.reply} />
        </div>
      );
  }
}
export default VoiceList;
