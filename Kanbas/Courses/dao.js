import CourseModel from "./model.js";

export const findAllCourses = () => CourseModel.find();

export const findCourseById = (courseId) => CourseModel.findById(courseId);

export const createCourse = async (course) => {
  return CourseModel.create(course);
};

export const updateCourse = (courseId, course) => 
  CourseModel.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = async (courseId) => {
  return CourseModel.deleteOne({ _id: courseId });
};
