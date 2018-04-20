import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import style from '../styles/sass/style.scss'

const boxTarget = {
    drop(props, monitor) {
		props.onDrop(monitor.getItem())
	},
}

class Team extends Component {
    	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
        players: PropTypes.array,
		onDrop: PropTypes.func.isRequired,
	}

	render() {
		const { name, players, canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#fff'
		if (isActive) {
			backgroundColor = style.color3
		} else if (canDrop) {
			backgroundColor = style.color4
		}

		return connectDropTarget(
            <div className="col-md-4 flexbox flex-column">
                <h3>{name}</h3>
                {players.map(({ prenom, nom, pseudo }, index) => (
				    <div className="role flexbox" key={pseudo}>
                        {prenom}
                    </div>
				))}
                <div className="role flexbox" style={{ backgroundColor }}>
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


