import React, {useEffect, useState} from 'react';
import {collection, getDocs, addDoc} from 'firebase/firestore'
import {db} from '../utils/firebase-config'
import {useParams} from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"

const SavedData = () => {
  const {id} = useParams()
  const userCollectionRef = doc(db, "users", id);
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      await getDoc(userCollectionRef).then((response) => {
        const data = response.data()
        console.log(data)
        setUser(data)
      })
    }
    getUser()
  }, [])

  return (
    <div>
      {user.firstName}
      <br/>
      {user.lastName}
      <br/>
      {user.address}
      <br/>
      {user.email}
      <br/>
      {user.choice}
      <br/>
      {user.message}
      <br/>
      {user.firstChoice ? "True" : "False"}
      <br/>
      {user.secondChoice ? "True" : "False"}
      <br/>
      {user.gender}
      <br/>
    </div>
  );
};

export default SavedData;
