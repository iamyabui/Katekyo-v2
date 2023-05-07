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
import React, { ChangeEvent, useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import CommonButton from "../atoms/CommonButton";
import Header from "../Common/Header";
import AddSubjectButton from "../atoms/AddSubjectButton";
import GenericModal from "../Common/GenericModal";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCourseInfoAsync,
  fetchTeacherInfoAsync,
  putEachTeacherInfoAsync,
  selectCourses,
  selectTeachers,
} from "../../features/teacher/teacherSlice";
import { allSubjects, Subject } from "./AllSubjects";
import Tag from "../atoms/Tag";
import { ImageModal } from "../Common/ImageModal";
import { Courses } from "../../Types";
import { addCourse } from "../../utils/AddCourse";
import { editCourse } from "../../utils/EditCourse";
import { deleteCourse } from "../../utils/deleteCourse";
import EditCancelModal from "../Common/EditCancelModal";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../features/toast/toastSlice";
import Toast from "../Common/Toast";

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
  width: "100%",
};

const dialogContent = {
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
};

const TeacherEditDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { teachers, loading, loaded } = useAppSelector(selectTeachers);
  const {
    courses,
    posting,
    posted,
    loading: coursesLoading,
    loaded: coursesLoaded,
    deleting,
    deleted,
  } = useAppSelector(selectCourses);
  const teacher = teachers.find((teacher) => teacher.id === id);
  const [displayStatus, setDisplayStatus] = useState(false);
  const [occupation, setOccupation] = useState("大学受験");
  const [teacherName, setTeacherName] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [registerCourses, setRegisterCourses] = useState<Courses>([]);
  const [updateCourse, setUpdateCourse] = useState({
    name: "",
    price: 0,
    id: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [consult, setConsult] = useState({
    chat: false,
    video: false,
  });
  const [imageURL, setImageURL] = useState("");
  const [isCourseEdit, setIsCourseEdit] = useState(false);
  const [editCancelModalOpen, setEditCancelModalOpen] = useState(false);

  useEffect(() => {
    if (id || (id && posted && !posting) || (id && deleted && !deleting))
      dispatch(fetchCourseInfoAsync(id));
  }, [dispatch, id, posted, posting, deleted, deleting]);

  useEffect(() => {
    if (!teacher && id) {
      dispatch(fetchTeacherInfoAsync());
    }
  }, [dispatch, id, teacher]);

  useEffect(() => {
    if (teacher) {
      setDisplayStatus(teacher.status);
      setOccupation(teacher.category);
      setTeacherName(teacher.name);
      setTitle(teacher.title);
      setDetail(teacher.detail);
      setSelectedSubjects(teacher.subjects);
      setConsult({
        chat: teacher.consult.chat,
        video: teacher.consult.video,
      });
      setImageURL(teacher.url);
      setRegisterCourses(courses);
    }
    if (courses) {
      setRegisterCourses(courses);
    }
  }, [teacher, courses]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setConsult((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubjects(teacher?.subjects || []);
  };

  const handleRedirectPage = () => {
    navigate(`/Teacher/TeacherDetail/${id}`);
  };

  const handleAddCourse = () => {
    setRegisterCourses([...registerCourses, updateCourse]);
    setUpdateCourse({
      name: "",
      price: 0,
      id: "",
    });
  };

  const handleEditCourse = (courseID: string) => {
    const editCourse = courses.find((course) => course.id === courseID);
    if (editCourse)
      setUpdateCourse({
        name: editCourse.name,
        price: editCourse?.price,
        id: courseID,
      });
    setIsCourseEdit(true);
  };

  const handleCancelEdit = () => {
    setUpdateCourse({
      name: "",
      price: 0,
      id: "",
    });
    setIsCourseEdit(false);
  };

  const handleSaveCourse = () => {
    const tempCourses = registerCourses.map((course) => {
      if (course.id === updateCourse.id) {
        return {
          ...course,
          name: updateCourse.name,
          price: updateCourse.price,
        };
      } else {
        return course;
      }
    });
    setRegisterCourses(tempCourses);
    setIsCourseEdit(false);
    setUpdateCourse({
      name: "",
      price: 0,
      id: "",
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    const tempCourses = registerCourses.filter(
      (course) => course.id !== courseId
    );
    setRegisterCourses(tempCourses);
  };

  const handleSavePage = async () => {
    const params = {
      status: displayStatus,
      category: occupation,
      name: teacherName,
      title: title,
      detail: detail,
      subjects: selectedSubjects,
      consult: consult,
      url: imageURL,
    };

    if (id) {
      const putTeacherInfoPromise = dispatch(
        putEachTeacherInfoAsync({ teacherId: id, params })
      );
      const addCoursePromise = addCourse(
        registerCourses,
        courses,
        id,
        dispatch
      );
      const editCoursePromise = editCourse(
        registerCourses,
        courses,
        id,
        dispatch
      );
      const deleteCoursePromise = deleteCourse(
        registerCourses,
        courses,
        id,
        dispatch
      );
      const fetchCourseInfoPromise = dispatch(fetchCourseInfoAsync(id));
      const fetchTeacherInfoPromise = dispatch(fetchTeacherInfoAsync());

      try {
        await Promise.all([
          putTeacherInfoPromise,
          addCoursePromise,
          editCoursePromise,
          deleteCoursePromise,
          fetchCourseInfoPromise,
          fetchTeacherInfoPromise,
        ]);
      } catch (error) {
        dispatch(setErrorMessage());
        return;
      }

      navigate(`/Teacher/TeacherDetail/${id}`);
      dispatch(setSuccessMessage());
    }
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubjects((prevSelectedSubjects) => {
      const isSelected = prevSelectedSubjects.includes(subject);
      return isSelected
        ? prevSelectedSubjects.filter((s) => s !== subject)
        : [...prevSelectedSubjects, subject];
    });
  };

  const handleAction = () => {
    setOpen(false);
  };

  const modalContent = (
    <Box sx={dialogContent}>
      {allSubjects.map((subject, index) => (
        <Tag
          key={index}
          title={Subject[subject as keyof typeof Subject]}
          selected={selectedSubjects.includes(subject)}
          onClick={() => handleSubjectClick(subject)}
        />
      ))}
    </Box>
  );

  const content =
    !teacher || (!loaded && loading && coursesLoading && !coursesLoaded) ? (
      <>
        <Box>loading</Box>
      </>
    ) : (
      <>
        <Toast
          successMessage="変更が保存されました！"
          errorMessage="保存に失敗しました。"
        />
        <EditCancelModal
          open={editCancelModalOpen}
          handleClose={() => setEditCancelModalOpen(false)}
          handleAction={handleRedirectPage}
        />
        <ImageModal
          imageModalOpen={imageModalOpen}
          setImageModalOpen={setImageModalOpen}
          id={id || ""}
          setImageURL={setImageURL}
          imageURL={imageURL}
        />
        <GenericModal
          open={open}
          handleClose={handleClose}
          handleAction={handleAction}
          modalContent={modalContent}
          title="担当科目の選択"
          primaryButtonTitle="キャンセル"
          secondaryButtonTitle="保存"
          loading={false}
        />
        <Header />
        <Box sx={boxStyle}>
          <Box sx={leftContainer}>
            <Box sx={profileStyle}>
              <Typography>Profile</Typography>
              <Avatar
                src={imageURL}
                alt="User Image"
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              />
              <CommonButton
                onClick={() => setImageModalOpen(true)}
                title="写真を変更"
              />
              <Box sx={detailProfileBox}>
                <Box sx={eachBox}>
                  <Typography>名前※</Typography>
                  <TextField
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
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
                      <MenuItem value="センター試験対策">
                        センター験対策
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={eachBox}>
                  <Typography>担当科目</Typography>
                  <Box sx={{ display: "flex", gap: "5px", flexFlow: "wrap" }}>
                    {selectedSubjects.map((subject, index) => (
                      <Tag
                        key={index}
                        title={Subject[subject as keyof typeof Subject]}
                      />
                    ))}
                  </Box>
                  <AddSubjectButton onClick={handleClickOpen} />
                </Box>
                <Box>
                  <Typography>相談方法</Typography>
                  <Box>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={consult.chat}
                            onChange={handleCheckboxChange}
                            name="chat"
                          />
                        }
                        label="チャット相談"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={consult.video}
                            onChange={handleCheckboxChange}
                            name="video"
                          />
                        }
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="表示タイトルを入力"
                sx={TextFieldStyle}
                fullWidth
              />
            </Box>
            <Box sx={eachBox}>
              <Typography sx={titleColor}>自己紹介</Typography>
              <TextField
                multiline
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={10}
                placeholder="アピール文を入力しましょう！"
                fullWidth
              />
            </Box>
            <Box sx={eachBox}>
              <Typography sx={titleColor}>コース内容</Typography>

              <Box sx={courseField}>
                <TextField
                  value={updateCourse.name}
                  onChange={(e) =>
                    setUpdateCourse((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  placeholder="コース名"
                  sx={{ ...TextFieldStyle, maxWidth: 200 }}
                />
                <TextField
                  value={updateCourse.price}
                  onChange={(e) =>
                    setUpdateCourse((prevState) => ({
                      ...prevState,
                      price:
                        e.target.value === ""
                          ? 0
                          : parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="料金"
                  sx={{ ...TextFieldStyle, maxWidth: 100 }}
                />
                {isCourseEdit ? (
                  <>
                    <CommonButton onClick={handleSaveCourse} title="保存" />
                    <CommonButton
                      onClick={handleCancelEdit}
                      title="キャンセル"
                    />
                  </>
                ) : (
                  <CommonButton onClick={handleAddCourse} title="追加" />
                )}
              </Box>
              {!deleting ? (
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
                      {registerCourses.map((course) => (
                        <TableRow
                          key={course.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {course.name}
                          </TableCell>
                          <TableCell align="right">{course.price}円</TableCell>
                          <TableCell align="center">
                            {isCourseEdit ? null : (
                              <BsFillTrashFill
                                onClick={() => handleDeleteCourse(course.id)}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {isCourseEdit ? null : (
                              <BiEdit
                                onClick={() => handleEditCourse(course.id)}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div>loading...</div>
              )}
            </Box>
            <Box sx={editButtonStyle}>
              <PrimaryButton
                handleAction={() => setEditCancelModalOpen(true)}
                title="キャンセル"
                loading={false}
              />
              <SecondaryButton
                handleAction={handleSavePage}
                title="変更を保存"
                loading={false}
              />
            </Box>
          </Box>
        </Box>
      </>
    );

  return content;
};

export default TeacherEditDetail;
