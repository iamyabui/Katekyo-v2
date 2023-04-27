import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firabase";
import { Course, Courses, TeacherUser } from "../../Types";

interface initialStateType {
  teachers: TeacherUser[];
  teacher: TeacherUser;
  courses: Courses;
  loading: boolean;
  loaded: boolean;
  posting: boolean;
  posted: boolean;
  deleting: boolean;
  deleted: boolean;
}

interface PostCourseInfoArgs {
  teacherId: string;
  params: { name: string; price: number };
}
interface PutCourseInfoArgs {
  teacherId: string;
  courseId: string;
  params: { name: string; price: number };
}

interface DeleteCourseInfoArgs {
  teacherId: string;
  courseId: string;
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
  posting: false,
  posted: false,
  deleting: false,
  deleted: false,
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

export const postCourseInfoAsync = createAsyncThunk<void, PostCourseInfoArgs>(
  "teacher/postCourseInfo",
  async ({ teacherId, params }) => {
    const coursesCollectionRef = collection(
      db,
      `TeacherUsers/${teacherId}/Courses`
    );

    try {
      await addDoc(coursesCollectionRef, params);
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  }
);

export const putCourseInfoAsync = createAsyncThunk<void, PutCourseInfoArgs>(
  "teacher/putCourseInfo",
  async ({ teacherId, courseId, params }) => {
    const courseRef = doc(db, `TeacherUsers/${teacherId}/Courses/${courseId}`);

    try {
      await updateDoc(courseRef, params);
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  }
);

export const deleteCourseInfoAsync = createAsyncThunk<
  void,
  DeleteCourseInfoArgs
>("teacher/deleteCourseInfo", async ({ teacherId, courseId }) => {
  const courseRef = doc(db, `TeacherUsers/${teacherId}/Courses/${courseId}`);

  try {
    await deleteDoc(courseRef);
  } catch (error) {
    console.error("Error delete course: ", error);
  }
});

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
      })
      .addCase(postCourseInfoAsync.pending, (state) => {
        state.loading = true;
        state.loaded = false;
        state.posting = true;
        state.posted = false;
      })
      .addCase(postCourseInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.posting = false;
        state.posted = true;
      })
      .addCase(postCourseInfoAsync.rejected, (state) => {
        state.loading = false;
        state.loaded = false;
        state.posting = false;
        state.posted = false;
      })
      .addCase(putCourseInfoAsync.pending, (state) => {
        state.loading = true;
        state.loaded = false;
        state.posting = true;
        state.posted = false;
      })
      .addCase(putCourseInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.posting = false;
        state.posted = true;
      })
      .addCase(putCourseInfoAsync.rejected, (state) => {
        state.loading = false;
        state.loaded = false;
        state.posting = false;
        state.posted = false;
      })
      .addCase(deleteCourseInfoAsync.pending, (state) => {
        state.loading = true;
        state.loaded = false;
        state.deleting = true;
        state.deleted = false;
      })
      .addCase(deleteCourseInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.deleting = false;
        state.deleted = true;
      })
      .addCase(deleteCourseInfoAsync.rejected, (state) => {
        state.loading = false;
        state.loaded = false;
        state.deleting = false;
        state.deleted = false;
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
}): {
  courses: Courses;
  loading: boolean;
  loaded: boolean;
  posting: boolean;
  posted: boolean;
  deleting: boolean;
  deleted: boolean;
} => ({
  courses: state.teachers.courses,
  loading: state.teachers.loading,
  loaded: state.teachers.loaded,
  posting: state.teachers.posting,
  posted: state.teachers.posted,
  deleting: state.teachers.deleting,
  deleted: state.teachers.deleted,
});

export default teacherSlice.reducer;
