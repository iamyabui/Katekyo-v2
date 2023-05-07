import { putCourseInfoAsync } from "../features/teacher/teacherSlice";
import { Courses } from "../Types";

export const editCourse = async (
  registerCourses: Courses,
  courses: Courses,
  teacherId: string,
  dispatch: any
) => {
  const alreadyExistCoursesArray = courses.filter((course) =>
    registerCourses.some((value) => value.id === course.id)
  );

  function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
  }

  const putParamArr: Courses = alreadyExistCoursesArray
    .map(function (existCourse) {
      const registerCourse = registerCourses.find(
        (value) => value.id === existCourse.id
      );
      if (
        registerCourse?.name !== existCourse.name ||
        registerCourse?.price !== existCourse.price
      ) {
        return registerCourse;
      }
      return undefined;
    })
    .filter(isDefined);

  try {
    if (teacherId) {
      const putPromises = putParamArr.map((course) =>
        dispatch(
          putCourseInfoAsync({
            teacherId: teacherId,
            courseId: course.id,
            params: { name: course.name, price: course.price },
          })
        )
      );
      return await Promise.all(putPromises);
    }
  } catch (error) {
    console.log(error);
  }
};
