export { default as personalInfoReducer } from './profile-info';
export { updateProfile, resetProfile, selectProfileInfo } from './profile-info';

export { default as skillsReducer } from './skills';
export { setSkills, addSkill, removeSkill, selectSkills } from './skills';

export { default as educationReducer } from './education';
export {
  addEducation,
  setEducations,
  educationSlice,
  updateEducation,
  removeEducation,
  selectEducations,
} from './education';

export { default as experienceReducer } from './experience';
export {
  addExperience,
  setExperiences,
  updateExperience,
  removeExperience,
  selectExperiences,
} from './experience';

export { default as projectReducer } from './project';
export { addProject, setProjects, updateProject, removeProject, selectProjects } from './project';

export { default as userDetailsReducer } from './user-details';
export { setUserDetails, setLoading, setError } from './user-details';