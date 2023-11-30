import { Box, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import TypingAnimator from '../helpers/TypingAnimator'
import Footer from './Footer'


const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      sx={{
        width:"100%",
        height:"100%",
      }}
    >
      <Box
        sx={{
          display:'flex',
          width:"100%",
          flexDirection:"column",
          alignItems:"center",
          mx:"auto",
          mt: 3
        }}
      
      >
        <TypingAnimator />

      </Box>

      {/* Box for images */}
      <Box
        sx={{
          width:"100%",
          display:"flex",
          flexDirection:{md: "row", xs:"column", sm:"column"},
          gap:5,
          my: 10,
        }}
        
      >
        <img src="robot.png" alt="robot" style={{width: isBelowMd?"40%":"20%", margin:"auto"}} />
        <img className="image-inverted rotate" src="openai.png" alt="openai" style={{width: isBelowMd?"30%":"10%", margin:"auto"}} />
      </Box>

      {/* Box for */}
      {/* <Box
        sx={{
          display:"flex",
          width:"100%",
          mx:"auto",
        }}
      >
        <img src="chat.png" alt="chat" style={{
          width: isBelowMd?"60%":"40%",
          display:"flex",
          margin:"auto",
          borderRadius:20,
          marginTop:20,
          marginBottom: 20,
          boxShadow: "-5px -5px 105px #64f3d5"
        }}/>
      </Box> */}
      <Footer />
    </Box>
  )
}

export default Home