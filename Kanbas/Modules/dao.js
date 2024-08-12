import ModuleModel from "./model.js";
import axios from 'axios';

export const findAllModules = () => ModuleModel.find();

export const findModuleById = (moduleId) => ModuleModel.findById(moduleId);

export const findModulesByCourseId = (courseId) => ModuleModel.find({ course: courseId });  

// Create a new module
export const createModule = async (courseId, moduleData) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/modules`, moduleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating module via Axios:", error.message, error.response?.data);
      throw error;
    }
  };

export const updateModule = (moduleId, module) => 
  ModuleModel.updateOne({ _id: moduleId }, { $set: module });

export const deleteModule = async (moduleId) => {
  return ModuleModel.deleteOne({ _id: moduleId });
};
