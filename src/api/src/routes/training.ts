import createEndpoints from "../utils/genericEndpoint";
import trainingsModel from "../models/trainingsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const trainings = createEndpoints(trainingsModel, getProps, (req : any) => req.params.trainingId);

export const getTrainingsList = trainings.getDocList;
export const createTrainings = trainings.postDoc;
export const getTrainings = trainings.getDoc;
export const patchTrainings = trainings.patchDoc;
export const deleteTrainings = trainings.deleteDoc;