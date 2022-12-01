import createEndpoints from "../utils/genericEndpoint";
import projectsModel from "../models/projectsModel";
import {filterProps} from "../utils/helpers";

const getProps = (user : any) => {
    return filterProps(user, ["__v"], {_id: "id"});
}
const projects = createEndpoints(projectsModel, getProps, (req : any) => req.params.projectId);

export const getProjectsList = projects.getDocList;
export const createProjects = projects.postDoc;
export const getProjects = projects.getDoc;
export const patchProjects = projects.patchDoc;
export const deleteProjects = projects.deleteDoc;