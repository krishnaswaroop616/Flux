import { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import { Context } from "../context/Context";
import { PulseLoader } from "react-spinners";

import axios from 'axios';

const ChatWindow = () => {
    const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId,previousChats,setPreviousChats,setNewChat } = useContext(Context);

    const [loading, setLoading] = useState(false);


    const getReply = async (e) => {
        e.preventDefault();
        setNewChat(false);
        if(!prompt || prompt.length===0){
            alert("Enter anything to proceed")
            setLoading(false);
            return;
        }
        setLoading(true);

        const body = {
            threadId: currThreadId,
            message: prompt
        }
        try {
            const res = await axios.post(`https://flux-wbt4.onrender.com/api/chat`, body);
            setPreviousChats(prev=>[...prev,{role:"user",content:prompt},{role:"assisstant",content:res.data.reply}]);
            setReply(res.data.reply);
            setPrompt("");
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            console.log(err);

        }

    }

    return (
        <div className="bg-dark min-vh-100 w-100 text-white d-flex flex-column justify-content-between ">
            <div className=" flex-grow-1 overflow-auto px-4 py-3" style={{maxHeight:"84vh"}}>
                <Chat />
            </div>
            <div className=" p-3  bg-opacity-10 mb-2  " onSubmit={getReply}>
                <form className="d-flex flex-column" >
                    {loading && <div className=" text-center mb-2    ">
                        <PulseLoader color="white" />
                    </div>}
                    <div className="d-flex sticky-bottom  justify-content-center text-center align-items-center " >
                        <input type="text" placeholder="Ask anything" className="  rounded-pill py-3 px-4 bg-secondary bg-opacity-25 text-white  border-0" value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: "90%" }} disabled={loading} ></input>
                        <button disabled={loading} type="submit" className=" btn btn-light  rounded-circle p-3 ms-1 d-flex justify-content-center align-items-center" ><i class="fa-solid fs-6  fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
