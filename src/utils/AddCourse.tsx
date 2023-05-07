import { postCourseInfoAsync } from "../features/teacher/teacherSlice";
import { Courses } from "../Types";

export const addCourse = async (
  registerCourses: Courses,
  courses: Courses,
  teacherId: string,
  dispatch: any
) => {
  const addCoursesArray = registerCourses.filter(
    (course) => !courses.some((value) => value.id === course.id)
  );
  try {
    if (teacherId) {
      const postPromises = addCoursesArray.map((course) =>
        dispatch(
          postCourseInfoAsync({
            teacherId: teacherId,
            params: { name: course.name, price: course.price },
          })
        )
      );
      return await Promise.all(postPromises);
    }
  } catch (error) {
    console.log(error);
  }
};
