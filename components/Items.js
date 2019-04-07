/**
 * Items component
 * Querying items from GraphQL
 *
 * @author Vinh Le <lethanhvinh95@gmail.com>
 *
 */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { perPage } from '../config'
import { Item } from './Item'
import Pagination from './Pagination'

const ALL_ITEMS_QUERY = gql`
	query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
			id
			title
			description
			price
			image
			largeImage
		}
	}
`

// Styling
const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export class Items extends React.Component {

	renderItem(item) {
		const {
			id, description, title, price, image, largeImage
		} = item;

		return(
			<Item
				key={id}
				id={id}
				description={description}
				title={title}
				price={price}
				image={image}
				largeImage={largeImage}
			/>
		)
	}
	render() {
		return(
			<Center>
				<Pagination page={this.props.page} />
				<Query
					query={ALL_ITEMS_QUERY}
					variables={{
						skip: this.props.page * perPage - perPage
					}}
				>
					{({loading, error, data}) => {
						if(loading) {
							return <p>Loading...</p>
						}

						if(error) {
							console.log('Error', error)
							return;
						}
						console.log('Items rendered', data.items)
						return(
							<ItemsList>
								{data.items.map(item => this.renderItem(item))}
							</ItemsList>
						)
					}}
				</Query>
			</Center>
		)
	}
}
