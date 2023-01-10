import React, { Component } from "react"
import "./style.css"
import 'react-notifications-component/dist/theme.css'
import Loader from 'react-loader-spinner'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
import { withRouter } from 'react-router-dom'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class Voice extends Component {
   constructor(props) {
      super(props);

      this.state = {
        isRecording: false
      };

      this.click = this.click.bind(this)
      
      this.handleListen = this.handleListen.bind(this)

      this.synthVoice = this.synthVoice.bind(this)
      
      this.createNotification = () => {
        store.addNotification({
          container: "bottom-left",
          content: (
            <div className="notification-custom-success">
              <div className="notification-custom-content">
                <p id="message" className="notification-message"></p>
              </div>
              <div className="notification-custom-icon">
                <i className="fa fa-check" />
              </div>
            </div>
          )
        })
      }
   };

   click = function() {
      this.setState({
         isRecording : !this.state.isRecording
      }, this.handleListen)
   }

   synthVoice(text) {
    const speechSynthesis = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speechSynthesis.speak(speech);
  }

 handleListen() {
  if (this.state.isRecording) {
    recognition.start()
    recognition.onend = () => {
      recognition.start()
    }

  } else {
    recognition.stop()
    recognition.onend = () => {
      console.log("Stopped listening per click")
    }
  }

  recognition.onstart = () => {
    console.log("Listening!")
  }

  let finalTranscript = ''
  recognition.onresult = event => {
    let interimTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalTranscript += transcript + ' ';
      else interimTranscript += transcript;
    }

    const transcriptArr = finalTranscript.split(' ')
    const stopCmd = transcriptArr.slice(-3, -1)

    if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
      recognition.stop()
      recognition.onend = () => {
        console.log('Stopped listening per command')
        const finalText = transcriptArr.slice(0, -3).join(' ')
        this.click()
        this.createNotification()
        document.getElementById('message').innerHTML = finalText
        this.props.onAdd({
          body : `${finalText}`,
          date : new Date(),
          isBot : false
        }).then(() => {
          this.createNotification()
          document.getElementById('message').innerHTML = this.props.reply
          this.synthVoice(this.props.reply)
          if(this.props.reply.includes('Navigating')) {
            this.props.history.push('/scheduler')
          } else if(this.props.reply.includes('change the mode')) {
            this.props.history.push('/chat')
          }
        })
      }
    }
  }
  
  recognition.onerror = event => {
    console.log("Error occurred in recognition: " + event.error)
  }

}

   render() {
    return(
      <div className="containero fullscreen">
        <ReactNotification />
        <div onClick = {this.click}>
          {this.state.isRecording ? 
            <div className="microphone">
              <Loader type="Puff" color="#00BFFF" height={300} width={300} />
            </div>
            : <button className="fa fa-microphone microphone"/> }
        </div>
      </div>
    );
   }
}

export default withRouter(Voice)