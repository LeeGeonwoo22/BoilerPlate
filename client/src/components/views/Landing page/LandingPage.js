import React,{useEffect} from 'react'
import axios from 'axios';
import { withRouter} from 'react-router-dom'
import styled from "styled-components";

function LandingPage() {
    useEffect(() => {
        axios.get(`/api/hello`)
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = (props) =>{
        axios.get(`/api/users/logout`)
        .then(response =>{
            console.log(response.data)
            if(response.data.success) {
                props.history.push(`/login`)
            }else {
                alert("로그아웃 하는데 실패했습니다.")
            }
        })
    }
    
    const Landing = styled.div`
        display : flex;
        justify-content : center;
        align-items : center;
        width : 100%;
        height : 100vh;
    `;

    return (
    
        <Landing>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </Landing>
            
        
    )
}

export default withRouter(LandingPage)
