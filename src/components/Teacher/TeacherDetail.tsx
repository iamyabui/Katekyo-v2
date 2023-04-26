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
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCourseInfoAsync,
  fetchTeacherInfoAsync,
  selectCourses,
  selectTeachers,
} from "../../features/teacher/teacherSlice";
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

const TeacherDetail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { teachers, loading, loaded } = useAppSelector(selectTeachers);
  const {
    courses,
    loading: coursesLoading,
    loaded: coursesLoaded,
  } = useAppSelector(selectCourses);
  const teacher = teachers.find((teacher) => teacher.id === id);

  const handleRedirectEditPage = () => {
    navigate(`/Teacher/TeacherEditDetail/${id}`);
  };

  useEffect(() => {
    if (id) dispatch(fetchCourseInfoAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!teacher && id) {
      dispatch(fetchTeacherInfoAsync());
    }
  }, [dispatch, id, teacher]);

  const handleRedirectList = () => {
    navigate("/");
  };

  const content =
    !teacher || (!loaded && loading && coursesLoading && !coursesLoaded) ? (
      <>
        <Box>loading</Box>
      </>
    ) : (
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
            <Typography>{teacher.name}</Typography>
            <CommonButton onClick={handleRedirectEditPage} title="相談する" />
            <Box>
              <Box sx={textBoxStyle}>
                <Typography>専門</Typography>
              </Box>
              <Box sx={tagBoxStyle}>
                <Tag title={teacher.category} />
              </Box>
            </Box>
            <Box>
              <Box sx={textBoxStyle}>
                <Typography>担当科目</Typography>
              </Box>
              <Box sx={tagBoxStyle}>
                {teacher.subjects.map((subject) => (
                  <Tag title={subject} key={subject} />
                ))}
              </Box>
            </Box>
            <Box>
              <Box sx={textBoxStyle}>
                <Typography>相談方法</Typography>
              </Box>
              <Box sx={tagBoxStyle}>
                {teacher.consult.chat && <Tag title="チャット" />}
                {teacher.consult.video && <Tag title="ビデオ通話" />}
              </Box>
            </Box>
          </Box>

          <Box sx={detailBoxStyle}>
            <Box>
              <Typography sx={titleColor}>{teacher.title}</Typography>
            </Box>
            <Box>
              <Typography sx={titleColor}>自己紹介</Typography>
              <Typography>{teacher.detail}</Typography>
            </Box>
            <Box>
              <Typography sx={titleColor}>コース内容</Typography>

              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>コース名</TableCell>
                      <TableCell align="right">値段</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow
                        key={course.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {course.name}
                        </TableCell>
                        <TableCell align="right">{course.price}円</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={editButtonStyle}>
              <PrimaryButton
                handleAction={handleRedirectEditPage}
                title="編集"
              />
              <SecondaryButton
                handleAction={handleRedirectList}
                title="一覧に戻る"
              />
            </Box>
          </Box>
        </Box>
      </>
    );

  return content;
};

export default TeacherDetail;
