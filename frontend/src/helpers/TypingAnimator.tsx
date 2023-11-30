import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypingAnimator = () => {
  return (
    <TypeAnimation 
        sequence={[
            "Chat with your OWN AI",
            1000,
            "Built with OpenAI 🤖",
            2000,
            "Personal customized GPT 💻",
            1500

        ]}
        speed={50}
        style={{fontSize:"60px", color:"white", display:"inline-block",textShadow:"1px 1px 2px #000"}}
        repeat={Infinity}
    />
  )
}

export default TypingAnimator