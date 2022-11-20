import React from "react";
import { Message } from "../../types";
import MessageItem from "./MessageItem";

interface Props {
  messagesList: Message[];
}

const Messages: React.FC<Props> = ({ messagesList }) => {
  return (
    <div className="bg-light p-3 my-3 rounded-2">
      {messagesList.map((message) => (
        <MessageItem key={message._id} message={message} />
      ))}
    </div>
  );
};

export default Messages;