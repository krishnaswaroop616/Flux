import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Sidebar = () => {
    const { allThreads, setAllThreads, newChat, setNewChat, reply, setReply, prompt, setPrompt, currThreadId, setCurrThreadId, previousChats, setPreviousChats } = useContext(Context);
    const [collapsed, setCollapsed] = useState(false);


    const createNewChat = async () => {
        setNewChat(true);
        setReply("");
        setPrompt("");
        setCurrThreadId(uuidv4());
        setPreviousChats([]);
    }
    const getThreads = async () => {
        try {
            const threads = await axios.get("https://flux-wbt4.onrender.com/api/thread");
            const filteredData = threads.data.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchThread = async (threadId) => {
        try {
            const thread = await axios.get(`https://flux-wbt4.onrender.com/api/thread/${threadId}`);
            setCurrThreadId(threadId);
            setPreviousChats(thread.data);
            setNewChat(false);
            setReply("");
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteThread = async (threadId) => {
        try {
            const res = await axios.delete(`https://flux-wbt4.onrender.com/api/thread/${threadId}`);
            alert("Chat deleted");
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getThreads();
    }, [allThreads]);

    useEffect(() => {
        if (window.innerWidth < 992) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [window.innerWidth]);

    return (
        <div className={`bg-black  text-white d-flex flex-column justify-content-between p-3  min-vh-100 sidebar ${collapsed ? "collapsed" : "expanded"} `} >

            <div>
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom">
                    <h2 className={`${collapsed ? "d-none" : "d-block"} fw-bold ms-2 text-   `}><i>Flux</i></h2>
                    <button className="btn btn-outline-light btn-sm rounded-pill border-0 mb-1 " onClick={() => setCollapsed(!collapsed)}><i class="fa-solid fs-5 fa-bars "></i></button>
                </div>

                <div className="mb-3 d-flex align-items-center gap-2 options p-2 py-3 rounded-3" onClick={() => createNewChat()} style={{ cursor: "pointer" }}>
                    <i class="fa-solid fa-arrow-up-right-from-square fs-5 px-1 "></i>
                    <p className={`${collapsed ? "d-none" : "d-block "} m-0`}>New chat</p>
                </div>


                <div className={`${collapsed ? "d-none" : "d-block"} mt-5 p-1`} style={{ maxHeight: "61vh", overflowY: "auto" }}>
                    <h4 className="fw-semibold text-secondary mb-2  "><i class="fa-solid fa-comments"></i> Chats</h4>
                    <ul className="list-group list-group-flush p-2">
                        {allThreads.map((thread, idx) => (
                            <li key={idx} onClick={() => fetchThread(thread.threadId)} className={`${thread.threadId === currThreadId ? "bg-primary bg-opacity-75" : "bg-transparent"} list-group-item  text-white border-0 px-3 py-3   d-flex rounded-3 flex-wrap justify-content-between threads align-items-center gap-3 `} style={{ cursor: "pointer" }}>
                                <div className="flex-grow-1 " style={{maxWidth:"85%"}} >{thread.title.length<=35?thread.title:thread.title.slice(0,35)+"..."}</div><i class="fa-solid fa-trash me-2 " onClick={(e) => {
                                    e.stopPropagation();
                                    deleteThread(thread.threadId);
                                }} ></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
