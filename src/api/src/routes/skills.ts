import createEndpoints from "../utils/genericEndpoint";
import skillsModel from "../models/skillsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const skills = createEndpoints(skillsModel, getProps, (req : any) => req.params.skillId);

export const getSkillsList = skills.getDocList;
export const createSkills = skills.postDoc;
export const getSkills = skills.getDoc;
export const patchSkills = skills.patchDoc;
export const deleteSkills = skills.deleteDoc;