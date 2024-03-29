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
import Grid from "@mui/material/Grid";
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
import { downloadContent, dateDif, groupDataByKey } from "../../utils";
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

function dateDiffFormat(diff, desired) {
    const depths = [{
        singular: "year",
        plural: "years",
        key: "years"
    }, {
        singular: "month",
        plural: "months",
        key: "months"
    }, {
        singular: "day",
        plural: "days",
        key: "days"
    }, {
        singular: "hour",
        plural: "hours",
        key: "hours"
    }, {
        singular: "minute",
        plural: "minutes",
        key: "minutes"
    }, {
        singular: "second",
        plural: "seconds",
        key: "seconds"
    }]
    const formatter = (keyMeta) => {
        if (diff[keyMeta.key] === 1) {
            return "1 " + getText(keyMeta.singular);
        } else if (diff[keyMeta.key] > 1) {
            return diff[keyMeta.key] + " " + getText(keyMeta.plural);
        }
        return "";
    }
    if (!desired) {
        desired = depths;
    } else {
        for (let i = 0; i < desired.length; i++) {
            desired[i] = depths.find(depth => depth.key === desired[i]);
        }
    }
    return desired.map(formatter).join(" ");
}
function urlify(text) {
    if (!text) {
        return "";
    }
    let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const matches = Array.from(text.matchAll(urlRegex), (m) => ({ url: m[0], start: m.index, end: m.index + m[0].length - 1 }));
    let stringParts = [];
    let pointer = 0;
    matches.forEach((match) => {
        stringParts.push({ type: "text", value: text.substring(pointer, match.start) })
        stringParts.push({ type: "link", value: text.substring(match.start, match.end + 1) })
        pointer = match.end + 1;
    });
    stringParts.push({ type: "text", value: text.substring(pointer, text.length) })
    return stringParts.filter((part) => !!part).map((part, index) => {
        if (part.type === "link") {
            return <Link href={part.value} target="_blank" key={index} sx={{
                wordWrap: "break-word",
                wordBreak: "break-word"
            }}>
                {part.value}
            </Link>;
        }
        return <Typography key={index} sx={{
            whiteSpace: "break-spaces",
            wordWrap: "break-word",
            wordBreak: "keep-all"
        }}>
            {part.value}
        </Typography>;
    })
}
function innerPanelContent(item, attibutes) {
    return attibutes.map((attribute, index) => {
        return item[attribute.key] ? <Typography key={index}> {getText(attribute.key) + " : "}{
            item[attribute.key]
        } </Typography> : null
    })
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

function getPosOrgHeader(data, dateFormat) {
    let diff = data.start && dateDif(data.start, data.end || Date.now())
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
            ((diff && dateFormat && dateDiffFormat(diff, dateFormat)) || "")
        } </Typography>
    </Box>
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
                    getPosOrgHeader(item, ["years", "months"])
                } </Box>
        }
        return <SAccordion key={
            item.id
        }>
            <SAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                {
                    getPosOrgHeader(item, ["years", "months"])
                } </SAccordionSummary>
            <SAccordionDetails>
                {innerPanelContent(item, [{ key: "team", text: "team" }, { key: "description", text: "description" }, { key: "techStack", text: "technicalStack" }])}
            </SAccordionDetails>
        </SAccordion>
    });
}

function getSkillsContent(dataItems) {
    const groupedData = groupDataByKey(dataItems, "group");
    const ungroupedItems = groupedData[""];
    delete groupedData[""];
    return <TableContainer>
        <Table>
            {
                Object.keys(groupedData).map(skillKey => {
                    const skills = groupedData[skillKey];
                    return <TableRow key={skillKey}>
                        <TableCell>{skillKey}</TableCell>
                        <TableCell>{skills.map(skill => {
                            return `${skill.name}${skill.experience ? ` (${skill.experience})` : ""}`
                        }).join(", ")}</TableCell></TableRow>;
                })
            }
            {
                ungroupedItems ? ungroupedItems.map(skill => <TableRow key={skill.id}>
                    <TableCell>
                        <Typography key={skill.id} fontWeight='fontWeightMedium' display='inline'>
                            {`${skill.name}${skill.experience ? ` (${skill.experience})` : ""}`}
                        </Typography>
                    </TableCell>
                </TableRow>
                ) : null
            }
        </Table>
    </TableContainer>;
}
function getProjectsContent(dataItems) {
    return dataItems.map(item => {
        let diff = item.start && dateDif(item.end || "", item.start)
        return <SAccordion key={
            item.id
        }>
            <SAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Box sx={
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }
                }>
                    <Typography> {
                        item.title
                    } </Typography>
                    <Typography> {
                        ((diff && dateDiffFormat(diff, ["years", "months", "days"])) || "")
                    } </Typography>
                </Box></SAccordionSummary>
            <SAccordionDetails>
                {innerPanelContent(item, [{ key: "area", text: "area" }, { key: "guidedBy", text: "guidedBy" }, { key: "description", text: "description" }, { key: "techStack", text: "technicalStack" }])}</SAccordionDetails>
        </SAccordion>
    });
}
function getTrainingsContent(dataItems) {
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
                    getPosOrgHeader(item, ["years", "months"])
                } </Box>
        }
        return <SAccordion key={
            item.id
        }>
            <SAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                {
                    getPosOrgHeader(item, ["years", "months"])
                } </SAccordionSummary>
            <SAccordionDetails> {
                item.team ? <Typography> {
                    item.team
                } </Typography> : null
            }
                {innerPanelContent(item, [{ key: "area", text: "area" }, { key: "description", text: "description" }, { key: "techStack", text: "technicalStack" }])}</SAccordionDetails>
        </SAccordion>
    });
}
function getResponsibilitiesContent(dataItems) {
    return dataItems.map(item => {
        if (!item.description && !item.area && !item.guidedBy) {
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
                    getPosOrgHeader(item, ["years", "months"])
                } </Box>
        }
        return <SAccordion key={
            item.id
        }>
            <SAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                {
                    getPosOrgHeader(item, ["years", "months"])
                } </SAccordionSummary>
            <SAccordionDetails> {
                item.team ? <Typography> {
                    item.team
                } </Typography> : null
            }
                {innerPanelContent(item, [{ key: "area", text: "area" }, { key: "guidedBy", text: "guidedBy" }, { key: "description", text: "description" }])}</SAccordionDetails>
        </SAccordion>
    });
}
function getExtraCurriContent(dataItems) {
    return <Box sx={
        {
            marginTop: "1rem",
            display: "grid",
            marginBottom: "1.5rem",
            marginLeft: "1rem",
            marginRight: "1rem"
        }
    }>
        {dataItems.map((item, index) => {
            return <Grid container key={item.id}>
                <Typography sx={{
                    whiteSpace: "break-spaces"
                }}>{(index + 1) + " : "}</Typography>{urlify(item.activity)}
            </Grid>
        })}
    </Box>;
}

const AboutMe = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => {
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
    const panels = [
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
            {panels} </Box>
    );
};

export default AboutMe;
