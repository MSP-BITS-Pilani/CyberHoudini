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
    userAnswer: ""
  }
}

  componentDidMount() {
    this.getQuestion(this.state.id);
  }

  getQuestion = (id) => {
    axios({
      method: 'get',
      url: baseUrl + '/question',
      headers: {
        questionID: id
      }
    }).then( response => {
      this.setState({
        question: response.data
      })
    }).catch( error => {
      console.log(error);
    }) 
  }

  handleAnswerChange = (event) => {
    this.setState({
      userAnswer: event.target.value
    })
  }

  handleAnswerSubmit = (event) => {
    const post = {
      userAnswer: this.state.userAnswer,
      questionID: this.state.id
    };
    axios({
      url: baseUrl + '/submitAnswer',
      method: 'post',
      data: post
    }).then(response => {
       if(response.data === false){
         alert("Wrong answer, try again");
       }else{
        this.setState((prevState, props) => {
          const updatedState = {
            id: prevState.id + 1,
            userAnswer: "",
            question: "Loading..."  
          };

          return updatedState;
          
        }, () => {
          if(this.state.id === 11){         // If 10 stages. Update accordingly if stages are different
            alert("Congratulations, you won!");
            // Update DOM to show mario image here
          }else{
            this.getQuestion(this.state.id);
          }
        });
      }
    })

    event.preventDefault();
  }

  render(){

    let additionalClass = "";             // In this question color of background and question is same
    if(this.state.id === 4){
      additionalClass = "questionFour";      // Add code for question where comment has to be embedded in source
    }

    return (
      <div>
        <p className={additionalClass}>{this.state.question}</p>
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