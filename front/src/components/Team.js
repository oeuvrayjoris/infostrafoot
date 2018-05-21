import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import style from '../styles/sass/style.scss'
import Background from '../img/novelli.jpg'
import Sword from '../img/sword.png'

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

    handleClick() {
        console.log('this is:', this);
    }

	render() {
		const { name, players, canDrop, isOver, id, connectDropTarget } = this.props
		const isActive = canDrop && isOver
        
		let backgroundColor = '#fff'
		if (isActive) {
			backgroundColor = style.color3
		} else if (canDrop) {
			backgroundColor = style.color6
		}
        
        let idName = 'team1'
        if(id === 2)
            idName = 'team2'
  
		return connectDropTarget(
            <div className="col-md-4 flexbox flex-column" id={idName}>
                <h3>{name}</h3>
                {players.map(({ id, firstname, lastname, username }, index) => (
                    <div className="row flexbox role" key={id}>
                        <div className="role-icon">
                            {
                                (idName === 'team1')
                                ?((index === 0)
                                    ? <img src={Sword} alt="sword" className="sword" />
                                    : <i className="fas fa-shield-alt fa-2x"></i>)
                                : ((index === 0)
                                    ? <i className="fas fa-shield-alt fa-2x"></i>
                                    : <img src={Sword} alt="sword" className="sword" />)
                            }
                        </div>
                        <div className="col-md-3">
                            <div className="photo3">
                                <div style={{ backgroundImage: `url(${Background})` }}></div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="left">
                                <h4>{firstname} {lastname}</h4>
                                <h5>@{username}</h5>
                            </div>
                            <a href="#" className="close" onClick={(e) => this.handleClick(e)}>&times;</a>
                        </div>
                    </div>
				))}
                { players.length < 2 &&
                <div className="role flexbox target" style={{ backgroundColor }}>
                        {isActive ? 'Relâcher pour ajouter le joueur' : 'Faites glisser un joueur ici'}
                </div>
                }
            </div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(Team)


