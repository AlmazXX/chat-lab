import { FC } from "react";
import { Message } from "../../types";

interface Props {
  message: Message;
}

const MessageItem: FC<Props> = ({ message }) => {
  return (
    <div className="row-1 my-2">
      <div className="bg-primary text-white d-inline-block px-4 py-3 rounded-2">
        <p className="m-0 text-break">{message.author}</p>
        <p className="m-0 text-break">{message.message}</p>
        <span className="d-block text-end small">{message.datetime}</span>
      </div>
    </div>
  );
};

export default MessageItem;