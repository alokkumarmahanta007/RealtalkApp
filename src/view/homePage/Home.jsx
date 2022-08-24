import React, { useEffect, useState, useRef } from 'react'
import { Layout } from '../../components/layout/Layout'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getRealtimeConversation, sendMessage, userAction } from '../../actions/userAction'
import data from "@emoji-mart/data";
import { SmileTwoTone } from "@ant-design/icons";
import Picker from "@emoji-mart/react";
import avtar from '../../assets/avatar.png'
import './style.css'
const Home = () => {
    const scroll = useRef();
    const [messages, setMessage] = useState('')
    const [username, setUserName] = useState('')
    const [userUid, setUserUid] = useState('')
    const [chatStart, setChat] = useState(false)
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user.users)
    const userConversation = useSelector(state => state.user)
    const [toggle, setToggle] = useState(false);

    const getEmoji = (emojiData) => {
        console.log(emojiData);
        setMessage(messages + emojiData?.native);
    };
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(userAction(auth.uid))
            .then((unsubscribe) => {
                return unsubscribe;
            }).catch(error => {

            })
    }, [auth.uid, dispatch])
    useEffect(() => {
        // scroll?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const initChat = (user) => {
        setChat(true)
        setUserUid(user.uid)
        dispatch(getRealtimeConversation({ uid_1: auth.uid, uid_2: user.uid }))
        setUserName(user.firstName)
    }
    const submitMessage = () => {
        const msgObbj = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            messages

        }
        if (messages !== "") {
            dispatch(sendMessage(msgObbj))
        }
        setMessage('')
    }
    console.log(userConversation)
    const sortarray = userConversation && userConversation?.conversations.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    console.log(sortarray)
    const toggleEmojiContainer = () => {
        setToggle(!toggle);
    };
    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            submitMessage()
        }
    }
console.log(username)
    return (

        <Layout>
            {!auth.authenticated ? '' : <div className='home_main_wrapper'>

                <div className='left_content'>
                    {user && user?.map(data => {
                        return <>{data.firstName!==undefined?<p className={data.firstName === username ? 'user_active_status' : ''} onClick={() => initChat(data)}><img alt='avatar' src={avtar} />{data.firstName}</p>:''}</>
                    })}
                </div>
                <div className='right_content'>
                    {chatStart ? <p className='User_name'>{username}</p> : ''}
                    <div className='chat_container'>
                        {chatStart ? userConversation && userConversation?.conversations.map(data => {
                            return <p className={data.user_uid_1 === auth.uid ? 'sent_messages' : 'messagebox'} >{data.messages}</p>
                        })
                            : null}
                        <div style={{marginBottom:'70px'}} ref={scroll}></div>
                    </div>

                    {chatStart ? <div className='send_form'>
                        <input onKeyPress={onKeyPressHandler} value={messages} onChange={(e) => setMessage(e.target.value)} type='text' />
                        <div onClick={toggleEmojiContainer}>
                            <SmileTwoTone />
                        </div>
                        <button onClick={submitMessage}>send</button>
                        <div>

                            {toggle ? (
                                <div onMouseLeave={toggleEmojiContainer} className='picker_wrapper'>
                                    <Picker data={data} onEmojiSelect={getEmoji} />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div> : ''}

                </div>

            </div>}

        </Layout>

    )
}
export default Home