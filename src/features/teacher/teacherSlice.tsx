import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firabase";
import { Course, Courses, TeacherUser } from "../../Types";

interface initialStateType {
  teachers: TeacherUser[];
  teacher: TeacherUser;
  courses: Courses;
  loading: boolean;
  loaded: boolean;
}

const initialState: initialStateType = {
  teachers: [
    {
      id: "",
      category: "",
      consult: {
        chat: false,
        video: false,
      },
      detail: "",
      email: "",
      flag: "",
      name: "",
      status: false,
      subjects: [],
      title: "",
    },
  ],
  teacher: {
    id: "",
    category: "",
    consult: {
      chat: false,
      video: false,
    },
    detail: "",
    email: "",
    flag: "",
    name: "",
    status: false,
    subjects: [],
    title: "",
    courses: [],
  },
  courses: [],
  loading: false,
  loaded: false,
};

export const fetchTeacherInfoAsync = createAsyncThunk<TeacherUser[]>(
  "teacher/fetchTeacherInfo",
  async () => {
    const querySnapshot = await getDocs(collection(db, "TeacherUsers"));
    const fetchedTeachers: TeacherUser[] = [];
    querySnapshot.forEach((doc) => {
      const teacherData = doc.data() as TeacherUser;
      teacherData.id = doc.id;
      fetchedTeachers.push(teacherData);
    });
    return fetchedTeachers;
  }
);

export const fetchEachTeacherInfoAsync = createAsyncThunk<TeacherUser, string>(
  "teacher/fetchEachTeacherInfo",
  async (teacherId) => {
    const teacherRef = doc(db, "TeacherUsers", teacherId);
    const coursesCol = collection(teacherRef, "Courses");
    const docTeacher = await getDoc(teacherRef);
    const docCourses = await getDocs(coursesCol);

    const courses = [];
    docCourses.forEach((doc) => {
      courses.push({ ...doc.data(), id: doc.id });
    });

    if (docTeacher.exists()) {
      const teacherData = docTeacher.data() as TeacherUser;
      teacherData.id = docTeacher.id;
      return teacherData;
    } else {
      throw new Error("Teacher not found");
    }
  }
);

export const fetchCourseInfoAsync = createAsyncThunk<Courses, string>(
  "teacher/fetchCourseInfo",
  async (teacherId) => {
    const teacherRef = doc(db, "TeacherUsers", teacherId);
    const coursesCol = collection(teacherRef, "Courses");
    const docCourses = await getDocs(coursesCol);

    const courses: Courses = [];
    docCourses.forEach((doc) => {
      courses.push({ ...doc.data(), id: doc.id } as Course);
    });

    return courses;
  }
);

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherInfoAsync.pending, (state) => {
        state.loading = true;
        state.loaded = false;
      })
      .addCase(fetchTeacherInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.teachers = action.payload;
      })
      .addCase(fetchTeacherInfoAsync.rejected, (state) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(fetchEachTeacherInfoAsync.pending, (state) => {
        state.loading = true;
        state.loaded = false;
      })
      .addCase(fetchEachTeacherInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.teacher = action.payload;
      })
      .addCase(fetchEachTeacherInfoAsync.rejected, (state) => {
        state.loading = false;
        state.loaded = false;
      })
      .addCase(fetchCourseInfoAsync.pending, (state) => {
        state.loading = true;
        state.loaded = false;
      })
      .addCase(fetchCourseInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.courses = action.payload;
      })
      .addCase(fetchCourseInfoAsync.rejected, (state) => {
        state.loading = false;
        state.loaded = false;
      });
  },
});

export const selectTeachers = (state: {
  teachers: initialStateType;
}): { teachers: TeacherUser[]; loading: boolean; loaded: boolean } => ({
  teachers: state.teachers.teachers,
  loading: state.teachers.loading,
  loaded: state.teachers.loaded,
});

export const selectTeacher = (state: {
  teachers: initialStateType;
}): { teacher: TeacherUser; loading: boolean; loaded: boolean } => ({
  teacher: state.teachers.teacher,
  loading: state.teachers.loading,
  loaded: state.teachers.loaded,
});

export const selectCourses = (state: {
  teachers: initialStateType;
}): { courses: Courses; loading: boolean; loaded: boolean } => ({
  courses: state.teachers.courses,
  loading: state.teachers.loading,
  loaded: state.teachers.loaded,
});

export default teacherSlice.reducer;
