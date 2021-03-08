import React, { useState, useEffect, useCallback } from 'react';
import logo from './images/logo.svg';
import './bootstrap/css/bootstrap.min.css';
import { useFetch } from "./FetchData";
import { tsPropertySignature } from '../node_modules/@babel/types';

const base_url = process.env.REACT_APP_API_URL;

function useFetchDoc(reload) {
    const url = encodeURI(base_url + '/doc');
    return useFetch(url, 'GET', {}, reload, "text");
}

const Documentation = (props) => {
    const [data, loading] = useFetchDoc(true);

    if (loading) {
        return (
            <div className="main-update animate">
                <div className="logo-loader">
                    <img className="logo_img_update" src={require('./images/sga_blue_v2.png')} alt="SGA Logo"></img>
                    <div className="loader_container">
                        <div id="loader_update"></div>
                    </div>
                </div>
            </div>
        );
      } else {
        return (
        <iframe className="doc" srcDoc={data}>
        </iframe>
        );
    }

}

export default Documentation;