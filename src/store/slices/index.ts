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
