import { deleteCourseInfoAsync } from "../features/teacher/teacherSlice";
import { Courses } from "../Types";

export const deleteCourse = async (
  registerCourses: Courses,
  courses: Courses,
  teacherId: string,
  dispatch: any
) => {
  const deleteCoursesArray = courses.filter(
    (course) => !registerCourses.some((value) => value.id === course.id)
  );

  try {
    if (teacherId) {
      const deletePromises = deleteCoursesArray.map((course) =>
        dispatch(
          deleteCourseInfoAsync({
            teacherId: teacherId,
            courseId: course.id,
          })
        )
      );
      return await Promise.all(deletePromises);
    }
  } catch (error) {
    console.log(error);
  }
};
