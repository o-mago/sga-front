import React, { useState, useEffect, useCallback, useReducer } from 'react';
import logo from './images/logo.svg';
import './style/App.css';
import './bootstrap/css/bootstrap.min.css';
// import { useFetch } from "./FetchData";
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import { useMainFetch } from './FetchMainData';

var current_month = new Date().getMonth();

const base_url = process.env.REACT_APP_API_URL;

var firstLoad = true;

function useFetchMain(payload) {
  const url = encodeURI(base_url);
  return useMainFetch(url, 'POST', payload);
}

Array.prototype.pushArray = function (x) {
  this.push(x);
  return this;
};

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

const initialState = {
    componentName: undefined,
    site: undefined,
    group: undefined,
    status: undefined,
    month: undefined,
    year: new Date().getFullYear()
  };

const addOrRemove = (new_value, state) => {
  let new_state = state === undefined ? [] : state;
  let final_value = [...new_state];
  if (new_value === "<clear>") {
    final_value = undefined;
  } else {
    final_value = final_value.includes(new_value) ? final_value.filter(item => item !== new_value) : final_value.pushArray(new_value);
  }
  console.log("final_value", final_value);
  return final_value;
};

function reducer(state, action) {
  switch (action.type) {
    case 'site':
      let param_site = addOrRemove(action.payload, state.site);
      return {...state, site: param_site};
    case 'component':
      let param_component = addOrRemove(action.payload, state.componentName);
      return {...state, componentName: param_component};
    case 'group':
      let param_group = addOrRemove(action.payload, state.group);
      return {...state, group: param_group};
    case 'year':
      return {...state, year: action.payload};
    case 'drilldown':
      if (action.payload.status == "overdue") {
        return {...state, incorrectDueDate: 1 };
      } else {
        let status = action.payload.status ? action.payload.status : undefined;
        let month = action.payload.month ? action.payload.month : undefined;
        return {...state, status: status, month: month };
      }
    case 'reload':
      return {...state, status: undefined, month: undefined };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function App() {
  const [options, dispatch] = useReducer(reducer, initialState);
  const [data, loading] = useFetchMain(options);
  const [newKey, setNewKey] = useState(new Date());

  const handlerRequest = useCallback((props, action) => {
    setNewKey(new Date());
    dispatch({type: action, payload: props});
  });

  if ((loading) && firstLoad) {
    return (
      <div id="loader"></div>
    );
  } else {
    firstLoad = false;
    return (
      <div id="main" className="">
        <header className="header">
          <img className="logo_img" src={require('./images/sga_white_v2.png')}
            alt="SGA Logo"></img>

          <h2 className="title">SGA - Schedule Global Audit</h2>

          <div id="lastUpdateInfo">Last Update: {new Date(data.options.lastUpdate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</div>
        </header>

        <div className="main-page">
          <NavBar data={data.options} excelData={data.results} handler={handlerRequest} />
          <MainContent dataResults={data.results} drilldownData={data.drilldown} month={current_month}
            handler={handlerRequest} year={options.year} newKey={newKey} />
        </div>

        <footer>
        </footer>
      </div>
    );
  }
}

export default App;