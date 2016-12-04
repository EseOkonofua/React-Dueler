import React, {Component} from 'react'
export default class Card extends Component {

    getClassName(){
        let className = 'card';
        if(this.props.win !== null && this.props.win === true)  className += ' win';
        if(this.props.win !== null && this.props.win === false) className += ' lose';
        if(this.props.active) className += ' hover';
        if(this.props.selected) className += ' selected';
        return className
    }

    render(){
        return(
            <div onClick= {this.props.onClick}  className = {this.getClassName() }>
                <img src={this.props.img}/>
                <h3>{this.props.title}</h3>
                <div id="desc">{this.props.description}</div>
            </div>
        )

    }
}

Card.propTypes = {
    img:React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.node.isRequired,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    win: React.PropTypes.bool
}
