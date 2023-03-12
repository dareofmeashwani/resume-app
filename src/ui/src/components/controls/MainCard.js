import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from "@mui/material/Box";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// project import
//import Highlighter from './third-party/Highlighter';

// header style
const headerSX = {
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            darkTitle,
            divider = true,
            elevation,
            secondary,
            shadow,
            sx = {},
            title,
            actions,
            codeHighlight,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    ...sx,
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                    boxShadow: 'inherit',
                    ':hover': {
                        boxShadow: 'inherit'
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem'
                    }
                }}
            >
                {/* card header and action */}
                <Box sx={{
                    marginLeft: "2rem",
                    marginRight: "3rem",
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    {!darkTitle && title && (
                        <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'h6' }} title={title} action={secondary} />
                    )}
                    {darkTitle && title && (
                        <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                    )}
                    {actions ? <Box sx={{
                        alignContent: "center",
                        textAlign: "center",
                        alignSelf: "center"
                    }}>{actions}</Box> : null}
                </Box>

                {/* content & header divider */}
                {title && divider && <Divider />}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}

                {/* card footer - clipboard & highlighter  */}
                {codeHighlight && (
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />

                        {children}

                    </>
                )}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    divider: PropTypes.bool,
    elevation: PropTypes.number,
    secondary: PropTypes.node,
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.string,
    codeHighlight: PropTypes.bool,
    content: PropTypes.bool,
    children: PropTypes.node,
    actions: PropTypes.node,
};

export default MainCard;
