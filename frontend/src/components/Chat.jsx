import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Chat = () => {
    const { newChat, setNewChat, previousChats, setPreviousChats, reply } = useContext(Context);
    const [latestReply, setLatestReply] = useState("");

    useEffect(() => {
        if (reply === "") {
            setLatestReply("");
            return;
        }
        if (!previousChats || !previousChats.length) return;

        const message = reply.split(" ");
        let i = 0;
        const interval = setInterval(() => {
            setLatestReply(message.slice(0, i + 1).join(" "));
            i++;
            if (i >= message.length) clearInterval(interval);
        }, 40);
        setLatestReply("");

        return () => clearInterval(interval);
    }, [previousChats, reply]);

    return (
        <div className="px-2 px-md-3 py-4 mh-75 overflow-auto">
            {newChat && (
                <div className="text-center " style={{marginTop:"10rem"}}><h1 className="py-2  fw-bold text-center  text-white ">Welcome back, Coder!!</h1><p className="text-secondary fs-5">what's in your mind today?</p></div>
            )}

            {previousChats.slice(0, -1).map((chat, idx) => (
                <div key={idx} className={`d-flex mb-3 ${chat.role === "user" ? "justify-content-end" : "justify-content-start"}`}>
                    {chat.role === "user" ? (
                        <div className="bg-primary bg-opacity-50 text-white py-2 px-3 rounded-4 me-2" style={{ maxWidth: "75%" }}>
                            {chat.content}
                        </div>
                    ) : (
                        <div className="text-white bg-dark bg-opacity-50 p-3 rounded-4 ms-2" style={{ maxWidth: "85%" }}>
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {chat.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            ))}

            {previousChats.length > 0 && latestReply !== "" && (
                <div className="text-white bg-dark bg-opacity-50 p-3 rounded-4 ms-2 mb-3" style={{ maxWidth: "85%" }}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {latestReply}
                    </ReactMarkdown>
                </div>
            )}

            {previousChats.length > 0 && latestReply === "" && (
                <div className="text-white bg-dark bg-opacity-50 p-3 rounded-4 ms-2 mb-3" style={{ maxWidth: "85%" }}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {previousChats[previousChats.length - 1].content}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default Chat;
