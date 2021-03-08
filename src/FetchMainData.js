import { useState, useEffect } from "react";

function useMainFetch(url, method, payload = {}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            // console.log("FETCHING: ", payload);
            setLoading(true);
            var myHeaders = new Headers();
            var myInit = {
                method: method,
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            };
            myInit['headers'].set("Content-Type", "application/json");
            myInit['body'] = JSON.stringify(payload);
            
            var optionHeader = new Headers();
            var optionsInit= {
                method: method,
                headers: optionHeader,
                mode: 'cors',
                cache: 'default'
            };
            optionsInit['headers'].set("Content-Type", "application/json");
            optionsInit['body'] = JSON.stringify({year: payload.year});
            // const response = await fetch(url, myInit);
            let resp = await Promise.all([fetch(url+"/results", myInit), fetch(url+"/drilldown", myInit), fetch(url+"/options", optionsInit)])
            let final_resp = {
                results: await resp[0].json(),
                drilldown: await resp[1].json(),
                options: await resp[2].json()
            }
            // console.log(final_resp);
            setData(final_resp);
            setLoading(false);
        }
        fetchUrl();
    }, [url, payload]);

    return [data, loading];
}

export { useMainFetch };