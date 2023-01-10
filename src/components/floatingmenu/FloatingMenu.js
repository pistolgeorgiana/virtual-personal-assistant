import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from 'react-floating-button-menu';
import Menu from '@material-ui/icons/MenuBookTwoTone';
import Close from '@material-ui/icons/Clear';
import Chat from '@material-ui/icons/Chat';
import Event from '@material-ui/icons/Event';
import Voice from '@material-ui/icons/RecordVoiceOver';
import Exit from '@material-ui/icons/ExitToApp';

class Floating extends Component {
  constructor(props) {
      super(props)
    this.state = {
        isOpen: false,
    }
  }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/')
  }

  render() {
    if (localStorage.getItem('usertoken')) {
      return(
         
    <FloatingMenu
      slideSpeed={500}
      direction="up"
      spacing={8}
      isOpen={this.state.isOpen}
    >
       
      <MainButton
        iconResting={<Menu style={{ fontSize: 75 }} nativecolor="black" />}
        iconActive={<Close style={{ fontSize: 75 }} nativecolor="black" />}
        backgroundColor="black"
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        size={150}
      />
        <ChildButton
          icon={<Chat style={{ fontSize: 60 }} nativecolor="black" />}
          backgroundColor="black"
          size={120}
          onClick={() => this.props.history.push('/chat')}>
            <Link to='/chat'/>
        </ChildButton>
        <ChildButton
          icon={<Voice style={{ fontSize: 60 }} nativecolor="black" />}
          backgroundColor="black"
          size={120}
          onClick={() => this.props.history.push('/voice')}>
            <Link to='/voice'/>
        </ChildButton>
        <ChildButton
          icon={<Event style={{ fontSize: 60 }} nativecolor="black" />}
          backgroundColor="black"
          size={120}
          onClick={() => this.props.history.push('/scheduler')}>
            <Link to='/scheduler'/>
        </ChildButton>
        <ChildButton
          icon={<Exit style={{ fontSize: 60 }} nativecolor="black" />}
          backgroundColor="black"
          size={120}
          onClick={this.logOut.bind(this)}
      /> 
      </FloatingMenu> 
    )}
    return (
      <div/>
    )
  }
}

  export default withRouter(Floating)