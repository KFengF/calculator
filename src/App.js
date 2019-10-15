/* eslint no-eval: 0 */
//Deshabilitando el eslint para poder usar eval()
//Es la primera vez que veo que un comentario puede deshabilitar algo

import React from 'react';
import Button from './Button';

const initialState = {
    display: '0',
    calculation: ''
}

class App extends React.Component {
    constructor() {
        super();
        this.state = initialState;

        this.buttons = [
            'C', '<-', '/', 'x', 7, 8, 9, '-', 4, 5, 6,
            '+', 1, 2, 3, '=', 0, '.'
        ];
    }

    setNumber (value) {
        const { calculation, display } = this.state;
        this.setState(prevState => {
            return { calculation: prevState.calculation + value }
        });

        if(display.length < 12){ //Verificar si el dispaly no esta full
            
            isNaN(calculation[calculation.length - 1]) && //isNaN da true si no es un numero
            calculation[calculation.length - 1] !== 0  &&
            calculation[calculation.length - 1] !== '.' ? 
            
            this.setState({ display: value }) :
            this.setState(prevState => {
                return { display: prevState.display + value.toString() }
            });
        } else {
            const temporal = display;
            this.setState({ display: 'Display Full' }, () => setTimeout(() => {
                this.setState({ display: temporal });
            }, 2000));
        }
    }

    onNumber = event => {
        if (event.type === 'click') this.setNumber(event.target.value)
        if (event.key) this.setNumber(event.key)
    }

    setOperator (operator) {
        const { calculation, display } = this.state;
        if ( !isNaN(calculation[calculation.length - 1]) ) {
            this.setState({ display: eval(calculation).toString() }, () => {
                //eval() sirve para operar string de operaciones
                this.setState(prevState => {
                    return { calculation: eval(prevState.calculation) + operator }
                });
            });
        }else {
            const temporal = display;
            this.setState({ display: 'Syntax Error' }, () => setTimeout(() => {
                this.setState({ display: temporal });
            }, 2000));
        }
    }

    onOperator = {
        'C': () => this.setState(initialState),

        '<-': () => {
            const { display, calculation } = this.state;
            //Primero verificar si hay un numero en el display para borrar el ultimo digito
            if (display.length > 1) {
                this.setState(prevState => {
                    const { display } = prevState;
                    return { display: display.substring(0, display.length - 1).toString() }
                }, 
                //Segundo verificar si el ultimo caracter es un numero para borrarlo
                () => !isNaN(calculation[calculation.length - 1]) ?
                this.setState(prevState => {
                    const { calculation } = prevState;
                    return { calculation: calculation.substring(0, calculation.length - 1) }
                }) : null)
            } else { //Para que al borrar el ultimo digito este se quede en 0
                this.setState(prevState => {
                    const { calculation } = prevState;
                    return {
                        display: '0',
                        calculation: calculation.substring(0, calculation.length - 1)
                    }
                })
            }
        },

        '/': () => this.setOperator('/'),

        'x': () => this.setOperator('*'),

        '-': () => this.setOperator('-'),

        '+': () => this.setOperator('+'),

        '=': () => this.setState({ display: eval(this.state.calculation).toString() }, () => {
            this.setState({ calculation: '' })
        }),

        '.': () => {
            const { calculation, display } = this.state;
            //Regex de . para verificar si ya hay en el display
            if( !/\./.test(display) ) {
                isNaN(calculation[calculation.length - 1]) || display === '0' ?
                this.setState(prevState => {
                    return {
                        display: '0.',
                        calculation: prevState.calculation + '0.'
                    }
                }) : 
                this.setState(prevState => {
                    return {
                        display: prevState.display + '.',
                        calculation: prevState.calculation + '.'
                    }
                });
            }
        }
    }

    render() {
        return(
            <div id="App">
                <h1>Simple Calculator</h1>
                <div className="container" >
                    <h2>{ this.state.display }</h2>
                    <div className="buttons-container" >
                        { this.buttons.map((button, i) => {
                            return typeof button === 'number' ?
                            <Button key={ i } buttonFunction={ this.onNumber } button={ button } />:
                            <Button key={ i } buttonFunction={ this.onOperator[button] } button={ button } />
                        })}
                    </div>
                </div>
                <div className="bottom" />
            </div>
        );
    }
}

export default App;
