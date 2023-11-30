/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem'
import { IoMdSend } from 'react-icons/io'
import { deleteChats, getUserChats, sendChatRequest } from '../helpers/api-communication'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type Message = {
  role: "user"|"assistant",
  content: string
}

const chatMessages = [
  { role: 'user', content: 'Hello, how are you?' },

  { role: 'assistant', content: "Hi there! I'm doing well, thank you. How can I help you today?" },

  { role: 'user', content: 'I have a question about programming.' },

  { role: 'assistant', content: "Sure, I'd be happy to help. What do you need assistance with?" },
]




const Chat = () => {

  const auth = useAuth();

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null)

  //initially all chats will be there and then when a new chat is made, it will be appended to the chats array
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const handleSubmit = async()=>{
    console.log(inputRef.current?.value)
    const content = inputRef.current?.value as string

    if(inputRef && inputRef.current){
      inputRef.current.value = ""
    }

    const newMessage: Message = {role:"user", content}
    setChatMessages((prevChats)=>[...prevChats, newMessage])

    //Sending api req to backend with new message
    //Replacing the full chat array with new array

    const chatData = await sendChatRequest(content)
    setChatMessages([...chatData.chats]);
  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting", {id: 'deletechats'})
      await deleteChats();
      setChatMessages([]);
      toast.success("Successfully deleted the chats", {id: 'deletechats'})
    } catch (error) {
      toast.error("Error deleting chats",{id: 'deletechats'})
    }
  }

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading Chats", {id:"loadingchats"})
      //get the data and load into the chatMessages array
      getUserChats().then((data)=>{
        setChatMessages([...data.chats])
        toast.success("Successfully loaded chats",{id:'loadingchats'})
      }).
      catch(error =>{
        console.log(error)
        toast.error("Loading failed", {id:"loadingchats"})
      })

    }
  }, [auth])

  //if not logged in and tried accessing goToChats page
  useEffect(() => {
    if(!auth?.user){
      return navigate("/login")
    }
  }, [auth])
  

  return (
    <Box
      sx={{
        display: ' flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: 'flex', sm: 'none', xs: 'none' },
          flex: 0.2, flexDirection: 'column'
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', height: '70vh', bgcolor: 'rgb(17,29,39)', borderRadius: 5, flexDirection: 'column', mx: 3 }}>
          <Avatar sx={{ mx: 'auto', my: 2, bgcolor: 'white', color: 'black', fontWeight: 700 }}>
            {/* Show first letter of fname and lname */
              auth?.user?.name[0]
            }
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography
            sx={{ mx: 'auto', fontFamily: 'work sans', px: 2 }}
          >
            Hey, Buddy! Ping me for any query.
          </Typography>
          <Typography
            sx={{ mx: 'auto', fontFamily: 'work sans', my: 1, px: 2, py: 2 }}
          >
            Ask anything whatever's bothering you. <b>Note:</b> Avoid aksing personal questions (I am not a professional therapist)
          </Typography>
          <Button
            sx={{
              width: '200px', mx: 'auto', my: 'auto', fontWeight: '700', color: 'white', bgcolor: 'rgb(235, 16, 16)',
              ":hover": {
                bgcolor: 'rgb(229, 69, 69)'
              }
            }}
            onClick={handleDeleteChats}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      {/* This section for individual chats */}
      <Box sx={{ display: 'flex', flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 2 }}>
        <Typography sx={{ textAlign: 'center', fontSize: '40px', color: 'white', mx: 'auto', fontWeight: 400 }}>
          Query Pool
        </Typography>

        {/* Rendering actual chats */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '60vh',
            mx: 'auto',
            borderRadius: '15px',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth'
          }}>

          {/* Render all chats. We will have diff component for each chat item */}
          {chatMessages.map((chat, index) =>
            <ChatItem role={chat.role} content={chat.content} key={index} />

          )}

        </Box>
        {/* Input box to type message */}
        <div style={{ width: "auto", padding: "20px", borderRadius: 8, backgroundColor: 'rgb(17,27,39)', display: 'flex'}}>

          {/* We have made a "ref" to use inout text fromt he user. Once user clicks on send button send the input data to the backend   */}
          <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "10px", border: 'none', color: 'white', fontSize: '20px' }} />

          <IconButton sx={{ml:"auto", color:'white'}}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>

        </div>

      </Box>
    </Box>
  )
}

export default Chat