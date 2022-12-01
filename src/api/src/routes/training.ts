import createEndpoints from "../utils/genericEndpoint";
import trainingsModel from "../models/trainingsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const trainings = createEndpoints(trainingsModel, getProps, (req : any) => req.params.trainingId);

export const getTrainingList = trainings.getDocList;
export const createTraining = trainings.postDoc;
export const getTraining = trainings.getDoc;
export const patchTraining = trainings.patchDoc;
export const deleteTraining = trainings.deleteDoc;