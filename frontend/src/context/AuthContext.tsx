/* eslint-disable @typescript-eslint/no-unused-vars */
//If user is logged in, ive all data plus logout button
//If not logged in, show login and signup button

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signUpUser } from "../helpers/api-communication";

//Since typescript is used, declare types
type User = {
    name: string;
    email: string
}

type UserAuth = {
    isLoggedIn: boolean;
    user : User | null;
    login: (email: string, password: string)=>Promise<void>
    signup: (name: string, email: string, password: string)=>Promise<void>
    logout: ()=>Promise<void>
}


//Creating auth context
const AuthContext = createContext<UserAuth | null>(null)

//creating a provider
export const AuthProvider = ({children}:{children: ReactNode})=>{
//handling states
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //when a user lands on applicate, render a condition(state)
    //Use useEffect(triggers on refresh)
    useEffect(()=>{
        //FETCH: if the user cookies are valid, then skip login process
        //Now here verify the token
        async function checkStatus() {
            const data = await checkAuthStatus();

            //then login if available
            if(data){
                setUser({email: data.email, name: data.name})
                setIsLoggedIn(true)
            }
        }

        checkStatus();

    },[])

    const login = async(email: string, password:string)=>{
        const data = await loginUser(email, password)
        if(data){
            setUser({email: data.email, name: data.name})
            setIsLoggedIn(true);
        }
    }

    const signup = async(name: string, email: string, password: string)=>{

        const data = await signUpUser(name, email, password)
        if(data){
            setUser({email: data.email, name: data.name})
            setIsLoggedIn(true)
        }
    }

    const logout = async()=>{

        //here we have to remove token 
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        //and reload the screen
        window.location.reload();
    }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

};

//using auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth=()=>useContext(AuthContext)