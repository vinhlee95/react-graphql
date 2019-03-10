/**
 * Create Item form
 *
 * @author Vinh Le <lethanhvinh95@gmail.com>
 *
 */

import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import Title from '../components/styles/Title'
import Form from '../components/styles/Form'
import ErrorMessage from './ErrorMessage'

// Create item mutation
const CREATE_ITEM = gql`
	mutation CREATE_ITEM(
		$title: String!
		$description: String!
		$price: Int!
	) {
		createItem(
			title: $title
			description: $description
			price: $price
		) {
			id
		}
	}
`

export class CreateItem extends React.Component {
	state = {
		title: '',
		description: '',
		price: '',
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}

	handleCreateItem = (e, createItem) => {
		e.preventDefault()
		createItem({ variables: this.state })
	}

	render() {
		const { title, description, price } = this.state;

		return(
			<Mutation
				mutation={CREATE_ITEM}
				variables={this.state}
			>
				{
					(createItem, { loading, error }) => (

						<Form>
							<ErrorMessage error={error} />

							<fieldset disabled={loading}>
								<Title>Sell an item</Title>
								<label>Title</label>
								<input
									type='text'
									name='title'
									value={title}
									onChange={this.handleChange}
									placeholder='Title'
								/>

								<label>Description</label>
								<input
									type='text'
									name='description'
									value={description}
									onChange={this.handleChange}
									placeholder='Description'
								/>

								<label>Price</label>
								<input
									type='text'
									name='price'
									value={price}
									onChange={this.handleChange}
									placeholder='Price'
								/>

								<button
									type='submit'
									onClick={(e) => this.handleCreateItem(e, createItem)}
								>
									Create item
								</button>
							</fieldset>
						</Form>
					)
				}
			</Mutation>
		)
	}
}