import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import style from '../styles/sass/style.scss'

const boxTarget = {
	drop(props) {
		return { name: props.name }
	},
}

class Team extends Component {
    	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}

	render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver
        const { name } = this.props

		let backgroundColor = '#fff'
		if (isActive) {
			backgroundColor = style.color3
		} else if (canDrop) {
			backgroundColor = style.color4
		}

		return connectDropTarget(
            <div className="col-md-4 flexbox flex-column">
                <h3>{name}</h3>
                <div className="team flexbox" style={{ backgroundColor }}>
                    {isActive ? 'Relâcher pour ajouter le joueur' : 'Faites glisser un joueur ici'}
                </div>
            </div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(Team)


