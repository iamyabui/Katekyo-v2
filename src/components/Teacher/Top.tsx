import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Header from "../Common/Header";
import Card from "./Card";
import { db } from "../../firabase";
import { TeacherUser } from "../../Types";

const CardsBox = {
  display: "flex",
  padding: "10px",
  gap: "10px",
  justifyContent: "center",
  flexFlow: "wrap",
};

const Top = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<TeacherUser[]>([]);
  const handleClick = () => {
    navigate("/Teacher/TeacherDetail");
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "TeacherUsers"));
      const fetchedTeachers: TeacherUser[] = [];
      querySnapshot.forEach((doc) => {
        fetchedTeachers.push(doc.data() as TeacherUser);
      });
      setTeachers(fetchedTeachers);
    };
    fetchData();
  }, []);

  console.log(teachers);

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
                handleClick={handleClick}
              />
            );
          })}
      </Box>
    </>
  );
};

export default Top;
