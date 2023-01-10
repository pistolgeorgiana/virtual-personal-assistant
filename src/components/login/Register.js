import React, { Component } from "react";
import registerImg from "../../assets/register.svg";
import UserStore from '../../stores/UserStore'
import { withRouter } from 'react-router-dom'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      birthdate : '',
      errors: {}
    }

    this.store = new UserStore()

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      birthdate: this.state.birthdate
    }

    try {
      this.store.register(newUser).then(res => {
        if(res.data.error !== undefined || (res.data.status !== undefined && !res.data.status.includes('registered'))) {
          window.alert("All fields are required! Name length should be at least 5 chars and the email cannot be used again!")
        } else if(res.data.status !== undefined) {
          window.alert("User created!")
        }
      })
    } catch(err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="content">
          <div className="image">
            <img src={registerImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" 
                name="name" 
                placeholder="name"
                value={this.state.name}
                onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" 
                name="email" 
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" 
                name="password" 
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input type="date" 
                name="birthdate"
                value={this.state.birthdate}
                onChange={this.onChange} />
            </div>
          </div>
        </div>
        <button type="button" className="btn" onClick={this.onSubmit}>
          Register
        </button>
      </div>
    );
  }
}

export default withRouter(Register)