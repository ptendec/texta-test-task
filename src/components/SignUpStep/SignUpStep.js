import React, {useState} from 'react';
import classes from './SignUpStep.module.css'
import errorIco from '../../assests/images/warning.png'
import {emailValidate} from "../utils/validate"
import InputMask from 'react-input-mask';

const SignUpStep = ({eventChangeStepHandler, eventSubmitFormHandler, activeStep, user}) => {
  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [address, setAddress] = useState(user?.address ?? '')
  const [isEmailInCorrect, setIsEmailInCorrect] = useState(null)
  const [emailError, setEmailError] = useState('Email can\'t be empty')
  const [isDateOfBirthInCorrect, setIsDateOfBirthInCorrect] = useState(null)
  const [dateOfBirthError, setDateOfBirthError] = useState('Incorrect birth day')

  const eventGoNextStepHandler = async (event) => {
    event.preventDefault();
    if (!emailValidate(email)) {
      setIsEmailInCorrect(!emailValidate(event.target.value))
      setEmailError("Incorrect email")
      return false
    }
    if (new Date(dateOfBirth) == 'Invalid Date') {
      setIsDateOfBirthInCorrect(true)
      setDateOfBirthError("Incorrect date of birth")
      return false
    }

    const signUpData = {
      firstName,
      lastName,
      dateOfBirth,
      email,
      address
    }
    eventSubmitFormHandler(signUpData, activeStep)
    eventChangeStepHandler(true)
  }

  const eventInputChangeHandler = (event) => {
    switch (event.target.name) {
      case 'firstName' :
        setFirstName(event.target.value)
        break
      case 'lastName' :
        setLastName(event.target.value)
        break
      case 'dateOfBirth' :
        setDateOfBirth(event.target.value)
        break
      case 'email' :
        setEmail(event.target.value)
        break
      case 'address' :
        setAddress(event.target.value)
        break
    }
  }

  const eventBlurHandler = (event) => {
    switch (event.target.name) {
      case 'email' :
        setIsEmailInCorrect(!emailValidate(event.target.value))
        setEmailError("Incorrect email")
        break
      case 'dateOfBirth' :
        const isDateValid = new Date(event.target.value)
        if (String(isDateValid) === 'Invalid Date') {
          setIsDateOfBirthInCorrect(true)
          setDateOfBirthError("Incorrect date of birth")
        } else {
          setIsDateOfBirthInCorrect(false)
        }
        break

    }
  }


  return (
    <div className={classes.signUpStep}>
      <div className={classes.inputWrapper}>
        <div>
          <label htmlFor="firstName">
            First Name
          </label>
          <input type="text" placeholder="First Name" value={firstName} id="firstName" name="firstName"
                 onChange={event => eventInputChangeHandler(event)}/>
          <span className={classes.errorMessage}>{emailError}</span>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name
          </label>
          <input type="text" placeholder="Last Name" value={lastName} id="lastName" name="lastName"
                 onChange={event => eventInputChangeHandler(event)}/>
        </div>
      </div>
      <div className={classes.inputWrapper}>
        <div>
          <label style={isDateOfBirthInCorrect ? {color: 'red'} : {}} htmlFor="dateOfBirth">
            Date of birth
          </label>
          <InputMask style={isDateOfBirthInCorrect ? {borderColor: 'red'} : {}}
                     onBlur={event => eventBlurHandler(event)}
                     placeholder="12 / 01 / 2003" value={dateOfBirth} id="dateOfBirth" name="dateOfBirth"
                     mask="99 / 99 / 9999"
                     onChange={event => eventInputChangeHandler(event)}/>
          {isDateOfBirthInCorrect ?
            <>
              <img className={classes.errorIco} src={errorIco} alt=""/>
            </>
            :
            ''
          }
          <span style={isDateOfBirthInCorrect ? {visibility: 'visible'} : {}}
                className={classes.errorMessage}>{dateOfBirthError}</span>
        </div>
        <div>
          <label style={isEmailInCorrect ? {color: 'red'} : {}} htmlFor="email">
            Email Address
          </label>
          <input style={isEmailInCorrect ? {borderColor: 'red'} : {}} onBlur={event => eventBlurHandler(event)}
                 onChange={(event => eventInputChangeHandler(event))}
                 type="text" placeholder="Email Address" value={email} id="email" name="email"
          />
          {isEmailInCorrect ?
            <>
              <img className={classes.errorIco} src={errorIco} alt=""/>
            </>
            :
            ''
          }
          <span style={isEmailInCorrect ? {visibility: 'visible'} : {}}
                className={classes.errorMessage}>{emailError}</span>
        </div>
      </div>
      <div>
        <label htmlFor="address">
          Address
        </label><br/>
        <input className={classes.addressInput} type="text" value={address} id="address" name="address"
               placeholder="27 Bow Ridge St. Old Bridge, NJ 08857"
               onChange={event => eventInputChangeHandler(event)}/>
      </div>
      <div className={classes.divideLine}/>
      <div className={classes.actionArea}>
        <button onClick={(event) => {
          eventGoNextStepHandler(event)
        }} className={classes.nextStepBtn}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default SignUpStep;
