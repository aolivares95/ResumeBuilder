import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Resume from './resumeForm';

class App extends Component{
  
  render(){
  return (
    <div className="App">
      <h1>
        Resume Generator
      </h1>
      <Resume></Resume>
    </div>
  );
}
}

export default App;
