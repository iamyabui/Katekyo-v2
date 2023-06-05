import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { allChatState, chatObj } from "../../features/atoms/atoms";
import CommonButton from "../atoms/CommonButton";
import Header from "../Common/Header";
import { FiTrash2, FiEdit } from "react-icons/fi";

const mainStyle = {
  display: "flex",
  flexFlow: "column",
};

const titleStyle = {
  marginTop: "20px",
  marginBottom: "10px",
};

const boxStyle = {
  display: "flex",
  flexFlow: "column",
  paddingInline: "30px",
  padding: "10px",
  backgroundColor: "#DBF0FF",
  borderRadius: "5px",
};

const listStyle = {
  display: "flex",
  margin: "auto",
  width: "800px",
  flexFlow: "column",
  gap: "10px",
};

const iconsStyle = {
  display: "flex",
  justifyContent: "end",
  gap: "10px",
};

const iconBoxStyle = {
  cursor: "pointer",
};

const backButtonStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const ChatroomDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allChatList, setAllChatList] = useRecoilState(allChatState);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState({
    editable: false,
    targetId: "",
  });
  const chatByStudent = allChatList.find((chat) => chat.studentId === id);
  const chatList = chatByStudent?.chat;

  const updateChat = (newChat: chatObj[]) => {
    const newAllChatList = [...allChatList];
    const targetIndex = allChatList.findIndex((chat) => chat.studentId === id);
    if (targetIndex !== -1) {
      newAllChatList[targetIndex] = {
        ...newAllChatList[targetIndex],
        chat: newChat,
      };
    }
    setAllChatList(newAllChatList);
  };

  const handleAdd = () => {
    const addChatParam = {
      chatId: "test",
      senderId: "myId",
      senderName: "myName",
      senderIcon: "myIcon",
      text: text,
      time: "12:00",
    };
    const newChats = chatList ? [...chatList, addChatParam] : [addChatParam];
    updateChat(newChats);
    setText("");
  };

  const handleUpdate = () => {
    if (chatList) {
      const targetChat = chatList.find(
        (chat) => chat.chatId === isEdit.targetId
      );
      const newChat = targetChat && { ...targetChat, text: text };

      const copyChatList = [...chatList];
      const targetChatIndex = copyChatList.findIndex(
        (chat) => chat.chatId === isEdit.targetId
      );
      if (targetChatIndex !== -1 && newChat) {
        copyChatList[targetChatIndex] = newChat;
      }

      if (newChat) updateChat(copyChatList);
      setText("");
      setIsEdit({ editable: false, targetId: "" });
    }
  };

  const handleDelete = (targetChatId: string) => {
    const newChats = chatList?.filter((chat) => chat.chatId !== targetChatId);
    if (newChats) updateChat(newChats);
  };

  const handleEdit = (targetChatId: string) => {
    const targetChat = chatList?.find((chat) => chat.chatId === targetChatId);
    if (targetChat) {
      setText(targetChat.text);
      setIsEdit({ editable: true, targetId: targetChatId });
    }
  };

  const handleRedirect = () => {
    navigate("/Teacher/Chatroom");
  };

  return (
    <>
      <Header />
      <Box sx={mainStyle}>
        <Box sx={listStyle}>
          <Box>
            <Typography sx={titleStyle}>チャットルーム</Typography>
          </Box>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></TextField>
          <CommonButton
            title={isEdit.editable ? "更新" : "送信"}
            onClick={isEdit.editable ? handleUpdate : handleAdd}
            disabled={text === ""}
          />
          {chatList &&
            chatList.map((chat) => (
              <Box sx={boxStyle}>
                <Typography>{chat.senderName}</Typography>
                <Typography>{chat.text}</Typography>
                <Box sx={iconsStyle}>
                  <Box
                    onClick={() => handleDelete(chat.chatId)}
                    sx={iconBoxStyle}
                  >
                    <FiTrash2 />
                  </Box>
                  <Box
                    onClick={() => handleEdit(chat.chatId)}
                    sx={iconBoxStyle}
                  >
                    <FiEdit />
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
        <Box sx={backButtonStyle}>
          <CommonButton title="一覧へ戻る" onClick={handleRedirect} />
        </Box>
      </Box>
    </>
  );
};

export default ChatroomDetail;
