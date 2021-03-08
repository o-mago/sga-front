// import { createContext, useContext } from 'react';
// import { useFetch } from "../FetchData";

// const base_url = process.env.REACT_APP_API_URL;

// const fetchUrl = async (url, method, payload = {}, type = "json") => {
//     var myHeaders = new Headers();
//     var myInit = {
//         method: method,
//         headers: myHeaders,
//         mode: 'cors',
//         cache: 'default'
//     };
//     if (method === 'POST') {
//         myInit['headers'].set("Content-Type", "application/json");
//         myInit['body'] = JSON.stringify(payload);
//     }
//     const response = await fetch(url, myInit);
//     if (type === "json") {
//         return await response.json();
//     } else if (type === "text") {
//         return await response.text();
//     }
// }

// const useFetchOptions = async () => {
//     const url = encodeURI(base_url + '/options');
//     return await fetchUrl(url, 'GET');
// }

// export const OptionsContext = createContext(useFetchOptions());
// // function useFetchResults(payload, reload) {
// //     // console.log("fetch antes");
// //     const url = encodeURI(base_url + '/results');
// //     return useFetch(url, 'POST', payload, reload);
// // }

// // function useFetchDrilldown(payload, reload) {
// //     // console.log("olaaaaa", payload);
// //     const url = encodeURI(base_url + '/drilldown');
// //     return useFetch(url, 'POST', payload, reload);
// // }

// export function useOptions() {
//     return useContext(OptionsContext);
// }

// // export function useResults() {
// //     return useContext(DrilldownContext);
// // }

// // export function useDrilldown() {
// //     return useContext(ResultContext);
// // }

// export default OptionsContext;