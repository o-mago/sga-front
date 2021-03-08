import React, { useState, useEffect, useCallback } from 'react';
import './style/Update.css';
import { useFetch } from "./FetchData";
import './components/Login'
import { Redirect } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;
const baseUrl = process.env.PUBLIC_URL;

function useFetchUpdate(year, reload) {
    const url = encodeURI(api_url + '/update/'+year);
    return useFetch(url, 'PUT', {}, reload);
}

const Update = (props) => {
    const [data, loading] = useFetchUpdate(props.match.params.year, true);
    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        // return (
        //     <div className="main-update animate">
        //         <div className="logo-loader">
        //             <img className="logo_img_update" src={require('./images/sga_blue.png')} alt="SGA Logo"></img>
        //             <div className="loader_container">
        //                 <div id="loader_update"></div>
        //             </div>
        //         </div>
        //         <div className="info_update">
        //             <p>UPDATING {props.match.params.year}...</p>
        //         </div>
        //     </div>
        // );
        return <Redirect to={baseUrl+'/'} />;
        
      } else if (loading) {
        // return (
        //     <div className="main-update">
        //         <div className="logo-loader">
        //             <img className="logo_img_update" src={require('./images/sga_blue.png')} alt="SGA Logo"></img>
        //             <div className="loader_container">
        //                 <img className="done_img animate" src={require('./images/done-24px.svg')} alt="Done"></img>
        //             </div>
        //         </div>
        //         <div className="info_update animate">
        //             <p>{props.match.params.year} UPDATED</p>
        //         </div>
        //     </div>
        //   );
        
        return (
            <div className="main-login">
                <div className="login-box animate">
                    <div className="logo">
                        <img className="logo_img_login" src={require('./images/sga_blue_v2.png')} alt="SGA Logo"></img>
                    </div>
                    <div className="loader_container">
                        <div id="loader_update"></div>
                    </div>
                    <div className="info_update animate">
                        <p>UPDATING {props.match.params.year}...</p>
                    </div>
                    <div className="update-info">
                        <span>You will be redirected when it's done</span>
                    </div>
                </div>
            </div>);
        
    } else {
        setTimeout(() => {
            setRedirect(true);
        }, 3000);
        return (
            <div className="main-login">
                <div className="login-box animate">
                    <div className="logo">
                        <img className="logo_img_login" src={require('./images/sga_blue_v2.png')} alt="SGA Logo"></img>
                    </div>
                    <div className="loader_container">
                        <img className="done_img animate" src={require('./images/done-24px.svg')} alt="Done"></img>
                    </div>
                    <div className="info_update animate">
                        <p>{props.match.params.year} UPDATED</p>
                    </div>
                    <div className="update-info">
                        <span>Redirecting to the main page...</span>
                    </div>
                </div>
            </div>);
    }

}

export default Update;