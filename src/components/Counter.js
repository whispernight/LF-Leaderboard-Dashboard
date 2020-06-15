import React, { Component } from "react";
import AnimatedNumber from 'react-animated-number';

const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);


class Counter extends Component {
    static displayName = 'Demo'

    constructor(props) {
        super();

        this.state = {
            smallValue: 10,
            bigValue: 102422,
            updates: 2
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.update(), 2000);
        this.interval = setInterval(() => this.mountUnmount(), 20000);
    }

    update() {
        const { updates } = this.state;

        this.setState({
            smallValue: this.state.smallValue + getRandomInt(10, 1000),
            updates: updates + 1
        });
    }

    mountUnmount() {
        const { updates } = this.state;

        this.setState({
            smallValue: getRandomInt(10, 1000),
            updates: updates + 1
        });
    }
    render() {
        const { smallValue } = this.state;
        return <div>This is a counter
             <h4>
                <AnimatedNumber
                    style={{
                        transition: '0.8s ease-out',
                        fontSize: 48,
                        transitionProperty:
                            'background-color, color'
                    }}
                    frameStyle={perc => (
                        perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
                    )}
                    stepPrecision={0}
                    value={smallValue}
                    formatValue={n => this.props.text + this.props.symbol + `${n}`} />
            </h4>
            </div>;
    }
}

export default Counter; 
