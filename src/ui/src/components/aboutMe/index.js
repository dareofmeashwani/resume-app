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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AboutMe = () => {
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
	const [expanded, setExpanded] = React.useState(false);
	const handlePanelChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<Box
			sx={{
				marginLeft: "15%",
				marginRight: "15%",
				marginTop: "5%",
				marginBottom: "5%",
				alignContent: "left",
				textAlign: "left"
			}}
		>
			{Object.keys(data).map((key) => {
				if (Array.isArray(data[key].docs) && data[key].docs.length) {
					return (
						<Box key={key}>
							<Accordion
								style={{ marginTop: ".5rem", marginBottom: "0.5rem" }}
								expanded={expanded === "panel" + key}
								onChange={handlePanelChange("panel" + key)}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Typography sx={{ width: "33%", flexShrink: 0 }}>
										{capitalizeString(key)}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Box>
					);
				}
				return null;
			})}
		</Box>
	);
};

export default AboutMe;
