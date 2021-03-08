import React, { useState, useEffect, useCallback } from 'react';
import '../style/Login.css';
import { useAuth } from "../context/Auth";
import { Redirect } from "react-router-dom";

const base_url = process.env.REACT_APP_API_URL;

const Login = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    // const [info_state, setInfoState] = useState("hidden");
    const { setAuthTokens } = useAuth();
    // const referer = props.location.state.referer || '/';

    const postLogin = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.set("Content-Type", "application/json");
        myHeaders.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
        var myInit = {
            method: "POST",
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        fetch(base_url + '/login', myInit).then(result => {
            if (result.status === 200) {
                result.json().then((data) => {
                    // console.log(data);
                    setAuthTokens(result.body);
                    setLoggedIn(true);
                })
            } else {
                result.json().then((data) => {
                    setInfoMessage(data.message);
                    setIsError(true);
                })
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        // return <Redirect to={referer} />;
        return <Redirect to={props.referer} />;
    }

    return (
        <div className="main-login">
            <form onSubmit={postLogin} className="login-box animate">
                <div className="logo">
                    <img className="logo_img_login" src={require('../images/sga_blue_v2.png')} alt="SGA Logo"></img>
                </div>

                <div className="login-input">
                    <div class="login-group">
                        <input type="username" value={username} onChange={e => {setUsername(e.target.value); if(isError) setIsError(false);}} required />
                        <span class="login-highlight"></span>
                        <span class="login-bar"></span>
                        <label>Username</label>
                    </div>
                    <div class="login-group">
                        <input type="password" value={password} onChange={e => {setPassword(e.target.value); if(isError) setIsError(false);}} required />
                        <span class="login-highlight"></span>
                        <span class="login-bar"></span>
                        <label>Password</label>
                    </div>
                </div>
                <div className="login-button">
                    <input className="btn login-btn-primary btn-primary btn-md"
                        key={props.keyName} id={props.id} type="submit" value="LOGIN"></input>
                </div>
                <div className={"login-info "+ (isError ? "" : "hidden")}>
                    <span>{infoMessage}</span>
                </div>
            </form>
        </div>
    );
}

export default Login;