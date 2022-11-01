import React from 'react';
import styled from "styled-components";
import UploadFile from '../utils/UploadFile';

const Container = styled.div`
    margin-top: 20px;
    flex-grow: 1;
`;

const Header = styled.header`
    padding: 8px;
    margin-left: auto;
    margin-right: auto;
    font-family: Calibri;
`;

const Section = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

const HomePage = () => {
   
    return (
        <>
            <Container>
                <Header>
                </Header>
                <Section>
                    <UploadFile />
                </Section>
            </Container>
        </>
    )
};

export default HomePage;