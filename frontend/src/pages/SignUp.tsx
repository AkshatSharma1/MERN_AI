import { Box, Button, Typography } from '@mui/material'
import React,{ useEffect } from 'react'
import CustomizedInput from '../components/shared/CustomizedInput'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate();
  const auth = useAuth();

  //Handling form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    //first prevent default like on refresh and all
    e.preventDefault()

    //get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    try {
      toast.loading("Signing Up",{id: "signup"})
      await auth?.signup(name, email, password)
      toast.success('Signed Up Successfully', {id: "signup"})
    } catch (error) {
      console.log(error)
      toast.error("Signing Up Failed", {id:"signup"})
    }

  }

  //Now if the user is already logged in, then redirect to chat page
  useEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      return navigate("/chat")
    }
  
  }, [auth, navigate])
  


  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
      {/* Box for Image and form. Both in flex. Flex = 1 means all items of same length*/}
      <Box 
        padding={8} /*In MUI 1-> 8 px padding, here 8 means 8*8 = 64px padding */
        mt={8} 
        display={{md:"flex", sm:"none", xs:"none"}}
      >
        <img src="aibot.png" alt="Robot" style={{width: "400px"}} />
      </Box>
      <Box
        display={'flex'} flex={{xs: 1, md: 0.5}}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={'auto'}
        mt={16}
      >
        <form 
          onSubmit={handleSubmit}
          style={{
            margin:"auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: 'none'
          }}>
            <Box
             sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
             }}
            >
              <Typography 
                variant='h4' 
                textAlign={'center'} 
                padding={2} 
                fontWeight={600}
              >
                SignUp
              </Typography>
              <CustomizedInput type='text' name='name' label='name' />
              <CustomizedInput type="email" name='email' label='email'/>
              <CustomizedInput type='password' name='password' label='password'/>
              <Button 
                type='submit' 
                sx={{
                  px:2, 
                  py:1, 
                  mt:2, 
                  width:'400px', 
                  color:'black',
                  fontWeight: 800,
                  borderRight: 2, 
                  bgcolor:'#00fffc',
                  ":hover":{
                    bgcolor: "white",
                    color:"black"
                  }
                }}>
                  signup
                </Button>
            </Box>

        </form>
      </Box>
    </Box>
  )
}

export default SignUp