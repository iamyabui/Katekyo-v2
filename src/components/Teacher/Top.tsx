import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTeacherInfoAsync,
  selectTeachers,
} from "../../features/teacher/teacherSlice";

const CardsBox = {
  display: "flex",
  padding: "10px",
  gap: "10px",
  justifyContent: "center",
  flexFlow: "wrap",
};

const Top = () => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/Teacher/TeacherDetail/${id}`);
  };
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector(selectTeachers);

  useEffect(() => {
    dispatch(fetchTeacherInfoAsync());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box sx={CardsBox}>
        {teachers &&
          teachers.length > 0 &&
          teachers.map((teacher) => {
            return (
              <Card
                key={teacher.name}
                teacher={teacher}
                handleClick={() => handleClick(teacher.id)}
              />
            );
          })}
      </Box>
    </>
  );
};

export default Top;
