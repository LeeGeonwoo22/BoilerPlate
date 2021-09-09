import React,{useEffect} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_action/user_action'

export default function (SpecificComponent, option, adminRoute = null ) {

    // null => 아무나 출입이 가능한 상태
    // true => 로그인한 유저만 출입이 가능한상태
    // false => 로그인한 유저는 출입이 불가능한 상태 

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth()).then(res =>{
                
                // 로그인 하지않는 상태 
                if(!res.payload.isAuth) {
                    if(option === true ) {
                        props.history.push(`/login`)
                    }
                } 
                else {
                    // 로그인 한 상태 
                    if(adminRoute && !res.payload.isAdmin) {
                        props.history.push(`/`)
                    }else {
                        if(option === false)
                            props.history.push(`/`)
                    }
                }
            })         
        },[])
    }

    return AuthenticationCheck
}
