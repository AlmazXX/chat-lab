import React, { useState } from "react";
import { MessageMutation } from "../../types";

interface Props {
  onSubmit: (message: string, author: string) => void;
}

const MessageForm: React.FC<Props> = ({ onSubmit }) => {
  const [message, setMessage] = useState<MessageMutation>({
    message: "",
    author: "",
  });
  const [hasAuthor, setHasAuthor] = useState(false);

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message.message, message.author);
    setMessage((prev) => ({ ...prev, message: "" }));
    setHasAuthor(true);
  };

  const authorSet = hasAuthor ? null : (
    <div className="mb-3 d-flex flex-column">
      <label htmlFor="author">Your email</label>
      <input
        type="email"
        id="author"
        className="form-control"
        value={message.author}
        name="author"
        onChange={onFormChange}
      />
    </div>
  );
  return (
    <form className="col-md-6" onSubmit={onFormSubmit}>
      {authorSet}
      <div className="mb-3 d-flex flex-column">
        <label htmlFor="message" className="form-label">
          Your message
        </label>
        <textarea
          name="message"
          id="message"
          className="form-control"
          value={message.message}
          cols={30}
          rows={5}
          onChange={onFormChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
};

export default MessageForm;