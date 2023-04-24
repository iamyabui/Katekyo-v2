import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../atoms/CommonButton";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import Tag from "../atoms/Tag";
import Header from "../Common/Header";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "50px",
  marginTop: "50px",
};

const profileStyle = {
  width: "250px",
  backgroundColor: "#EAD7F2",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  borderRadius: "10px",
  paddingTop: "20px",
  paddingBottom: "20px",
};

const detailBoxStyle = {
  width: "500px",
  gap: "20px",
  display: "flex",
  flexFlow: "column",
};

const titleColor = {
  fontWeight: 600,
  color: "#444444",
};

const tagBoxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const textBoxStyle = {
  textAlign: "center",
  flexGrow: 1,
};

const editButtonStyle = {
  justifyContent: "end",
  display: "flex",
  gap: "10px",
};

const TeacherDetail = () => {
  const navigate = useNavigate();
  const handleRedirectEditPage = () => {
    navigate("/Teacher/TeacherEditDetail");
  };

  const handleRedirectList = () => {
    navigate("/");
  };

  const rows = [
    {
      course_name: "コース名",
      price: 5000,
      status: "受講中",
    },
    {
      course_name: "コース名",
      price: 5000,
      status: "受講中",
    },
    {
      course_name: "コース名",
      price: 5000,
      status: "受講中",
    },
  ];
  return (
    <>
      <Header />
      <Box sx={boxStyle}>
        <Box sx={profileStyle}>
          <Typography>Profile</Typography>
          <Avatar
            src="/images/yamada.png"
            alt="User Image"
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          />
          <Typography>桜木　花道</Typography>
          <CommonButton onClick={handleRedirectEditPage} title="相談する" />
          <Box>
            <Box sx={textBoxStyle}>
              <Typography>専門</Typography>
            </Box>
            <Box sx={tagBoxStyle}>
              <Tag />
              <Tag />
            </Box>
          </Box>
          <Box>
            <Box sx={textBoxStyle}>
              <Typography>担当科目</Typography>
            </Box>
            <Box sx={tagBoxStyle}>
              <Tag />
            </Box>
          </Box>
          <Box>
            <Box sx={textBoxStyle}>
              <Typography>相談方法</Typography>
            </Box>
            <Box sx={tagBoxStyle}>
              <Tag />
            </Box>
          </Box>
        </Box>

        <Box sx={detailBoxStyle}>
          <Box>
            <Typography sx={titleColor}>英語の天才にします！</Typography>
          </Box>
          <Box>
            <Typography sx={titleColor}>自己紹介</Typography>
            <Typography>
              はじめまして、小林修といいます。
              現在大学一年生の文学部に所属しています。
              国語や古典、漢文は得意科目なので、勉強方法などアドバイスできたらと思います。
              トライアルで、1回目受講コースも用意しているので、気になる方はぜひ受講してみてくださいね。
              なにか気になることがあればメッセージで気軽にご相談ください！
            </Typography>
          </Box>
          <Box>
            <Typography sx={titleColor}>コース内容</Typography>

            <TableContainer>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>コース名</TableCell>
                    <TableCell align="right">値段</TableCell>
                    <TableCell align="right">受講ステータス</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.course_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.course_name}
                      </TableCell>
                      <TableCell align="right">{row.price}円</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={editButtonStyle}>
            <PrimaryButton handleAction={handleRedirectEditPage} title="編集" />
            <SecondaryButton
              handleAction={handleRedirectList}
              title="一覧に戻る"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TeacherDetail;
