import React, { Component } from "react";
import EventStore from "../../stores/EventStore";
import EventAddForm from "./EventAddForm"
import Event from './Event';

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
    this.store = new EventStore()

    this.add = event => {
      this.store.addOne(event);
    };

    this.delete = id => {
      this.store.deleteOne(id);
    };

    this.save = (id, event) => {
      this.store.saveOne(id, event);
    };
  }

  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_USER_EVENTS_SUCCESS', () => {
      this.setState({
          events: this.store.events
        })
    })
  }

  render() {
    return (
      <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Person</th>
            <th scope="col">Location</th>
            <th scope="col" colSpan="3">Controls</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.events.map((e, i) => (
          <Event key={i} item={e} onDelete={this.delete} onSave={this.save} />
        ))}
        </tbody>
        <tfoot>
          <EventAddForm onAdd={this.add} />
        </tfoot>
      </table>
    );
  }
}
export default EventList;
