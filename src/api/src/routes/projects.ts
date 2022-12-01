import createEndpoints from "../utils/genericEndpoint";
import projectsModel from "../models/projectsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const projects = createEndpoints(projectsModel, getProps, (req : any) => req.params.projectId);

export const getProjectList = projects.getDocList;
export const createProject = projects.postDoc;
export const getProject = projects.getDoc;
export const patchProject = projects.patchDoc;
export const deleteProject = projects.deleteDoc;