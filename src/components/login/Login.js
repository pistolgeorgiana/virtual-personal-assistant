import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import loginImg from "../../assets/login.svg"


class Login extends Component {

    constructor(props) {
      super(props)
      this.state = {
        email : '',
        password : ''
      }

      this.handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }

      this.submit = e => {
        this.props.onSubmit({
          password: this.state.password,
          email: this.state.email
        });
        e.preventDefault();
      };
    }

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" 
                  name="email" 
                  placeholder="email" 
                  value={this.state.email}
                  onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}/>
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="button" className="btn" onClick={this.submit}>
              Login
            </button>
          </div>
      </div>
    }
}

export default withRouter(Login)