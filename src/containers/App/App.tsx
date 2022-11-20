import React, { useEffect, useState } from "react";
import MessageForm from "../../components/MessageForm/MessageForm";
import Messages from "../../components/Messages/Messages";
import { Message } from "../../types";
export const url = `http://146.185.154.90:8000/messages`;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const interval = setInterval(async () => {
      const response = await fetch(
        `${url}?datetime=${
          messages.length ? messages[messages.length - 1].datetime : ""
        }`
      );
      if (!response.ok) throw new Error(`Response failed: ${response.status}`);
      const newMessages = await response.json();

      if (!isCancelled) {
        setMessages((prev) => [...prev, ...newMessages]);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
      isCancelled = true;
    };
  }, [messages]);

  const sendMessage = async (message: string, author: string) => {
    const body = new URLSearchParams();
    body.set("message", message);
    body.set("author", author);
    const response = await fetch(url, { method: "post", body });
    if (!response.ok) throw new Error(`Response failed: ${response.status}`);
  }

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-light bg-primary text-white">
          <div className="container">
            <a href="#" className="text-decoration-none">
              <span className="navbar-brand mb-0 h1 text-white">Chat</span>
            </a>
          </div>
        </nav>
      </header>
      <main>
        <div className="container py-3">
          <div className="row">
            <MessageForm onSubmit={sendMessage} />
          </div>
          <div className="row">
            <Messages messagesList={messages} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;