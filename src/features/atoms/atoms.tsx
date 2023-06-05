import { atom } from "recoil";

export interface chatObj {
  chatId: string;
  senderId: string;
  senderName: string;
  senderIcon: string;
  text: string;
  time: string;
}

export const userState = atom({
  key: "user",
  default: { name: "John", age: 16 },
});

export const allChatState = atom({
  key: "allChatState",
  default: [
    {
      studentId: "1",
      chat: [
        {
          chatId: "1",
          senderId: "John",
          senderName: "John",
          senderIcon: "John",
          text: "hello",
          time: "12:00",
        },
        {
          chatId: "2",
          senderId: "Hanamichi",
          senderName: "Hanamichi",
          senderIcon: "Hanamichi",
          text: "hello, John",
          time: "12:00",
        },
        {
          chatId: "3",
          senderId: "John",
          senderName: "John",
          senderIcon: "John",
          text: "hello2",
          time: "12:00",
        },
        {
          chatId: "4",
          senderId: "Hanamichi",
          senderName: "Hanamichi",
          senderIcon: "Hanamichi",
          text: "hello, John2",
          time: "12:00",
        },
      ],
    },
    {
      studentId: "2",
      chat: [
        {
          chatId: "1",
          senderId: "John",
          senderName: "John",
          senderIcon: "John",
          text: "hello",
          time: "12:00",
        },
        {
          chatId: "2",
          senderId: "Hanamichi",
          senderName: "Hanamichi",
          senderIcon: "Hanamichi",
          text: "hello, John",
          time: "12:00",
        },
        {
          chatId: "3",
          senderId: "John",
          senderName: "John",
          senderIcon: "John",
          text: "hello2",
          time: "12:00",
        },
        {
          chatId: "4",
          senderId: "Hanamichi",
          senderName: "Hanamichi",
          senderIcon: "Hanamichi",
          text: "hello, John2",
          time: "12:00",
        },
      ],
    },
  ],
});

export const chatListState = atom({
  key: "chatListState",
  default: [
    {
      studentId: "1",
      studentName: "John",
      studentIcon: "John",
      latestText: "",
    },
    {
      studentId: "2",
      studentName: "Haruko",
      studentIcon: "Haruko",
      latestText: "",
    },
  ],
});
