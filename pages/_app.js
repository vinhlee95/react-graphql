import App, { Container } from 'next/app';
import Page from '../components/Page';

const style = {
  fontFamily: 'sans-serif',
}

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <div style={style}>
        <Container>
          <Page>
            <Component />
          </Page>
        </Container>
      </div>
    );  
  }
}

export default MyApp;