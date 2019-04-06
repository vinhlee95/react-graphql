/**
 * Item component
 * Display information of a single item
 *
 * @author Vinh Le <lethanhvinh95@gmail.com>
 *
 */

import React from 'react'
import Link from 'next/link'

import Title from '../components/styles/Title'
import ItemStyles from '../components/styles/ItemStyles'
import PriceTag from '../components/styles/PriceTag'

export class Item extends React.Component {

	render() {
		const {
			id, description, title, price, image, largeImage
		} = this.props

		return(
			<ItemStyles>
				<Title>{title}</Title>
				<PriceTag>{price}</PriceTag>
				<p>{description}</p>
				{
					image ?
					<img src={image} width='100' height='100' />
					: null
				}
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id },
            }}
          >
            <a>Edit ✏️</a>
          </Link>
        </div>
			</ItemStyles>
		)
	}
}