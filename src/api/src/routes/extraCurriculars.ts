import createEndpoints from "../utils/genericEndpoint";
import extraCurricularsModel from "../models/extraCurricularsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const extraCurriculars = createEndpoints(extraCurricularsModel, getProps, (req : any) => req.params.extraCurricularId);

export const getExtraCurricularList = extraCurriculars.getDocList;
export const createExtraCurricular = extraCurriculars.postDoc;
export const getExtraCurricular = extraCurriculars.getDoc;
export const patchExtraCurricular = extraCurriculars.patchDoc;
export const deleteExtraCurricular = extraCurriculars.deleteDoc;
