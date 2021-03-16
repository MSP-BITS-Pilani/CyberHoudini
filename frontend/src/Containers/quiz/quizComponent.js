import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from "../../baseUrl";
import "./quiz.css";

class Quiz extends Component {
  constructor(props){
  super(props);
  this.state={
    id: 1, 
    question: null,
    answer: null,
    userAnswer: "",
  }
}

  componentDidMount() {
    this.getQuestion(this.state.id);
  }

  getQuestion = (id) => {
    // axios.get(baseUrl + '/question', {
    //   params: {
    //     ID: id
    //   }
    // }).then( response => {
    //   this.setState({
    //     question: response.data.question,
    //     answer: response.data.answer
    //   })
    // }).catch( error => {
    //   console.log(error);
    // })

    this.setState({
      question: "A question",
      answer: "42"
    })
      
  }

  handleAnswerChange = (event) => {
    this.setState({
      userAnswer: event.target.value
    })
  }

  handleAnswerSubmit = (event) => {
    const trimmedUserAnswer = this.state.userAnswer.trim();
    if(trimmedUserAnswer === this.state.answer){
      alert("correct!");
    }
    else{
      alert("Sorry, wrong answer!");
    }
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <p>{this.state.question}</p>
        <form onSubmit={this.handleAnswerSubmit}>
          <label>
            Enter Answer:
            <input type="text" value={this.state.value} onChange={this.handleAnswerChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Quiz;