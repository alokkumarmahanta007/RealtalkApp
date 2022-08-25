import React from 'react'
import { userConstants } from './constants'
import { db } from '../firebase'

import { collection, query, addDoc, onSnapshot, where, orderBy, serverTimestamp } from "firebase/firestore";
import { async } from '@firebase/util';

export const userAction = (uid) => {
  console.log(uid)
  return async (dispatch) => {
    dispatch({
      type: `${userConstants.GET_REALTIME_USERS}_REQUEST`
    })
    const q = query(collection(db, "newusers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid)
          users.push(doc.data());
      });
      console.log(users);
      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: {
          users
        }
      })
    });
    return unsubscribe;
  }

}


export const sendMessage = (msgObj) => {
  return async dispatch => {

    await addDoc(collection(db, "conversation"), {
      ...msgObj,
      isView: false,
      createdAt: serverTimestamp()
    })
      .then((data) => {
        console.log(data)
        // dispatch({
        //   type:userConstants.GET_REALTIME_MESSAGES,
        //   payload:
        // })
      })
      .catch(error => {
        console.log(error)
      })

  }
}

export const getRealtimeConversation = (user) => {
  return async dispatch => {
    const q = query(collection(db, "conversation"), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversation = [];
      querySnapshot.forEach((doc) => {
        if ((doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
          || (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)) {
          conversation.push(doc.data());
        }
        if (conversation.length > 0) {
          dispatch({
            type: `${userConstants.GET_REALTIME_MESSAGES}_SUCCESS`,
            payload: {
              conversation
            }
          })
        } else {
          dispatch({
            type: `${userConstants.GET_REALTIME_MESSAGES}_FAIL`,
            payload: {
              conversation
            }
          })
        }
      });
      console.log(conversation)
    });
    return unsubscribe;

  }
}

