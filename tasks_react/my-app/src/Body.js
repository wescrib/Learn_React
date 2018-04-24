import React, { Component } from 'react';
// import logo from './logo.svg';
import './Body.css';

class Body extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks:[],

      task: {
        title:"",
        description:""
      }
    };
  }

  // Example POST method implementation:


  postData(url, data) {
  // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
  }

  submit(event){
    event.preventDefault();

    console.log(this.task)

    this.postData("http://localhost:8000/api/tasks", this.task)
    .then(data => {
      if(data.errors){
        console.log(data.errors);
      } else {
        let tasks = this.state.tasks;
        tasks.push(data);
        this.setState({
          tasks:tasks,
          task:{
            title: "",
            description: ""
          }
        })
      }
    })
    .catch(error => console.error(error))
  }

  setTitle(event){
    let task = this.state.task;
    task.title = event.target.value
    this.setState({
      task:task
    })
  }

  setDescription(event){
    let task = this.state.task
    task.description = event.target.value;
    this.setState({
      task:task
    })
  }

  render() {
    return (
      <div className="Body">
        <p>{ this.props.test }</p>
        <div>{ this.state.tasks }</div>

        { JSON.stringify(this.state.task)}

        <form onSubmit={(event) => this.submit}>
          <p>Title: <input type="text" onChange={(event) => {this.setTitle(event)} }/></p>
          <p>Description: <input type="text" onChange={(event) => {this.setDescription(event)}}/></p>
          <input type="submit" value="Add task" />
        </form>
      </div>
    );
  }
}

export default Body;