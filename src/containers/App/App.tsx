import React, { useState } from 'react';
import MessageForm from '../../components/MessageForm/MessageForm';
import { Message } from '../../types';
export const url = `http://146.185.154.90:8000/messages`;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-light bg-primary text-white">
          <div className="container"><a href="#" className="text-decoration-none"><span className="navbar-brand mb-0 h1 text-white">Chat</span></a></div>
        </nav>
      </header>
      <main>
        <div className="container py-3">
          <div className="row">
            Messages
          </div>
          <div className="row"><MessageForm/></div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;