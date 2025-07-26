import {createContext, useState} from  "react";
import { v4 as uuidv4 } from 'uuid';

 export const Context=createContext();

 export const ContextProvider=({children})=>{

    const [prompt,setPrompt]=useState("");
    const [reply,setReply]=useState("");
    const [currThreadId,setCurrThreadId]=useState(uuidv4());
    const [previousChats,setPreviousChats]=useState([]);
    const [newChat,setNewChat]=useState(true);
    const [allThreads,setAllThreads]=useState([]);

    const values={
        prompt,setPrompt,reply,setReply,currThreadId,setCurrThreadId,newChat,setNewChat,previousChats,setPreviousChats,allThreads,setAllThreads
    }

    return <Context.Provider value={values}>
        {children}
    </Context.Provider>
}

