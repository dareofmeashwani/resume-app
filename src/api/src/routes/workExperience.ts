import createEndpoints from "../utils/genericEndpoint"
import WorkExperience from "../models/workExperiencesModel"
import {filterProps} from "../utils/helpers";

const workExperience = createEndpoints(WorkExperience, (props : any) => {
    return filterProps(props, ["__v"], {_id: "id"});
}, (req : any) => req.params.workExperienceId);

export const getWorkExperienceList = workExperience.getDocList;
export const createWorkExperience = workExperience.postDoc;
export const getWorkExperience = workExperience.getDoc;
export const patchWorkExperience = workExperience.patchDoc;
export const deleteWorkExperience = workExperience.deleteDoc;