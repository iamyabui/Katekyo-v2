import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { chatListState } from "../../features/atoms/atoms";
import Header from "../Common/Header";

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

const Chatroom = () => {
  const navigate = useNavigate();
  const [chatList] = useRecoilState(chatListState);
  const handleClick = (id: string) => {
    navigate(`/Teacher/ChatroomDetail/${id}`);
  };

  return (
    <>
      <Header />
      <Box sx={mainStyle}>
        <Box sx={listStyle}>
          <Box>
            <Typography sx={titleStyle}>チャットルーム</Typography>
          </Box>
          {chatList.map((chat) => (
            <Box sx={boxStyle} onClick={() => handleClick(chat.studentId)}>
              <Typography>{chat.studentName}</Typography>
              <Typography>{chat.latestText}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Chatroom;
