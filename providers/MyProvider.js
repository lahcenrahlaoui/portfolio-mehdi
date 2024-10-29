

"use client"
import {useState} from 'react'
import {MyContext} from "@/context/heightContext"
const MyProvider = ({ children }) => {
    const [value, setValue] = useState(null);

    return (
        <MyContext.Provider value={{ value, setValue }}>
            {children}
        </MyContext.Provider>
    );
};
export   {MyProvider}