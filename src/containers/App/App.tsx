import React, { useEffect, useState } from "react";
import MessageForm from "../../components/MessageForm/MessageForm";
import { Message } from "../../types";
export const url = `http://146.185.154.90:8000/messages`;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const interval = setInterval(async () => {
      const response = await fetch(
        messages.length
          ? `${url}?datetime=${messages[messages.length - 1].datetime}`
          : url
      );
      if (!response.ok) throw new Error(`Response failed: ${response.status}`);
      const newMessages = await response.json();

      if (!isCancelled) {
        setMessages((prev) => [...prev, ...newMessages]);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      isCancelled = true;
    };
  }, []);

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
            <MessageForm />
          </div>
          <div className="row">Messages</div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;