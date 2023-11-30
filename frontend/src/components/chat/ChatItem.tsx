import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Prism } from 'react-syntax-highlighter'
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism'

//Function to detect codeblock from ai generator(here it starts with ``` )
const extractCode = (message: string) => {
    if (message.includes("```")) {
        //then split
        const codeBlocks = message.split("```")
        return codeBlocks;
    }
}

//Verify if the block is a code block or not
const isCodeBlock = (str: string) => {
    if (str.includes("=") || str.includes(";") || str.includes("#") || str.includes("//") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}")) {
        return true
    }
    return false
}

const ChatItem = ({ role, content }: { role: string, content: string }) => {

    const auth = useAuth();
    const messageBlocks = extractCode(content);

    return (
        role === "assistant" ? (
            <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>

                {/* Meesga format is: Avatar -> then message */}
                <Avatar sx={{ ml: 0 }}>
                    <img src="openai.png" alt="openai" width={'30px'} />
                </Avatar>
                <Box>
                    {/* <Typography fontSize={'20px'}>
                    {content}
                </Typography> */}
                    {!messageBlocks && <Typography fontSize={'20px'}>
                        {content}
                    </Typography>}

                    {/* If codeblock then render syntax highlighter prism else not */}
                    {messageBlocks && messageBlocks.length && messageBlocks.map((block) => isCodeBlock(block) ? (<Prism style={coldarkCold} language='javascript'>{block}</Prism>) : (<Typography fontSize={'20px'}>
                        {content}
                    </Typography>))}

                </Box>
            </Box>
        )
            :
            (
                <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d56", my: 1, gap: 2 }}>

                    {/* Meesga format is: Avatar -> then message */}
                    <Avatar sx={{ ml: 0, bgcolor: 'black', color: "white" }}>
                        {auth?.user?.name[0] + `${auth?.user?.name.split(" ")[1][0]}`}
                    </Avatar>
                    <Box>
                        {/* <Typography fontSize={'20px'}>
                    {content}
                </Typography> */}
                        {!messageBlocks && <Typography fontSize={'20px'}>
                            {content}
                        </Typography>}

                        {/* If codeblock then render syntax highlighter prism else not */}
                        {messageBlocks && messageBlocks.length && messageBlocks.map((block) => isCodeBlock(block) ? (<Prism style={coldarkCold} language='javascript'>{block}</Prism>) : (<Typography fontSize={'20px'}>
                            {content}
                        </Typography>))}

                    </Box>
                </Box>

            )
    )
}

export default ChatItem