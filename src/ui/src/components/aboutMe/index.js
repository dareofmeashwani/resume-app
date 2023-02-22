import React from "react";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { getEducationsList } from "../../store/actions/educationsActions";
import { getExtraCurricularsList } from "../../store/actions/extraCurricularsActions";
import { getProjectsList } from "../../store/actions/projectsActions";
import { getResponsibilitiesList } from "../../store/actions/responsibilitiesActions";
import { getSkillsList } from "../../store/actions/skillsActions";
import { getTrainingsList } from "../../store/actions/trainingsActions";
import { getWorkExperiencesList } from "../../store/actions/workExperiencesActions";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeString, downloadContent, dateDif, groupDataByKey } from "../../utils";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getText from "../../messages";

const RESOURCE_NAME = {
    EDUCATIONS: "educations",
    WORK_EXP: "workExperiences",
    SKILLS: "skills",
    PROJECTS: "projects",
    TRAININGS: "trainings",
    RESPONSIBILITIES: "responsibilities",
    EXTRA_CURRI: "extraCurriculars"
}

const SAccordion = styled((props) => {
    return <Accordion disableGutters
        elevation={0}
        square
        {...props} />
})(({ theme }) => {
    return {
        border: `0px solid ${theme.palette.divider
            }`,
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        }
    }
});

const SAccordionSummary = styled((props) => (
    <AccordionSummary expandIcon={
        (
            <ArrowForwardIosSharpIcon sx={
                { fontSize: '0.9rem' }
            } />
        )
    }
        {...props} />
))(({ theme }) => {
    return {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)'
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1)
        }
    }
});

const SAccordionDetails = styled(AccordionDetails)(({ theme }) => {
    return { padding: theme.spacing(2), borderTop: '1px solid rgba(0, 0, 0, .125)' }
});

function formatYearMonth(diff) {
    let res = "";
    if (diff.years === 1) {
        res += "1 " + getText("year");
    } else if (diff.years > 1) {
        res += diff.years + " " + getText("years");
    }
    if (res) {
        res += " ";
    }
    if (diff.months === 1) {
        res += "1 " + getText("month");
    } else if (diff.months > 1) {
        res += diff.months + " " + getText("months");
    }
    return res
}

function getInnerPanelHeader(data) {
    let diff = data.start && dateDif(data.end || "", data.start)
    return <Box sx={
        {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
        }
    }>
        <Box sx={
            { display: 'flex' }
        }>
            <Typography marginRight={".5rem"}>
                {
                    data.organization
                } </Typography>
            <Typography marginRight={".5rem"}>-</Typography>
            <Typography> {
                data.position
            } </Typography>
        </Box>
        <Typography> {
            ((diff && formatYearMonth(diff)) || "")
        } </Typography>
    </Box>
}

function getEducationsContent(dataItems) {
    return <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{
                            getText('year')
                        }</TableCell>
                        <TableCell>{
                            getText("degreeProgramme")
                        }</TableCell>
                        <TableCell>{
                            getText("institute")
                        }</TableCell>
                        <TableCell>{
                            getText("cgpaMarks")
                        }</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody> {
                    dataItems.map((row) => {
                        return <TableRow key={
                            row.id
                        }>
                            <TableCell>{
                                new Date(row.end).getFullYear()
                            }</TableCell>
                            <TableCell>{
                                row.programme + (row.programmeArea ? "(" + row.programmeArea + ")" : "")
                            }</TableCell>
                            <TableCell>{
                                row.institute
                            }</TableCell>
                            <TableCell>{
                                row.gradingType === "cgpa" ? `${row.obtainedMarks
                                    }/${row.totalMarks
                                    }` : `${(row.obtainedMarks * 100 / row.totalMarks)
                                    }%`
                            }</TableCell>
                        </TableRow>
                    })
                } </TableBody>
            </Table>
        </TableContainer>
    </>;
}

function getWorkExpContent(dataItems) {
    return dataItems.map(item => {
        if (!item.description && !item.techStack && !item.team) {
            return <Box sx={
                {
                    display: 'flex',
                    marginTop: "1rem",
                    marginBottom: "1.5rem",
                    marginLeft: "2.35rem",
                    marginRight: "1rem"
                }
            }
                key={
                    item.id
                }>
                {
                    getInnerPanelHeader(item)
                } </Box>
        }
        return <SAccordion key={
            item.id
        }>
            <SAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                {
                    getInnerPanelHeader(item)
                } </SAccordionSummary>
            <SAccordionDetails> {
                item.team ? <Typography> {
                    item.team
                } </Typography> : null
            }
                {
                    item.description ? <Typography> {
                        item.description
                    } </Typography> : null
                }
                {
                    item.techStack ? <Typography> {
                        item.techStack
                    } </Typography> : null
                } </SAccordionDetails>
        </SAccordion>
    });
}

function getSkillsContent(dataItems) {
    const groupedData = groupDataByKey(dataItems, "group");
    const ungroupedItems = groupedData[""];
    delete groupedData[""];
    return <Box sx={
        {
            marginTop: "1rem",
            display: "grid",
            marginBottom: "1.5rem",
            marginLeft: "2.35rem",
            marginRight: "1rem"
        }
    }>
        {
            Object.keys(groupedData).map(skillKey => {
                const skills = groupedData[skillKey];
                return <Box key={skillKey} sx={
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }
                }>
                    <Typography> <Box fontWeight='fontWeightMedium' display='inline'> {
                        skillKey
                    }</Box> : {
                            skills.map(skill => {
                                return `${skill.name}${skill.experience ? ` (${skill.experience})` : ""}`
                            }).join(", ")
                        }</Typography>
                </Box>
            })
        }
        {ungroupedItems.map(skill => <Typography key={skill.id} fontWeight='fontWeightMedium' display='inline'>
            {`${skill.name}${skill.experience ? ` (${skill.experience})` : ""}`}
        </Typography>)}
    </Box>;
}
function getProjectsContent(dataItems) {
    return <></>;
}
function getTrainingsContent(dataItems) {
    return <></>;
}
function getResponsibilitiesContent(dataItems) {
    return <></>;
}
function urlify(text) {
    let urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text
/*
    "".matchAll
    return text(urlRegex, function (url) {

        return <Link href="#" color="inherit">
            {'color="inherit"'}
        </Link>
        //return '<a href="' + url + '">' + url + '</a>';
    });*/
}
function getExtraCurriContent(dataItems) {
    return <Box sx={
        {
            marginTop: "1rem",
            display: "grid",
            marginBottom: "1.5rem",
            marginLeft: "2.35rem",
            marginRight: "1rem"
        }
    }>
        {dataItems.map(item => {
            return <Typography>
                {urlify(item.activity)}
            </Typography>
        })}
    </Box>;
}

const AboutMe = () => {
    const dispatch = useDispatch();
    let data = useSelector((state) => {
        const data = {};
        if (state.educationsData.data) {
            data[RESOURCE_NAME.EDUCATIONS] = state.educationsData.data;
        }
        if (state.extracurricularsData.data) {
            data[RESOURCE_NAME.EXTRA_CURRI] = state.extracurricularsData.data;
        }
        if (state.projectsData.data) {
            data[RESOURCE_NAME.PROJECTS] = state.projectsData.data;
        }
        if (state.responsibilitiesData.data) {
            data[RESOURCE_NAME.RESPONSIBILITIES] = state.responsibilitiesData.data;
        }
        if (state.skillsData.data) {
            data[RESOURCE_NAME.SKILLS] = state.skillsData.data;
        }
        if (state.trainingsData.data) {
            data[RESOURCE_NAME.TRAININGS] = state.trainingsData.data;
        }
        if (state.workExperiencesData.data) {
            data[RESOURCE_NAME.WORK_EXP] = state.workExperiencesData.data;
        }
        return data;
    });
    React.useEffect(() => {
        if (!data[RESOURCE_NAME.EDUCATIONS]) {
            dispatch(getEducationsList());
        }
        if (!data[RESOURCE_NAME.EXTRA_CURRI]) {
            dispatch(getExtraCurricularsList());
        }
        if (!data[RESOURCE_NAME.PROJECTS]) {
            dispatch(getProjectsList());
        }
        if (!data[RESOURCE_NAME.RESPONSIBILITIES]) {
            dispatch(getResponsibilitiesList());
        }
        if (!data[RESOURCE_NAME.SKILLS]) {
            dispatch(getSkillsList());
        }
        if (!data[RESOURCE_NAME.TRAININGS]) {
            dispatch(getTrainingsList());
        }
        if (!data[RESOURCE_NAME.WORK_EXP]) {
            dispatch(getWorkExperiencesList());
        }
    }, []);
    const [expanded, setExpanded] = React.useState(false);
    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function getOuterPanel(key, leftTitle, content, rightTitle) {
        return <Box key={key}>
            <Accordion key={key}
                style={
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
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={
                        { justifyContent: "space-between" }
                    }>
                    <Typography> {leftTitle} </Typography>
                    {
                        rightTitle ? <Typography marginRight={"1rem"}>
                            {rightTitle} </Typography> : null
                    } </AccordionSummary>
                <AccordionDetails> {content} </AccordionDetails>
            </Accordion>
        </Box>
    }
    function buildPanel(resource) {
        const key = resource.key;
        const dataItems = resource.response.docs
        const title = resource.title;
        switch (key) {
            case RESOURCE_NAME.EDUCATIONS:
                return getOuterPanel(key, title, getEducationsContent(dataItems));
            case RESOURCE_NAME.WORK_EXP:
                return getOuterPanel(key, title, getWorkExpContent(dataItems));
            case RESOURCE_NAME.SKILLS:
                return getOuterPanel(key, title, getSkillsContent(dataItems));
            case RESOURCE_NAME.PROJECTS:
                return getOuterPanel(key, title, getProjectsContent(dataItems));
            case RESOURCE_NAME.TRAININGS:
                return getOuterPanel(key, title, getTrainingsContent(dataItems));
            case RESOURCE_NAME.RESPONSIBILITIES:
                return getOuterPanel(key, title, getResponsibilitiesContent(dataItems));
            case RESOURCE_NAME.EXTRA_CURRI:
                return getOuterPanel(key, title, getExtraCurriContent(dataItems));
        }
    }
    data = [
        RESOURCE_NAME.EDUCATIONS,
        RESOURCE_NAME.WORK_EXP,
        RESOURCE_NAME.SKILLS,
        RESOURCE_NAME.PROJECTS,
        RESOURCE_NAME.TRAININGS,
        RESOURCE_NAME.RESPONSIBILITIES,
        RESOURCE_NAME.EXTRA_CURRI,
    ].map((resourceType) => ({ title: getText(resourceType), response: data[resourceType], key: resourceType })).filter((resource) => {
        return resource.response && Array.isArray(resource.response.docs) && resource.response.docs.length
    }).map((resource) => buildPanel(resource));
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
            <Box sx={
                { textAlign: "end" }
            }>
                <Button variant="contained" color="success"
                    onClick={
                        () => {
                            downloadContent('/api/v1/downloads/Ashwani_Kumar_Verma.pdf')
                        }
                    }>
                    {
                        getText("export")
                    } </Button>
            </Box>
            {data} </Box>
    );
};

export default AboutMe;
