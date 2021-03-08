import { useState, useEffect } from "react";

function useFetch(url, method, payload={}, reload, type="json") {
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
      if(method === 'POST') {
        myInit['headers'].set("Content-Type", "application/json");
        myInit['body'] = JSON.stringify(payload);
      }
      const response = await fetch(url, myInit);
      let resp;
      if (type === "json") {
        resp = await response.json();
      } else if (type === "text") {
        resp = await response.text();
      }
      // console.log("jsonResponse", json);
      setData(resp);
      setLoading(false);
    }
    fetchUrl();
  }, [url, reload]);

  return [data, loading];
}

export { useFetch };