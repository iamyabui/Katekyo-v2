export interface TeacherUser {
  id: string;
  category: string;
  consult: {
    chat: boolean;
    video: boolean;
  };
  detail: string;
  email: string;
  flag: string;
  name: string;
  status: boolean;
  subjects: string[];
  title: string;
  courses?: Courses;
}

export interface Course {
  id: string;
  name: string;
  price: number;
}

export type Courses = Course[];
