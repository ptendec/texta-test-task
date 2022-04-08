import React from 'react';
import classes from './Registration.module.css';
import RegForm from "../../components/RegForm/RegForm"

const Registration = () => {
  return (
    <section className={classes.registration}>
      <RegForm />
    </section>
  );
};

export default Registration;
