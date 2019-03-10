import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Meta from './Meta';
import Header from './Header';

const ChildrenContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background: lightgray;
`;

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
}

const StyledPage = styled.div`
  color: ${props => props.theme.black}
`

class Page extends Component {
  render() {
    return(
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <ChildrenContainer>
            {this.props.children}
          </ChildrenContainer>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;