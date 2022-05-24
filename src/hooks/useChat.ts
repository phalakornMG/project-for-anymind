import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";

const useChat = () => {
  const context = useContext(ChatContext);

  if (!context)
    throw new Error("ChatContext must be placed within ChatProvider");

  return context;
};

export default useChat;
