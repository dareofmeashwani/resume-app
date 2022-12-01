import createEndpoints from "../utils/genericEndpoint";
import skillsModel from "../models/skillsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const skills = createEndpoints(skillsModel, getProps, (req : any) => req.params.skillId);

export const getSkillList = skills.getDocList;
export const createSkill = skills.postDoc;
export const getSkill = skills.getDoc;
export const patchSkill = skills.patchDoc;
export const deleteSkill = skills.deleteDoc;