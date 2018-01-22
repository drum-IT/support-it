import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.createIncident = this.createIncident.bind(this);
    this.newIncident = this.newIncident.bind(this);
    this.state = {
      title: "",
      note: "",
      category: "none",
      number: ""
    };
  }
  // move this into a module
  async getIncidents() {
    console.log("getting incidents from api");
    try {
      let response = await fetch("/api/incidents");
      if (response.ok) {
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
      }
      throw new Error("Request failed!");
    } catch (error) {
      return error;
    }
  }

  // move to another module
  async createIncident() {
    console.log("creating incident via api");
    const newIncident = {
      title: this.state.title,
      notes: this.state.note,
      number: this.state.number,
      category: this.state.category
    };
    // this.setState({ title: "", note: "", category: "none" });
    try {
      let response = await fetch(`/api/incidents${this.state.number ? "/" + this.state.number : ""}`, {
        method: !this.state.number ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incident: newIncident })
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        this.setState({ number: jsonResponse.incident.number});
        return jsonResponse;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      return error;
    }
  }

  onInputChange(input, ref) {
    this.setState({ [ref]: input });
  }

  newIncident() {
    this.setState({ title: "", note: "", category: "none", number: "" })
  }

  render() {
    return (
      <div>
        <button onClick={this.getIncidents}>Get Incidents</button>
        <button onClick={this.createIncident}>Save Incident</button>
        <button onClick={this.newIncident}>New Incident</button>
        <form>
          <p>{this.state.number}</p>
          <label>Title</label>
          <input
            name="title"
            value={this.state.title}
            type="text"
            onChange={event => {
              this.onInputChange(event.target.value, event.target.name);
            }}
          />
          <label>Note</label>
          <input
            name="note"
            value={this.state.note}
            type="text"
            onChange={event => {
              this.onInputChange(event.target.value, event.target.name);
            }}
          />
          <select 
            name="category"
            value={this.state.category}
            onChange={event => {
              this.onInputChange(event.target.value, event.target.name);
            }}
          >
            <option value="none">-None-</option>
            <option value="crash">Crash</option>
            <option value="slow">Slow</option>
            <option value="broken">Broken</option>
          </select>
        </form>
      </div>
    );
  }
}

export default App;
