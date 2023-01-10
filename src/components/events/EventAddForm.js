import React, { Component } from "react";

class EventAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type: "",
        person: "",
        date: "",
        location: "",
        time: ""
    };

    this.handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    
  }
  render() {
    return (
      <tr>
      <td>
        <input className="form-control"
          type="text"
          placeholder="type"
          onChange={this.handleChange}
          name="type"
        />
      </td>
      <td>
        <input className="form-control"
          type="date"
          placeholder="date (yyyy-mm-dd)"
          onChange={this.handleChange}
          name="date"
        />
      </td>
      <td>
        <input className="form-control"
          type="text"
          placeholder="person"
          onChange={this.handleChange}
          name="person"
        />
      </td>
      <td>
        <input className="form-control"
          type="text"
          placeholder="location"
          onChange={this.handleChange}
          name="location"
        />
      </td>
      <td colSpan="3">
        <input
          className="btn btn-outline-primary btn-block"
          type="button"
          value="Add"
          onClick={() => {
            this.props.onAdd({
              type: this.state.type,
              person: this.state.person,
              date: this.state.date,
              location: this.state.location,
              time: this.state.time
            });
          }}
        />
      </td>
      </tr>
    );
  }
}

export default EventAddForm;
