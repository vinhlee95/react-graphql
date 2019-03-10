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

import { Item } from './Item'

const ALL_ITEMS_QUERY = gql`
	query ALL_ITEMS_QUERY {
		items {
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
				<Query query={ALL_ITEMS_QUERY}>
					{({loading, error, data}) => {
						if(loading) {
							return <p>Loading...</p>
						}

						if(error) {
							console.log('Error', error)
							return;
						}

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
