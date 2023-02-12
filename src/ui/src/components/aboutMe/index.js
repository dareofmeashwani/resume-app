import React from "react";
import Box from "@mui/material/Box";
import { getEducationsList } from "../../store/actions/educationsActions";
import { getExtraCurricularsList } from "../../store/actions/extraCurricularsActions";
import { getProjectsList } from "../../store/actions/projectsActions";
import { getResponsibilitiesList } from "../../store/actions/responsibilitiesActions";
import { getSkillsList } from "../../store/actions/skillsActions";
import { getTrainingsList } from "../../store/actions/trainingsActions";
import { getWorkExperiencesList } from "../../store/actions/workExperiencesActions";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeString } from "../../utils";
const AboutMe = (props) => {
	const dispatch = useDispatch();
	const data = useSelector((state) => {
		const data = {};
		if (state.educationsData.data) {
			data.educations = state.educationsData.data;
		}
		if (state.extracurricularsData.data) {
			data.extracurriculars = state.extracurricularsData.data;
		}
		if (state.projectsData.data) {
			data.projects = state.projectsData.data;
		}
		if (state.responsibilitiesData.data) {
			data.responsibilities = state.responsibilitiesData.data;
		}
		if (state.skillsData.data) {
			data.skills = state.skillsData.data;
		}
		if (state.trainingsData.data) {
			data.trainings = state.trainingsData.data;
		}
		if (state.workExperiencesData.data) {
			data.workExperiences = state.workExperiencesData.data;
		}
		return data;
	});
	React.useEffect(() => {
		if (!data.educations) {
			dispatch(getEducationsList());
		}
		if (!data.extracurriculars) {
			dispatch(getExtraCurricularsList());
		}
		if (!data.projects) {
			dispatch(getProjectsList());
		}
		if (!data.responsibilities) {
			dispatch(getResponsibilitiesList());
		}
		if (!data.skills) {
			dispatch(getSkillsList());
		}
		if (!data.trainings) {
			dispatch(getTrainingsList());
		}
		if (!data.workExperiences) {
			dispatch(getWorkExperiencesList());
		}
	}, []);
	return (
		<Box
			sx={{
				marginLeft: "20%",
				marginRight: "20%",
				marginTop: "5%",
				marginBottom: "5%",
				alignContent: "left",
				textAlign: "left"
			}}
		>
			{Object.keys(data).map((key) => {
				const title = capitalizeString(key);
				return title
			})}
		</Box>
	);
};

export default AboutMe;
