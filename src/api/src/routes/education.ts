import createEndpoints from "../utils/genericEndpoint";
import educationsModel from "../models/educationsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const education = createEndpoints(educationsModel, getProps, (req : any) => req.params.educationId);
export const getEducationList = education.getDocList;
export const createEducation = education.postDoc;
export const getEducation = education.getDoc;
export const patchEducation = education.patchDoc;
export const deleteEducation = education.deleteDoc;
