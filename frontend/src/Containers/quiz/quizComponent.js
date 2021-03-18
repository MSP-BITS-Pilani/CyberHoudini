import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from "../../baseUrl";
import "./quiz.css";
import './qFifteenBill/qFifteenBill';
import QFifteenBill from './qFifteenBill/qFifteenBill';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Fade, Form, FormGroup, Label, Input
} from 'reactstrap';

class Quiz extends Component {
  constructor(props){
  super(props);
  this.state={
    QuestionIDs:["-1","0","82","129","235","371","649","793","1139","1349","1679","2291","2573","?","14","15","16","99999999"],
    id: 1, 
    question: "Loading...",
    userAnswer: "",
    imgURL: "",
    hint: null,
    fadeIn: false
  }
}

  componentDidMount() {
    this.getQuestion(this.state.id);
    console.log(this.state.QuestionIDs[1])
  }

  toggleHint = () => {
    this.setState((prevState, props) => {
      return {fadeIn: !prevState.fadeIn}
    })
  }

  getQuestion = (id) => {
    axios({
      method: 'get',
      url: baseUrl + '/questions',
      Body: {
        questionID: this.state.QuestionIDs[id]
      }
    }).then( response => {
      this.setState({
        question: response.data.question,
        imgURL: response.data.image,
        hint: response.data.hint
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
      userAnswer: this.state.userAnswer.toLowerCase().trim(),
      questionIndex: this.state.id,
      questionID: this.state.QuestionIDs[this.state.id]
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

        <Container style={{margin: "2rem auto"}}> {/*Question Div */}
          <Card>
          {this.state.imgURL.length > 0 && 
            <CardImg top width="100%" src={this.state.imgURL} alt="Card image cap" />}
          {additionalDiv}
        <CardBody>
          <CardTitle className={additionalClass} tag="h5">Stage number - {this.state.QuestionIDs[this.state.id]}</CardTitle>
          <CardText>{this.state.question}</CardText>
          {this.state.hint && 
            <React.Fragment>
            <Button color="primary" outline size="sm" onClick={this.toggleHint}>Show Hint</Button>
          
            <Fade in={this.state.fadeIn} className="mt-3">
              {this.state.hint}
            </Fade>
            
          </React.Fragment>}
          
          
          
        </CardBody>
      </Card>

        </Container>

        <Container>
        <Form onSubmit={this.handleAnswerSubmit}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2" tag="h6">Enter your answer - </Label>
        <Input type="email" name="answer" value={this.state.value} onChange={this.handleAnswerChange} />
      </FormGroup>
      <Button color="primary" outline size="sm" type="submit">Submit</Button>
    </Form>
        </Container>

        
           {/*
          <form onSubmit={this.handleAnswerSubmit}>
          <label>
            Enter Answer:
            <input type="text" value={this.state.value} onChange={this.handleAnswerChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
          
          */}
        
      </div>

    );

    if(this.state.id === 17){           /*For a total of 16 stages + mario image*/
       toDisplay = <img src={this.state.imgURL} alt="Princess was in another castle" />
    }

    return (
      toDisplay
    );
  }
}

export default Quiz;