import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Background from '../img/novelli.jpg';

const boxSource = {
	beginDrag(props) {
		return {
			id: props.id,
			firstname: props.firstname,
			lastname: props.lastname,
			username: props.username,
			display: props.display
		}
	},
}
                                 
class Player extends Component {
  	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		firstname: PropTypes.string.isRequired,
		isDropped: PropTypes.bool.isRequired,
	}

	render() {
		const { firstname, lastname, username, display, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
            <div className="col-md-3" style={{ display: display }}>
                <div className="player" style={{ opacity }}>
                    <div className="photo2">
                        <div style={{ backgroundImage: `url(${Background})` }}></div>
                    </div>
                    <h4>{firstname} {lastname}</h4>
                    <h5>@{username}</h5>
                </div>
            </div>
        )
	}
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(Player);