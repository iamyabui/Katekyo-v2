import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import CommonButton from "../atoms/CommonButton";
import Header from "../Common/Header";
import AddSubjectButton from "../atoms/AddSubjectButton";
import GenericModal from "../Common/GenericModal";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import { useNavigate } from "react-router-dom";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "50px",
  marginTop: "50px",
};

const leftContainer = {
  width: "230px",
};

const profileStyle = {
  maxHeight: "800px",
  backgroundColor: "#EAD7F2",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  borderRadius: "10px",
  paddingTop: "20px",
  paddingBottom: "20px",
};

const detailProfileBox = {
  width: "170px",
  gap: "10px",
  display: "flex",
  flexDirection: "column",
};

const detailBoxStyle = {
  width: "500px",
  gap: "20px",
  display: "flex",
  flexFlow: "column",
};

const toggleButton = {
  justifyContent: "center",
  display: "flex",
};

const titleColor = {
  fontWeight: 600,
  color: "#444444",
};

const editButtonStyle = {
  justifyContent: "end",
  display: "flex",
  gap: "10px",
};

const TextFieldStyle = {
  height: "40px",
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

const textStyle = {
  fontSize: "10px",
  paddingInline: "10px",
};

const displayStatusBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: "10px",
};

const eachBox = {
  gap: "10px",
  display: "flex",
  flexDirection: "column",
};

const courseField = {
  gap: "10px",
  display: "flex",
};

const TeacherEditDetail = () => {
  const navigate = useNavigate();
  const [displayStatus, setDisplayStatus] = useState(false);
  const [occupation, setOccupation] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirectPage = () => {
    navigate("/Teacher/TeacherDetail");
  };

  const handleAddCourse = () => {};

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
      <GenericModal open={open} handleClose={handleClose} />
      <Header />
      <Box sx={boxStyle}>
        <Box sx={leftContainer}>
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
            <CommonButton onClick={handleAddCourse} title="写真を変更" />
            <Box sx={detailProfileBox}>
              <Box sx={eachBox}>
                <Typography>名前※</Typography>
                <TextField
                  required
                  placeholder="名前を入力"
                  sx={TextFieldStyle}
                />
              </Box>
              <Box sx={eachBox}>
                <Typography>専門</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={occupation}
                    onChange={(e: SelectChangeEvent) =>
                      setOccupation(e.target.value)
                    }
                  >
                    <MenuItem value="大学受験">大学受験</MenuItem>
                    <MenuItem value="中学受験">中学受験</MenuItem>
                    <MenuItem value="高校受験">高校受験</MenuItem>
                    <MenuItem value="中間期末試験対策">
                      中間期末試験対策
                    </MenuItem>
                    <MenuItem value="センター試験対策">センター験対策</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={eachBox}>
                <Typography>担当科目</Typography>
                <AddSubjectButton onClick={handleClickOpen} />
              </Box>
              <Box>
                <Typography>相談方法</Typography>
                <Box>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="チャット相談"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="ビデオ相談"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={displayStatusBox}>
            <Typography>表示ステータス</Typography>
            <Switch
              sx={toggleButton}
              checked={displayStatus}
              onChange={() => setDisplayStatus((prev) => !prev)}
              name="gilad"
            />
          </Box>
          <Box>
            <Typography sx={textStyle}>
              先生一覧に表示する場合はON、表示しない場合はOFFにしてください。
            </Typography>
          </Box>
        </Box>

        <Box sx={detailBoxStyle}>
          <Box sx={eachBox}>
            <Typography sx={titleColor}>表示タイトル</Typography>
            <TextField
              placeholder="表示タイトルを入力"
              sx={TextFieldStyle}
              fullWidth
            />
          </Box>
          <Box sx={eachBox}>
            <Typography sx={titleColor}>自己紹介</Typography>
            <TextField
              multiline
              rows={4}
              placeholder="アピール文を入力しましょう！"
              fullWidth
            />
          </Box>
          <Box sx={eachBox}>
            <Typography sx={titleColor}>コース内容</Typography>

            <Box sx={courseField}>
              <TextField placeholder="コース名" sx={TextFieldStyle} />
              <TextField placeholder="料金" sx={TextFieldStyle} />
              <CommonButton onClick={handleAddCourse} title="追加" />
            </Box>

            <TableContainer>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>コース名</TableCell>
                    <TableCell align="right">値段</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
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
                      <TableCell align="center">
                        <BsFillTrashFill />
                      </TableCell>
                      <TableCell align="center">
                        <BiEdit />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={editButtonStyle}>
            <PrimaryButton
              handleAction={handleRedirectPage}
              title="キャンセル"
            />
            <SecondaryButton handleAction={handleRedirectPage} title="保存" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TeacherEditDetail;
