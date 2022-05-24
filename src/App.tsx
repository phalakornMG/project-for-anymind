import "./App.scss";
import useChat from "./hooks/useChat";
import { useEffect, useState } from "react";
import CardMessage from "./components/CardMessage";
import { PostMessageType } from "./types/postMessageType";
import { useQuery } from "@apollo/client";
import { LOAD_MOREMESSAGE } from "./graphQL/queries";

const App = () => {
  const [user, setUser] = useState("Joyse");
  const [channelId, setChannelId] = useState("1");
  const [channel, setChannel] = useState("General Channel");
  const [message, setMessage] = useState("");
  const {
    addMessage,
    LastMessage,
    GetMoremessage,
    actionAddMoreData,
    dataQuery,
    errorSubmit,
    messageId,
    old,
  } = useChat();
  const { loading, data } = useQuery(LOAD_MOREMESSAGE, {
    variables: {
      channelId: channelId,
      messageId: messageId,
      old: old,
    },
  });
  useEffect(() => {
    actionAddMoreData(data);
  }, [messageId, loading]);

  useEffect(() => {
    let messageDraft = localStorage.getItem("messageDraft");
    if (messageDraft) {
      setMessage(messageDraft);
    }
    LastMessage(channelId);
  }, [LastMessage, channelId]);

  const onChangeUser = (e: any) => {
    setUser(e.target.value);
  };
  const onChangeChannelId = (channelId: string) => {
    setChannelId(channelId);
    if (channelId === "1") {
      setChannel("General Channel");
    } else if (channelId === "2") {
      setChannel("Technology Channel");
    } else if (channelId === "3") {
      setChannel("LGTM Channel");
    }
  };
  const onSubmit = () => {
    addMessage({
      channelId: channelId,
      text: message,
      userId: user,
    } as PostMessageType);
    localStorage.setItem("messageDraft", "");
    setMessage("");
  };
  const onChangemessage = (e: any) => {
    setMessage(e.target.value);
    localStorage.setItem("messageDraft", e.target.value);
  };

  return (
    <div className="chatApp">
      <div className="bar-left">
        <div className="wrap">
          <div className="main-title">
            <h2>1 day chat App</h2>
          </div>
          <div className="description">
            <span>All messages will be deleted at every 00:00 UTC</span>
          </div>
        </div>
        <div className="block-left-field">
          <div className="item">
            <div className="title">
              <h4>1. Choose your user</h4>
            </div>
            <div className="field">
              <select onChange={(e) => onChangeUser(e)}>
                <option value="Joyse">Joyse</option>
                <option value="Sam">Sam</option>
                <option value="Russell">Russell</option>
              </select>
            </div>
          </div>
          <div className="item item-field">
            <div className="title">
              <h4>2. Choose your Channel</h4>
            </div>
            <div className="field">
              <div
                className={`field-bt ${channelId === "1" ? "active" : ""}`}
                onClick={() => onChangeChannelId("1")}
              >
                <div className="button"></div>
                <span>General Channel</span>
              </div>
              <div
                className={`field-bt ${channelId === "2" ? "active" : ""}`}
                onClick={() => onChangeChannelId("2")}
              >
                <div className="button"></div>
                <span>Technology Channel</span>
              </div>
              <div
                className={`field-bt ${channelId === "3" ? "active" : ""}`}
                onClick={() => onChangeChannelId("3")}
              >
                <div className="button"></div>
                <span>LGTM Channel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-chat">
        <div className="section-top">
          <div className="title">
            <span>{channel}</span>
          </div>
        </div>
        <div className="section-chat-messsage">
          <a
            href="#/"
            onClick={() => GetMoremessage(true)}
            className="readMore top"
          >
            Read More
            <i className="arrow up"></i>
          </a>
          <div className="block-card-message">
            {dataQuery &&
              dataQuery?.map((data: any) => (
                <CardMessage
                  isCurrentUser={data.userId === user ? true : false}
                  data={data}
                />
              ))}
          </div>
          <a
            href="#/"
            onClick={() => GetMoremessage(false)}
            className="readMore bottom"
          >
            Read More
            <i className="arrow down"></i>
          </a>
        </div>
        <div className="section-messsage-field">
          <textarea
            onChange={(e) => onChangemessage(e)}
            placeholder="Type your message here..."
            value={message}
          />
          {errorSubmit && <div className="error">Message not sent</div>}
          <div className="button" onClick={onSubmit}>
            Send Message
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
