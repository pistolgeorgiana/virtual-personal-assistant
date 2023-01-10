import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventStore from '../../stores/EventStore'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction'

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

class Scheduler extends Component {
  constructor() {
    super()
    this.calendarComponentRef = React.createRef()
    this.state = {
      calendarWeekends: true,
      calendarEvents: [],
      events: []
    }
    this.store = new EventStore()

    this.add = event => {
      this.store.addOne(event);
      // let calEvent = {
      //   title: event.type,
      //   start: event.date,
      //   allDay: "true",
      //   extendedProps: {
      //     person: event.person,
      //     location: event.location
      //   }
      // }
      // this.setState({
      //   calendarEvents: this.state.calendarEvents.concat(calEvent)
      // })
    }
  }
  
  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_USER_EVENTS_SUCCESS', () => {
      this.setState({
        events: this.store.events
      })
      this.setState({
        calendarEvents: []
      })
      this.state.events.map(event => {
        let calEvent = {
          title: event.type,
          start: event.date,
          editable : true,
          allDay: "true",
          extendedProps: {
            person: event.person,
            location: event.location
          }
        } 
        this.setState({
          calendarEvents: this.state.calendarEvents.concat(calEvent)
        })
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
        </div>
        <div>
          <FullCalendar
            defaultView="dayGridMonth"
            editable={true}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            ref={ this.calendarComponentRef }
            weekends={ this.state.calendarWeekends }
            events={ this.state.calendarEvents }
            dateClick={ this.handleDateClick }
            eventClick={ this.handleEventClick }
            height={window.innerHeight}
            />
        </div>
      </div>
    )
  }
  
    toggleWeekends = () => {
      this.setState({
        calendarWeekends: !this.state.calendarWeekends
      })
    }
  
    handleDateClick = (arg) => {
      if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.add({
          type : "My Event",
          date : new Date(arg.dateStr),
          person : "me",
          location : "online"
        })
      }
    }
    handleEventClick = (arg) => {
      if (window.confirm('Would you like to edit all the events?')) {
        this.props.history.push('/event')
      }
    }
}

export default withRouter(Scheduler)