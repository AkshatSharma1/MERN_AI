import axios from 'axios'

export const loginUser = async (email: string, password: string)=>{
    const res = await axios.post("/user/login", {email, password})

    if(res.status==200){
        const data = await res.data
        return data
    }
    else{
        throw new Error("unable to login")
    }
}

export const signUpUser = async (name:string, email: string, password: string)=>{
    const res = await axios.post("/user/signup", {name, email, password})

    if(res.status==201){
        const data = await res.data
        return data
    }
    else{
        throw new Error("unable to signup")
    }
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status")
    console.log(`Result:${res}`)

    if(res.status != 200){
        throw new Error("Unable to authenticate")
    }
    
    const data = await res.data
    return data;
    
}

//send chat request 
export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", {message})

    if(res.status!==200){
        throw new Error("Unable to send chat")
    }

    const data = await res.data;
    return data
}

export const getUserChats = async () => {
    const res = await axios.get("/chat/allChats")

    if(res.status!==200){
        console.log('Error cant send data')
        throw new Error("Unable to send chat")
    }

    const data = await res.data;
    return data
}

//delete
export const deleteChats = async () => {
    const res = await axios.delete("/chat/deleteChats")

    if(res.status!==200){
        console.log('Unable to delete')
        throw new Error("Unable to delete")
    }

    const data = await res.data;
    return data
}

export const logoutUser =async () => {
    const res = await axios.get("/user/logout")

    if(res.status!==200){
        console.log('Unable to delete')
        throw new Error("Unable to delete")
    }

    const data = await res.data;
    return data
    
}