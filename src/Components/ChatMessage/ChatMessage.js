import React from "react";
import styles from "./ChatMessage.module.css";

const ChatMessage = ({ message }) => {
  const { text, sender } = message;

  return (
    <div className={`${styles.message} ${styles[sender]}`}>
      <div className={styles.messageText}>{text}</div>
    </div>
  );
};

export default ChatMessage;
