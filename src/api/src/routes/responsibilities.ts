import createEndpoints from "../utils/genericEndpoint";
import responsibilitiesModel from "../models/responsibilitiesModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const responsibilities = createEndpoints(responsibilitiesModel, getProps, (req : any) => req.params.responsibilityId);

export const getResponsibilityList = responsibilities.getDocList;
export const createResponsibility = responsibilities.postDoc;
export const getResponsibility = responsibilities.getDoc;
export const patchResponsibility = responsibilities.patchDoc;
export const deleteResponsibility = responsibilities.deleteDoc;