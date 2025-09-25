import { createContext, useEffect, useState } from "react";

export let tokenContext = createContext();

    export default function TokenContextProvider(props) {
    const [token, setToken] = useState(null);

    useEffect(()=>{
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
    } 
    },[])

    return (
        <tokenContext.Provider value={{ token, setToken }}>
        {props.children}
        </tokenContext.Provider>
    );
}

