import { TextField } from '@mui/material'
import React from 'react'

type Props={
    name: string,
    type: string,
    label: string
}

const CustomizedInput = (props: Props) => {
  return (
    <TextField
        margin="normal"
        name={props.name}
        label={props.label}
        type={props.type}
        InputLabelProps={{style: {color:"white", textTransform:"capitalize"}}}
        InputProps={{style:{width:"400px", borderRadius: 10, fontSize: 20, color: 'white'}}}
    >
    </TextField>
  )
}

export default CustomizedInput