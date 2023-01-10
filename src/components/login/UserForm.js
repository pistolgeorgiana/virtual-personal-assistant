import React, { Component } from "react";
import "./style.scss";
import Login from "./Login";
import Register from "./Register";
import { withRouter } from 'react-router-dom'
import UserStore from "../../stores/UserStore";

class UserForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogginActive: true
      };

      this.store = new UserStore()

      this.submit = (user) => {
        try {
          this.store.login(user).then(res => {
          if (res && res.error === undefined ) {
            this.props.history.push(`/voice`)
          } else {
            window.alert('User not found!')
          }
        })
      } catch(err) {
        console.warn(err)
      }
    }
    }
  
    componentDidMount() {
      this.rightSide.classList.add("right");
    }
  
    changeState() {
      const { isLogginActive } = this.state;
  
      if (isLogginActive) {
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
      } else {
        this.rightSide.classList.remove("left");
        this.rightSide.classList.add("right");
      }
      this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }
  
    render() {
      const { isLogginActive } = this.state;
      const current = isLogginActive ? "Register" : "Login";
      const currentActive = isLogginActive ? "login" : "register";
      return (
          <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
              {isLogginActive && (
                <Login containerRef={ref => (this.current = ref)} onSubmit={this.submit}/>
              )}
              {!isLogginActive && (
                <Register containerRef={ref => (this.current = ref)} />
              )}
            </div>
            <RightSide
              current={current}
              currentActive={currentActive}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
      );
    }
  }
  
  const RightSide = props => {
    return (
      <div
        className="right-side"
        ref={props.containerRef}
        onClick={props.onClick}
      >
        <div className="inner-container">
          <div className="text">{props.current}</div>
        </div>
      </div>
    );
  };
  
  export default withRouter(UserForm)