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
  this.state = {
      id: 0, 
      question: "Loading...",
      userAnswer: "",
      imgURL: null,
      hint: null,
      fadeIn: false,
      encryptArray: ["-1","0","82","129","235","371","649","793","1139","1349","1679","2291","2573","?","14","15","16","99999999"]
    }
  }

  componentDidMount() {
    this.getQuestion();
  }

  toggleHint = () => {
    this.setState((prevState, props) => {
      return {fadeIn: !prevState.fadeIn}
    })
  }

  getQuestion = async() => {
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    await axios({
      method: 'get',
      url: baseUrl + '/questions',
      headers: {
        Authorization: `Bearer ${value}`
      }
    }).then( response => {
      console.log(response);
      this.setState({
        question: response.data.question.question,
        imgURL: response.data.question.image,
        hint: response.data.question.hint,
        id: response.data.questionIndex.questionIndex
      });
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
    event.preventDefault();
    const cookies = document.cookie.split('; ');
    const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
    console.log(this.state.userAnswer.toLowerCase().trim());
    axios({
      url: baseUrl + '/questions',
      method: 'post',
      headers: {
        Authorization: `Bearer ${value}`
      },
      data: {
        userAnswer: this.state.userAnswer.toLowerCase().trim()
      }
    }).then(response => {
       console.log(response);
       if(response.data.status.correct === false){
         alert("Wrong answer, try again");
       }else{
        alert("Right answer.");
        this.setState((prevState, props) => {
          const updatedState = {
            userAnswer: "",
            question: "Loading..."  ,
            fadeIn: false
          };
          return updatedState;
        });
        this.getQuestion();
      }
    })
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
          {this.state.imgURL !== null && 
            <CardImg top width="100%" src={this.state.imgURL} alt="Card image cap" />}
          {additionalDiv}
        <CardBody>
          <CardTitle tag="h5">Stage number - {this.state.encryptArray[this.state.id]}</CardTitle>
          <CardText className={additionalClass}>{this.state.question}</CardText>
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
        <Input type="text" autoComplete = "off" name="answer" value={this.state.userAnswer} onChange={this.handleAnswerChange} />
      </FormGroup>
      <Button color="primary" outline size="sm" type="submit">Submit</Button>
    </Form>
        </Container>

        
      </div>

    );

    if(this.state.id === 17){           /*For a total of 16 stages + mario image*/
       toDisplay = <img src="https://www.coachingforgeeks.com/wp-content/uploads/2018/06/34074321_10161183145705377_7560210874204422144_n.jpg" alt="Princess was in another castle" />
    }

    return (
      toDisplay
    );
  }
}

export default Quiz;