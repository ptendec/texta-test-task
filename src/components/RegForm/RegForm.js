import React, {useEffect, useState} from 'react';
import classes from "./RegForm.module.css"
import Form from "../Form/Form"
import image from '../../assests/images/img.png'
import FormSteps from "../FormSteps/FormSteps"
import SignUpStep from "../SignUpStep/SignUpStep"
import MessageStep from "../MessageStep/MessageStep"
import CheckboxStep from "../CheckboxStep/CheckboxStep"
import {db} from '../utils/firebase-config'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'


const RegForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [user, setUser] = useState()
  const [message, setMessage] = useState()
  const [checkbox, setCheckbox] = useState()
  const usersCollectionRef = collection(db, 'users')
  const navigate = useNavigate()

  const eventSubmitFormHandler = async (data, step) => {
    switch (step) {
      case 0 :
        setUser(data)
        break
      case 1 :
        setMessage(data)
        break
      case 2 :
        setCheckbox(data)
        await addDoc(usersCollectionRef, {
          ...user,
          ...message,
          ...data
        }).then(response => {
          console.log(response.id)
          navigate(`/saved/${response.id}`)
        })
        break
    }
  }

  const eventChangeStepHandler = (moveForward) => {
    moveForward ? setActiveStep((prevState => prevState + 1)) : setActiveStep(prevState => prevState - 1)
  }

  const steps = [
    {
      component: <SignUpStep
        eventChangeStepHandler={eventChangeStepHandler}
        eventSubmitFormHandler={eventSubmitFormHandler}
        activeStep={activeStep}
        user={user}
      />,
      name: 'Sign UP'
    },
    {
      component: <MessageStep
        eventChangeStepHandler={eventChangeStepHandler}
        eventSubmitFormHandler={eventSubmitFormHandler}
        activeStep={activeStep}
        message={message}
      />,
      name: 'Message'
    },
    {
      component: <CheckboxStep
        eventChangeStepHandler={eventChangeStepHandler}
        eventSubmitFormHandler={eventSubmitFormHandler}
        activeStep={activeStep}
        checkbox={checkbox}
      />,
      name: 'Checkbox'
    }]


  return (
    <div className={classes.RegForm}>
      <img className={classes.mainImage} src={image} alt=""/>
      <div className={classes.rightPart}>
        <FormSteps activeStep={activeStep}/>
        <div className={classes.divideLine}/>
        <div className={classes.headerText}>
          <span>{`Step ${activeStep + 1}/3`}</span>
          <p>{steps[activeStep].name}</p>
        </div>
        <Form>
          {steps[activeStep].component}
        </Form>
      </div>
    </div>
  );
};

export default RegForm;
