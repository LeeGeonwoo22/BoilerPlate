import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action';
import { withRouter} from 'react-router-dom'
import styled from 'style-component'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        
        let body = {
            email : Email,
            password : Password
        }
        dispatch(loginUser(body))
        .then(response =>{
            if(response.payload.loginSuccess) {
                props.history.push(`/`)
            }else {
                alert('Error')
            }
        })
        
        
    }

const LoginPage = styled.div`
    display : 'flex';
    justify-content: 'center';
    align-items : 'center';
    width : '100%' ;
    height : '100vh';
    .form {
        display : 'flex';
        flex-direction : 'column';
    }
`;
    return (
        <LoginPage>
            <form onSubmit={onSubmitHandler}>
                <label>E-mail</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type ="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    login
                </button>
            </form>
        </LoginPage>        
    )
}

export default withRouter(LoginPage)
