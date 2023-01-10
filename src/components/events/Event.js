import React, { Component } from "react"
import {withRouter} from 'react-router-dom'

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      type: this.props.item.type,
      person: this.props.item.person,
      date: this.props.item.date,
      location: this.props.item.location,
      time: this.props.item.time
    }
    this.handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    this.save = () => {
      this.props.onSave(this.props.item.id, {
        id: this.state.id,
        type: this.state.type,
        person: this.state.person,
        date: this.state.date,
        location: this.state.location,
        time: this.state.time
      });
      this.setState({
        isEditing: false
      });
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <tr>
          <td>
            <input className="form-control"
              type="text"
              name="type"
              onChange={this.handleChange}
              value={this.state.type}
            />
          </td>
          <td>
            <input className="form-control"
              type="date"
              name="date"
              onChange={this.handleChange}
              value={this.state.date}
            />
          </td>
          <td>
            <input className="form-control"
              type="text"
              name="person"
              onChange={this.handleChange}
              value={this.state.person}
            />
          </td>
          <td>
            <input className="form-control"
              type="text"
              name="location"
              onChange={this.handleChange}
              value={this.state.location}
            />
          </td>
          <td>
            <input
              className="btn btn-outline-warning btn-block"
              type="button"
              value="Cancel"
              onClick={() =>
                this.setState({
                  isEditing: false
                })
              }
            />
          </td>
          <td><input className="btn btn-outline-success btn-block" 
            type="button" value="Save" onClick={this.save} /></td>
        </tr>
      );
    } else {
        return(
          <tr>
            <th>{this.props.item.type}</th>
            <td>{this.props.item.date.toString().substr(0, 10)}</td>
            <td>{this.props.item.person}</td>
            <td>{this.props.item.location}</td>
            <td className="text-right">
              <button className="btn btn-outline-info " onClick={() => this.setState({
                        isEditing : true
                    })}> Edit </button>
            </td>
            <td className="text-right">
              <button className="btn btn-outline-danger " onClick={() => 
                this.props.onDelete(this.props.item.id)}> Delete </button>
            </td>
          </tr>
        )
    }
  }
}
export default withRouter(Event)
