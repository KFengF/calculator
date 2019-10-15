import React from 'react';

class Button extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', event => {
            let { button, buttonFunction } = this.props;
            if ( event.key === 'Backspace' && button === '<-' ) { button = 'Backspace' };
            if ( event.key === '*' && button === 'x' ) { button = '*' };
            if ( event.key === 'c' && button === 'C' ) { button = 'c' };
            if ( event.key === 'Enter' && button === '=' ) { button = 'Enter' }
            if ( event.key === button.toString() ) buttonFunction(event) ;
        })
    }

    render() {
        const { button, buttonFunction } = this.props;
        return (
            <input type="button" id={ button } onClick={ buttonFunction }
            defaultValue={ button } className="Button" />
        )
    }
}

export default Button;