import { combineReducers } from "redux";
import userData from "./userReducer";
import notificationData from "./notificationReducer";
import busyIndicatorData from "./busyIndicatorReducer";
import queryData from "./queryReducer";
import downloadsData from "./downloadsReducer";
import imagesData from "./imagesReducer";
import educationsData from "./educationsReducer";
import extracurricularsData from "./extracurricularsReducer";
import projectsData from "./projectsReducer";
import responsibilitiesData from "./responsibilitiesReducer";
import skillsData from "./skillsReducer";
import trainingsData from "./trainingsReducer";
import workExperiencesData from "./workExperiencesReducer";

const appReducers = combineReducers({
	userData,
	notificationData,
	busyIndicatorData,
	queryData,
	downloadsData,
	imagesData,
	educationsData,
	extracurricularsData,
	projectsData,
	responsibilitiesData,
	skillsData,
	trainingsData,
	workExperiencesData
});

export default appReducers;
