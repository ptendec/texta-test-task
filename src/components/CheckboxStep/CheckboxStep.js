import React, {useState} from 'react';
import classes from './CheckboxStep.module.css'
import manChoice from '../../assests/images/customerserviceman_100588.svg'
import womanChoice from '../../assests/images/customerservicewoman_100622.svg'

const CheckboxStep = ({eventChangeStepHandler, eventSubmitFormHandler, activeStep}) => {
  const [gender, setGender] = useState('man')
  const [firstChoice, setFirstChoice] = useState(false)
  const [secondChoice, setSecondChoice] = useState(false)

  const eventGoNextStepHandler = async (event) => {
    event.preventDefault();
    const messageData = {
      gender,
      firstChoice,
      secondChoice
    }
    eventSubmitFormHandler(messageData, activeStep)
  }
  return (
    <div className={classes.checkboxStep}>
      <div className={classes.genderChoiceStuf}>
        <button style={gender === 'woman' ? {borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)'} : {}} onClick={event => {
          event.preventDefault()
          setGender('woman')
        }}>
          <img src={womanChoice} alt=""/>
        </button>
        <button style={gender === 'man' ? {borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)'} : {}} onClick={event => {
          event.preventDefault()
          setGender('man')
        }}>
          <img src={manChoice} alt=""/>
        </button>
      </div>
      <div className={classes.checkbox}>
        <input checked={firstChoice} type="checkbox" id="option1"
               onChange={() => setFirstChoice(!firstChoice)}/>
        <label htmlFor="option1">I want to add this option</label><br/>
        <input checked={secondChoice} type="checkbox" id="option2"
               onChange={() => setSecondChoice(!secondChoice)}/>
        <label htmlFor="option2">Let me click on this checkbox and choose some cool stuf</label>
      </div>
      <div className={classes.divideLine}/>
      <div className={classes.actionArea}>
        <button onClick={(event) => {
          event.preventDefault();
          eventChangeStepHandler(false)
        }} className={classes.backBtn}>Back
        </button>
        <button onClick={(event) => {
          eventGoNextStepHandler(event)
        }} className={classes.submitBtn}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CheckboxStep;
