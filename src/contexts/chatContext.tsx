import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ChatContextType } from "../types/chatContextType";
import { CREATE_MESSAGE } from "../graphQL/mutations";
import { LOAD_LASTMESSAGE } from "../graphQL/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import { PostMessageType } from "../types/postMessageType";
const ChatContext = createContext<ChatContextType | null>(null);

function ChatProvider({ children }: { children: ReactNode }) {
  const [channelId, setChannelId] = useState("1");
  const [dataQuery, setDataQuery] = useState([]);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [old, setOld] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [postMessage, { error, loading }] = useMutation(CREATE_MESSAGE);
  const [getLastmessage, { data, refetch }] = useLazyQuery(LOAD_LASTMESSAGE, {
    variables: { channelId: channelId },
  });

  const GetMoremessage = (old: boolean) => {
    let messageId = "";
    if (old) {
      let firstData = dataQuery[0];
      messageId = firstData["messageId"];
      setMessageId(messageId);
      setOld(old);
    } else {
      let lastData = dataQuery[dataQuery.length - 1];
      messageId = lastData["messageId"];
      setMessageId(messageId);
      setOld(old);
    }
    return data;
  };

  const actionAddMoreData = (moreData: any) => {
    if (moreData) {
      let data = moreData.fetchMoreMessages;
      let sortData = [] as any;
      data.map((item: any, key: any) => {
        sortData[data.length - 1 - key] = item;
      });
      let arrayPushData = [] as any;
      if (old) {
        arrayPushData = sortData;
        dataQuery.map((item) => arrayPushData.push(item));
        setDataQuery(arrayPushData);
      } else {
        arrayPushData = dataQuery;
        sortData.map((item: any) => arrayPushData.push(item));
        setDataQuery(arrayPushData);
      }
    }
  };
  useEffect(() => {
    getLastmessage();
    refetch();
  }, [getLastmessage]);

  useEffect(() => {
    getLastmessage();
    refetch();
    if (data) {
      let lastmessageData = data.fetchLatestMessages;
      let sortData = [] as any;
      lastmessageData.map((item: any, key: any) => {
        sortData[lastmessageData.length - 1 - key] = item;
      });
      setDataQuery(sortData);
    }
  }, [channelId, loading, data, getLastmessage]);

  useEffect(() => {
    if (error) {
      setErrorSubmit(true);
    }
  }, [error]);

  function LastMessage(id: String) {
    setChannelId(id as string);
  }

  const addMessage = ($postMessage: PostMessageType) => {
    postMessage({
      variables: {
        channelId: $postMessage.channelId,
        text: $postMessage.text,
        userId: $postMessage.userId,
      },
    });
    refetch();
    getLastmessage();
    setErrorSubmit(false);
    if (error) {
      console.log(error, ":posr Error");
    } else {
    }
  };

  return (
    <ChatContext.Provider
      value={
        {
          dataQuery,
          addMessage,
          LastMessage,
          GetMoremessage,
          actionAddMoreData,
          old,
          messageId,
          errorSubmit,
        } as ChatContextType
      }
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
