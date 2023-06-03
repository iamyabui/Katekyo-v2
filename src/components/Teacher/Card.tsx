import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { TeacherUser } from "../../Types";
import Tag from "../atoms/Tag";
import { Subject } from "./AllSubjects";

const CardStyle = {
  width: "200px",
  height: "250px",
  backgroundColor: "#EEEEEE",
  color: "#4D4D4D",
  padding: "5px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  gap: "5px",
  pointerEvents: "none",
};

const AvatarStyle = {
  width: 53,
  height: 53,
  borderRadius: "50%",
};

const tagBoxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "5px",
};

interface Props {
  handleClick: () => void;
  teacher: TeacherUser;
}

const Card = ({ handleClick, teacher }: Props) => {
  return (
    <Box onClick={handleClick}>
      <Box sx={CardStyle}>
        <Avatar src={teacher.url} alt="User Image" sx={AvatarStyle} />
        <Typography>{teacher.name}</Typography>
        <Typography>{teacher.title}</Typography>
        <Box>
          <Box sx={tagBoxStyle}>
            {teacher.subjects.map((subject) => (
              <Tag
                title={Subject[subject as keyof typeof Subject]}
                key={subject}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
