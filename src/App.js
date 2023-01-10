import React, { Component } from "react";
import "./App.css";
import "./components/login/style.scss";
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'
import UserForm from "./components/login/UserForm"
import ChatUI from "./components/chat/ChatUI"
import VoiceList from "./components/voice/VoiceList"
import Scheduler from "./components/scheduler/Scheduler"
import Event from "./components/events/EventList"
import Floating from "./components/floatingmenu/FloatingMenu"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={UserForm} />
          <Route exact path="/chat" component={ChatUI} />
          <Route exact path="/voice" component={VoiceList} />
          <Route exact path="/scheduler" component={Scheduler} />
          <Route exact path="/event" component={Event} />
        </div>
        <footer>
          <Floating />
        </footer>
      </Router>
    )
  }
}

export default App;