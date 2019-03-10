import App, { Container } from 'next/app'
import Page from '../components/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

const style = {
  fontFamily: 'sans-serif',
}

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}
		if(Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		// expose the query to the user
		pageProps.query = ctx.query
		return { pageProps }
	}

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <div style={style}>
        <Container>
					<ApolloProvider client={apollo}>
						<Page>
							<Component {...pageProps} />
						</Page>
					</ApolloProvider>
        </Container>
      </div>
    );
  }
}

export default withData(MyApp)