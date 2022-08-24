
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc ,doc,updateDoc,serverTimestamp  } from "firebase/firestore";
import { updateProfile, getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { authConstant } from "./constants";
import { async } from "@firebase/util";
export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` })
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(data => {
                console.log(data)
                const authh = getAuth();
                const name = `${user.firstName} ${user.lastName}`
                updateProfile(authh.currentUser, {
                    displayName: name
                }).then(() => {
                    const cityRef = doc(db, 'newusers', data.user.uid);
                    setDoc(cityRef, {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        uid: data.user.uid,
                        createdAt: new Date(),
                        isOnline: true,
                    }).then(() => {
                        const loggedInUser = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            uid: data.user.uid,
                            email: user.email,
                            
                        }
                        localStorage.setItem('user', JSON.stringify(loggedInUser))
                        dispatch({
                            type: `${authConstant.USER_LOGIN}_SUCCESS`,
                            payload: {
                                user: loggedInUser
                            }
                        })
                    })
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({ type: `${authConstant.USER_LOGIN}_FAIL`, payload: { error } })
            })
    }
}


export const signin = (user) => {
    return async dispatch => {
        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` })
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((data) => {
                const name = data.user.displayName.split(" ");
                console.log(name)
                const firstName = name[0];
                const lastName = name[1]
                const loggedInUser = {
                    firstName,
                    lastName,
                    uid: data.user.uid,
                    email: data.user.email,
                    createdAt:new Date()
                }
                localStorage.setItem('user', JSON.stringify(loggedInUser))
                dispatch({
                    type: `${authConstant.USER_LOGIN}_SUCCESS`,
                    payload: {
                        user: loggedInUser
                    }
                })
                console.log(data)
            }).catch((error) => {
                dispatch({
                    type: `${authConstant.USER_LOGIN}_FAIL`,
                    payload: {
                        error
                    }
                })
                console.log(error)
            })
    }
}
export const isLoggedIn = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        if (user) {
            dispatch({
                type: `${authConstant.USER_LOGIN}_SUCCESS`,
                payload: {
                    user: user
                }
            });

        } else {
            dispatch({
                type: `${authConstant.USER_LOGIN}_FAIL`,
                payload: {
                    error: 'Login again'
                }
            });

        }
    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({
            type: `${authConstant.USER_LOGOUT}_REQUEST`

        })
        const updateActiveStatus = doc(db, "newusers", uid);

        // Set the "capital" field of the city 'DC'
        await updateDoc(updateActiveStatus, {
          isOnline:false
        });
        signOut(auth)
            .then(() => {
                console.log('clear')
                localStorage.clear();
                dispatch({
                    type: `${authConstant.USER_LOGOUT}_SUCCESS`

                })
            }).catch(error => {
                dispatch({
                    type: `${authConstant.USER_LOGOUT}_FAIL`, payload: { error }

                })
                console.log(error)
            })
    }
}