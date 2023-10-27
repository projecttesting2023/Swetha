
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from '@env'
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState([])

    const login = (token) => {
        setIsLoading(true);
        console.log(token,'token from context')
        // console.log(BASE_URL)
        axios.get(`http://162.215.253.89/PCP2023/public/api/user/getUser`, {
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
        })
            .then(res => {
                console.log(res.data.user,'user details')
                let userInfo = res.data.user; 
                AsyncStorage.setItem('userToken', token)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                setUserInfo(userInfo)
                setUserToken(token)
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`Login error ${e}`)
            }); 
        
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
        setUserInfo([])
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }
    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo')
            let userToken = await AsyncStorage.getItem('userToken')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setUserToken(userToken)
                setUserInfo(userInfo)
            }
            setIsLoading(false)
        } catch (e) {
            console.log(`isLoggedIn error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}