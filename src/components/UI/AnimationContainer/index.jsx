/* Basic */
import React from "react";
/* Components */
import {
    Paper,
    Typography
} from "@material-ui/core";
/* Styles */
import styled from 'styled-components';
const Container = styled(Paper)`
    border: 1px solid ${props => props.color};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;
const Header = styled.div`
    
`;
const Title = styled(Typography)`
    margin-bottom: 15px;
`;
const Description = styled(Typography)`
    margin-bottom: 15px;
`;
const Content = styled.div`
    
`;

const AnimationContainer = ({title, description, children, projectColor, ...other}) => {
    return (
        <Container color={projectColor}>
            <Header>
                <Title component="h1" variant="h5" className="typography">
                    {title}
                </Title>
                <Description component="p" className="typography">
                    {description}
                </Description>
            </Header>
            <Content>
                {children}
            </Content>
        </Container>
    );
};

export default AnimationContainer;
