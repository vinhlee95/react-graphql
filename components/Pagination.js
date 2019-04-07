import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
	}
`

class Pagination extends React.Component {

	render() {
		return(
			<Query
				query={PAGINATION_QUERY}
			>
				{({loading, error, data}) => {
					if(loading) { return <p>Loading...</p> }
					if(error) {
						console.log(error)
						return
					}

					// get total amount of items
					const {count} = data.itemsConnection.aggregate
					const pages = Math.ceil(count / perPage)
					const page = this.props.page

					return(
						<PaginationStyles>
							<Head>
								<title>
									SickFits - Page {page} of {pages}
								</title>
							</Head>
							<Link
								prefetch
								href={{
									pathname: 'shop',
									query: { page: page -1 }
								}}
							>
								<a className='prev' aria-disabled={page <=1}>Previous page</a>
							</Link>
							<Link
								prefetch
								href={{
									pathname: 'shop',
									query: { page: page + 1 }
								}}
							>
								<a className='prev' aria-disabled={page >= pages}>Next page</a>
							</Link>
						</PaginationStyles>
					)
				}}
			</Query>
		)
	}
}

export default Pagination