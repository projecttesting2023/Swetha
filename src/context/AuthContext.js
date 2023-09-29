
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from '@env'
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState([])
   
    const login = (username, password) => {
        setIsLoading(true);
        console.log(BASE_URL)
        axios.post(`${BASE_URL}/login`, {
            username:'kminchelle',
            password: '0lelplR',
        })
            .then(res => {
                console.log(res.data)
                let userInfo = res.data;
                setUserInfo(userInfo)
                setUserToken(userInfo.token)
                AsyncStorage.setItem('userToken',userInfo.token)
                AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
            })
            .catch(e => {
                console.log(`Login error ${e}`)
            });

        setIsLoading(false);
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
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
            if(userInfo){
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