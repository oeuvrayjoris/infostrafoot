import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Background from '../img/novelli.jpg';

const boxSource = {
	beginDrag(props) {
		return {
			prenom: props.prenom,
			nom: props.nom,
            pseudo: props.pseudo
		}
	},
}
                                 
class Player extends Component {
  	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		prenom: PropTypes.string.isRequired,
        isDropped: PropTypes.bool.isRequired,
	}

	render() {
		const { prenom, nom, pseudo, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
            <div className="col-md-3">
                <div className="player" style={{ opacity }}>
                    <div className="photo2">
                        <div style={{ backgroundImage: `url(${Background})` }}></div>
                    </div>
                    <h4>{prenom} {nom}</h4>
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