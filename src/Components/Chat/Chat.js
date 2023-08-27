import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./Chat.module.css";
import { getResponse, uploadImage } from "../../helper/Helper";
import PropagateLoader from "react-spinners/PropagateLoader";

const Chat = ({ amazon, setAmazon }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const textA = useRef(null);
  const chatMes = useRef(null);

  // const [hchange, setHchange] = useState({
  //   previous: 0,
  //   new: 0,
  // });

  // useEffect(() => {
  //   setHchange({
  //     ...hchange,
  //     ["previous"]: window.getComputedStyle(textA.current).height,
  //     ["new"]: window.getComputedStyle(textA.current).height,
  //   });
  // }, [textA]);

  const sendMessage = async () => {
    try {
      setLoading(true);
      let newMessage = { id: messages.length + 1, text: text, sender: "user" };
      // get first chatgpt response, which includes general description and the list of items
      setMessages([...messages, newMessage]);
      const response = await getResponse(text);
      console.log(response);
      // if there are new items
      if (response.products.length > 0) {
        // change items to n x 3 format
        const items = response.products;
        let tempQue = [];
        let count = 0;
        for (let i = 0; i < items.length / 3; i++) {
          let tempKey = [];
          for (let j = 0; j < 3; j++) {
            tempKey.push(items[count]);
            count++;
          }
          tempQue.push(tempKey);
        }
        console.log(tempQue);
        setAmazon([...amazon, tempQue]);
      }

      // get message
      let newResponse = response.message;
      newResponse = {
        id: messages.length + 2,
        text: newResponse,
        sender: "agent",
      };
      console.log("reached first");
      setMessages([...messages, ...[newMessage, newResponse]]);
      console.log("reached here");
      // textA.current.value = "";
      console.log("reached end");
      setText("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  console.log(amazon);

  const sendImage = async () => {
    try {
      uploadImage("your-container-name", image);
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    try {
      const success = await getResponse("restart history");
      if (success) {
        setAmazon([]);
        setText("");
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // textarea size change
  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight - 20}px`;
    // chatMes.current.style.height =
    //   parseInt(
    //     window
    //       .getComputedStyle(textA.current)
    //       .height.slice(
    //         0,
    //         window.getComputedStyle(textA.current).height.length - 2
    //       )
    //   ) -
    //   (hchange["new"] - hchange["previous"]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    // setHchange({
    //   ...hchange,
    //   ["previous"]: hchange["new"],
    //   ["new"]: window.getComputedStyle(textA.current).height,
    // });
    if (event.target.scrollHeight < 250) {
      adjustTextareaHeight(event.target);
    } else {
      event.target.style.overflow = "scroll";
    }
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatContainer}>
        <button className={styles.newChat} onClick={refresh}>
          New Chat
        </button>
        <div className={styles.chatMessages} ref={chatMes}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        {loading ? (
          <div className={styles.inputContainer}>
            <PropagateLoader color="#b5d8e5" />
          </div>
        ) : image ? (
          <div className={styles.inputContainer}>
            <input
              hidden
              id="imageMessage"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImage(event.currentTarget.files[0]);
              }}
            />
            <div>
              {image.name.length > 20
                ? image.name.slice(0, 20) + "..."
                : image.name}
            </div>
            <button
              onClick={() => {
                setImage();
              }}
              className={styles.deleteButton}
            >
              Delete
            </button>

            <button className={styles.sendButton} onClick={sendImage}>
              Send
            </button>
            <label htmlFor="imageMessage" className={styles.imageButton}>
              Image
            </label>
          </div>
        ) : (
          <div className={styles.inputContainer}>
            <input
              hidden
              id="imageMessage"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImage(event.currentTarget.files[0]);
              }}
            />
            <textarea
              rows={1}
              className={styles.messageInput}
              ref={textA}
              onChange={handleTextChange}
            />
            <button
              className={styles.sendButton}
              onClick={() => {
                if (text.length > 0) {
                  sendMessage();
                }
              }}
            >
              Send
            </button>
            <label htmlFor="imageMessage" className={styles.imageButton}>
              Image
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
