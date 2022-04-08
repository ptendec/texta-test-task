import React, {useState} from 'react';
import classes from './MessageStep.module.css'
import errorIco from "../../assests/images/warning.png"

const MessageStep = ({eventChangeStepHandler, eventSubmitFormHandler, activeStep}) => {
  const [message, setMessage] = useState('')
  const [choice, setChoice] = useState(1)
  const eventGoNextStepHandler = async (event) => {
    event.preventDefault();
    const messageData = {
      message,
      choice
    }
    eventSubmitFormHandler(messageData, activeStep)
    eventChangeStepHandler(true)
  }

  return (
    <div className={classes.messageStep}>
      <div>
        <label htmlFor="message">
          Message
        </label>
        <textarea placeholder="Lorem ipsum dolor sit amet" id="message" onChange={event => setMessage(event.target.value)}/>
        <img className={classes.errorIco} src={errorIco} alt=""/>
        <span className={classes.errorMessage}>Error message</span>
      </div>
      <div className={classes.choice}>
        <div>
          <input type="radio" name="choice" id="firstChoice" defaultChecked={true} value={1} onClick={event => setChoice(event.target.value)}/>
          <label htmlFor="firstChoice">
            The number one choice
          </label>
        </div>
        <div>
          <input type="radio" name="choice" id="secondChoice" value={2} onClick={event => setChoice(event.target.value)}/>
          <label htmlFor="secondChoice">
            The number second choice
          </label>
        </div>
      </div>
      <div className={classes.divideLine} />
      <div className={classes.actionArea}>
        <button
          onClick={(event) => {
            event.preventDefault();
            eventChangeStepHandler(false)}}
          className={classes.backBtn}>Back</button>
        <button onClick={(event) => {
          eventGoNextStepHandler(event)}} className={classes.nextStepBtn}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default MessageStep;
