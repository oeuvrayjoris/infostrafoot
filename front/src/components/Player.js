import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Background from '../img/novelli.jpg';

const boxSource = {
	beginDrag(props) {
		return {
			prenom: props.prenom,
            pseudo: props.pseudo
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			alert(`Vous avez ajouté ${item.prenom} dans ${dropResult.name} !`) // eslint-disable-line no-alert
		}
	},
}
                                 
class Player extends Component {
  	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	}

	render() {
		const { isDragging, connectDragSource } = this.props
		const { prenom } = this.props
		const { pseudo } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
            <div className="col-md-3">
                <div className="flexbox flex-column player" style={{ opacity }}>
                    <div className="photo2">
                        <div style={{ backgroundImage: `url(${Background})` }}></div>
                    </div>
                    <h4>{prenom}</h4>
                    <h5>@{pseudo}</h5>
                </div>
            </div>
        )
	}
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(Player);