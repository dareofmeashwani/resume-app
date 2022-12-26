import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const MainLayout = (props) => {
    const site = useSelector(state => state.site )
    return(
        <Container>
            {props.children}
            <ToastContainer/>
        </Container>
    )
}

export default MainLayout;