import { useEffect, useState } from "react";
import MessageForm from "../../components/MessageForm/MessageForm";
import Messages from "../../components/Messages/Messages";
import { Message } from "../../types";
export const url = `http://146.185.154.90:8000/messages`;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let datetime = "";
    const interval = setInterval(async () => {
      try {
        const response = await fetch(url + "?datetime=" + datetime);
        const newMessages = await response.json();
        datetime = newMessages[newMessages.length - 1].datetime;
        setMessages((prev) => [...prev, ...newMessages]);
      } catch (error) {
        console.error(error);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = async (message: string, author: string) => {
    const body = new URLSearchParams();
    body.set("message", message);
    body.set("author", author);
    const response = await fetch(url, { method: "post", body });
    if (!response.ok) throw new Error(`Response failed: ${response.status}`);
  };

  return (
    <>
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
    </>
  );
}

export default App;