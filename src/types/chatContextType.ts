import { PostMessageType } from "./postMessageType";
import { dataQueryType } from "./dataQueryType";

export type ChatContextType = {
  dataQuery: any;
  errorSubmit: boolean;
  messageId: string;
  old: boolean;
  addMessage: (postMessage: PostMessageType) => Promise<void>;
  LastMessage: (channelId: String) => Promise<void>;
  GetMoremessage: (old: Boolean) => Promise<void>;
  actionAddMoreData: (moreData: any) => Promise<void>;
};
