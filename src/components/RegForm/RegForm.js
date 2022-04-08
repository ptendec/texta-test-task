import React, {useState} from 'react';
import classes from "./RegForm.module.css"
import Form from "../Form/Form"
import image from '../../assests/images/img.png'
import FormSteps from "../FormSteps/FormSteps"
import SignUpStep from "../SignUpStep/SignUpStep"
import MessageStep from "../MessageStep/MessageStep"
import CheckboxStep from "../CheckboxStep/CheckboxStep"
import {db} from '../utils/firebase-config'
import {collection, getDocs, addDoc} from 'firebase/firestore'


const RegForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const usersCollectionRef = collection(db, 'users')
  const messagesCollectionRef = collection(db, 'messages')
  const checkboxesCollectionRef = collection(db, 'checkboxes')

  const eventSubmitFormHandler = async (data, step) => {
    switch (step) {
      case 0 :
        const users = (await getDocs(usersCollectionRef)).docs.map(doc => ({...doc.data(), id: doc.id}))
        const isUserExists = users.find((user) => {
          return user.email === data.email
        })
        if (isUserExists === undefined) {
          await addDoc(usersCollectionRef, {data})
        }
        break
      case 1 :
        await addDoc(messagesCollectionRef, {data})
        break
      case 2 :
        await addDoc(checkboxesCollectionRef, {data})
        break
    }
  }

  const eventChangeStepHandler = (moveForward) => {

    moveForward ? setActiveStep((prevState => prevState + 1)) : setActiveStep(prevState => prevState - 1)
  }

  const steps = [
    {
      component: <SignUpStep eventChangeStepHandler={eventChangeStepHandler}
                             eventSubmitFormHandler={eventSubmitFormHandler} activeStep={activeStep}/>,
      name: 'Sign UP'
    },
    {
      component: <MessageStep eventChangeStepHandler={eventChangeStepHandler}
                              eventSubmitFormHandler={eventSubmitFormHandler} activeStep={activeStep}/>,
      name: 'Message'
    },
    {
      component: <CheckboxStep eventChangeStepHandler={eventChangeStepHandler}
                               eventSubmitFormHandler={eventSubmitFormHandler} activeStep={activeStep}/>,
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
