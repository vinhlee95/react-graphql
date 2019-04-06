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
		$image: String
		$largeImage: String
	) {
		createItem(
			title: $title
			description: $description
			price: $price
			image: $image
			largeImage: $largeImage
		) {
			id
		}
	}
`

export class CreateItem extends React.Component {
	state = {
		item : {
			title: '',
			description: '',
			price: '',
			image: '',
			largeImage: '',
		},
		imageUploading: false,
		imageUploadingError: null,
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			item: {
				...this.state.item,
				[name]: value
			}
		})
	}

	handleCreateItem = (e, createItem) => {
		e.preventDefault()
		createItem({ variables: this.state.item })
	}

	handleUploadImage = async (e) => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'fitStore')
		this.setState({
			imageUploading: true,
		})

		try {
			const res = await fetch('https://api.cloudinary.com/v1_1/ds2t6ps9w/image/upload', {
				method: 'POST',
				body: data
			})

			const file = await res.json()
			if(!file) {
				this.setState({ imageUploadingError: 'There is something wrong' })
				return
			}

			const image = file.secure_url
			const largeImage = file.eager[0].secure_url
			this.setState({
				item: {
					...this.state.item,
					image,
					largeImage,
				},
				imageUploading: false,
			})

		} catch(error) {
			this.setState({ imageUploadingError: error, imageUploading: false })
		}

	}

	render() {
		const { item: {title, description, price, image}, imageUploading } = this.state;

		return(
			<Mutation
				mutation={CREATE_ITEM}
				variables={this.state.item}
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

								<label>Image</label>
								<input
									type='file'
									name='image'
									onChange={this.handleUploadImage}
								/>
								{
									imageUploading ?
									<p>Uploading...</p>
									: null
								}
								{
									image ?
									<img src={image} width='200' height='200' />
									: null
								}

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