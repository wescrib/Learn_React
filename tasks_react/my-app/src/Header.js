import React, { Component } from 'react';
// import logo from './logo.svg';
import './Header.css';

class Header extends Component {

  tasks = [];
  constructor(props){
    super(props)
    this.state = {
      tasks:[]
    }
    console.log(props.title)
  }

  render() {
    return (
      <div className="Header">
        <p>{this.props.title}</p>
        { this.state.tasks }
      </div>
    );
  }

  componentDidMount(){
    fetch("http://localhost:8000/api/tasks")
    .then(data => data.json())
    .then(data => {
      for(let task in data){
        data[task] = (
          <div key={data[task]._id}>
            <p>{ data[task].title }</p>
            <p>{ data[task].description }</p>
          </div>
        )
      }
      this.setState({
        tasks:data
      });
    })
    .catch(err => console.log(err))
  }
}

export default Header;
