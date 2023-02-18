import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {getEducationsList} from "../../store/actions/educationsActions";
import {getExtraCurricularsList} from "../../store/actions/extraCurricularsActions";
import {getProjectsList} from "../../store/actions/projectsActions";
import {getResponsibilitiesList} from "../../store/actions/responsibilitiesActions";
import {getSkillsList} from "../../store/actions/skillsActions";
import {getTrainingsList} from "../../store/actions/trainingsActions";
import {getWorkExperiencesList} from "../../store/actions/workExperiencesActions";
import {useDispatch, useSelector} from "react-redux";
import {capitalizeString, downloadContent} from "../../utils";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getText from "../../messages";

function generateInnerPanel(document) {
    (
        <Accordion key={
            document.key
        }>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={
                    {flexShrink: 0}
                }>
                    {
                    capitalizeString(document.title)
                } </Typography>
            </AccordionSummary>
            <AccordionDetails> {
                document.detail
            } </AccordionDetails>
        </Accordion>
    )
}

function getPanelContent(key, dataItems) {
    switch (key) {
        case "educations":
            return <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{getText('year')}</TableCell>
                            <TableCell>{getText("degreeProgramme")}</TableCell>
                            <TableCell>{getText("institute")}</TableCell>
                            <TableCell>{getText("cgpaMarks")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> {
                        dataItems.map((row) => {
                            return <TableRow key={
                                row.id
                            } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{
                                    new Date(row.end).getFullYear()
                                }</TableCell>
                                <TableCell>{
                                    row.programme + (row.programmeArea?"("+row.programmeArea + ")":"") 
                                }</TableCell>
                                <TableCell>{
                                    row.institute
                                }</TableCell>
                                <TableCell>{
                                    row.gradingType === "cgpa" ? `${
                                        row.obtainedMarks
                                    }/${
                                        row.totalMarks
                                    }` : `${row.obtainedMarks*100/row.totalMarks}%`
                                }</TableCell>
                            </TableRow>
                    })
                    } </TableBody>
                </Table>
            </TableContainer>;
            /*case "extraCurriculars": response.title = data.title;
                                break;
                            case "projects": response.title = data.title;
                                break;
                            case "responsibilities": response.title = data.position + " " + data.organization;
                                break;
                            case "skills": response.title = data.title;
                                break;
                            case "trainings": response.title = data.position + " " + data.organization;
                                break;
                            case "workExperiences": response.title = data.position + " " + data.organization;
                                break;*/
    }
    return <Typography> {
        JSON.stringify(dataItems)
    } </Typography>;
}

const AboutMe = () => {
    const dispatch = useDispatch();
    let data = useSelector((state) => {
        const data = {};
        if (state.educationsData.data) {
            data.educations = state.educationsData.data;
        }
        if (state.extracurricularsData.data) {
            data.extraCurriculars = state.extracurricularsData.data;
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
        if (! data.educations) {
            dispatch(getEducationsList());
        }
        if (! data.extraCurriculars) {
            dispatch(getExtraCurricularsList());
        }
        if (! data.projects) {
            dispatch(getProjectsList());
        }
        if (! data.responsibilities) {
            dispatch(getResponsibilitiesList());
        }
        if (! data.skills) {
            dispatch(getSkillsList());
        }
        if (! data.trainings) {
            dispatch(getTrainingsList());
        }
        if (! data.workExperiences) {
            dispatch(getWorkExperiencesList());
        }
    }, []);
    const [expanded, setExpanded] = React.useState(false);
    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    data = [
        "educations",
        "workExperiences",
        "skills",
        "projects",
        "trainings",
        "responsibilities",
        "extraCurriculars"
    ].map((resourceType) => ({title: getText(resourceType), response: data[resourceType], key: resourceType})).filter((item) => !!item.response);
    return (
        <Box sx={
            {
                marginLeft: "15%",
                marginRight: "15%",
                marginTop: "5%",
                marginBottom: "5%",
                alignContent: "left",
                textAlign: "left"
            }
        }>
            <Box sx={{textAlign: "end"}}>
                <Button variant="contained" color="success" onClick={
                    ()=>{downloadContent('/api/v1/downloads/Ashwani_Kumar_Verma.pdf')}
                }>
                    {getText("export")}
                </Button>
            </Box>
            {
            data.map((resource) => {
                const docs = resource.response.docs;
                const key = resource.key;
                if (Array.isArray(docs) && docs.length) {
                    return (
                        <Box key={key}>
                            <Accordion style={
                                    {
                                        marginTop: ".5rem",
                                        marginBottom: "0.5rem"
                                    }
                                }
                                expanded={
                                    expanded === "panel" + key
                                }
                                onChange={
                                    handlePanelChange("panel" + key)
                            }>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Typography sx={
                                        {
                                            width: "33%",
                                            flexShrink: 0
                                        }
                                    }>
                                        {
                                        resource.title
                                    } </Typography>
                                </AccordionSummary>
                                <AccordionDetails> {
                                    getPanelContent(key, docs)
                                } </AccordionDetails>
                            </Accordion>
                        </Box>
                    );
                }
                return null;
            })
        } </Box>
    );
};

export default AboutMe;
