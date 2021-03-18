import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from "../../baseUrl";
import "./quiz.css";
import './qFifteenBill/qFifteenBill';
import QFifteenBill from './qFifteenBill/qFifteenBill';

class Quiz extends Component {
  constructor(props){
  super(props);
  this.state={
    id: 1, 
    question: null,
    userAnswer: "",
    stageNumber: "?",
    imgURL: null
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
        question: response.data.question,
        stageNumber: response.data.stage,
        imgURL: response.data.image
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
            this.getQuestion(this.state.id);
        });
      }
    })

    event.preventDefault();
  }

  render(){

    let additionalClass = "";             // In this question color of background and question is same
    if(this.state.id === 4){
      additionalClass = "questionFour";      
    }

    let additionalDiv = null;
    if(this.state.id === 8){         // for this question URL has to be embedded in page source
        additionalDiv = <div style={{display: 'none'}}>https://mars.nasa.gov/mars2020/spacecraft/rover/</div>
    }

    if(this.state.id === 15){
        additionalDiv = <QFifteenBill />
    }

    let toDisplay = (
      <div>
        <p>Stage number : {this.state.stageNumber}</p>
        {this.state.imgURL.length > 0 &&
            <img src={this.state.imgURL} alt="Question info" />
        }
        {additionalDiv}
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

    if(this.stage.id === 18){           /*For a total of 17 stages*/
       toDisplay = <img src={this.state.imgURL} alt="Princess was in another castle" />
    }

    return (
      {toDisplay}
    );
  }
}

export default Quiz;