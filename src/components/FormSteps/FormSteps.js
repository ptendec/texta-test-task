import React from 'react';
import classes from "./FormSteps.module.css"
import checkMarkIco from '../../assests/images/check.png'

const steps = [
  'Sign Up',
  'Message',
  'Checkbox'
];

const FormSteps = ({activeStep}) => {
  return (
    <div className={classes.formSteps}>
      {steps.map((step, index) => (
        <div className={classes.formStep} key={index}>
          <span style={index === activeStep ? {backgroundColor: '#0c75ff', color: '#fff'} : {}}>{activeStep > index ?
            <img src={checkMarkIco} alt=""/>
            :
            index + 1
          }</span>
          <p style={index === activeStep ? {color: '#02044a'} : {}}>{step}</p>
        </div>
      ))}
    </div>
  );
};

export default FormSteps;
