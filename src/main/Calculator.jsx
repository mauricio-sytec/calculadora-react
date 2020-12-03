import React, {Component} from 'react'
import Button from '../componets/Buton'
import Display from '../componets/Display'
import './Calculator.css'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.setDigit = this.setDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {

        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try {
                let firstValue = parseFloat(values[0])
                let secondValue = parseFloat(values[1])
                switch(currentOperation) {
                    case '+':
                        values[0] = firstValue + secondValue
                        break
                    case '-':
                        values[0] = firstValue - secondValue
                        break
                    case '*':
                        values[0] = firstValue * secondValue
                        break
                    case '/':
                        values[0] = firstValue / secondValue
                        break
                    default:
                        break
                }
            } catch(error) {
                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    setDigit(digit) {
        if(digit === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const curretValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = curretValue + digit
        this.setState({ displayValue, clearDisplay: false })
        if(digit !== '.') {
            const index = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[index] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} span3 />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.setDigit} />
                <Button label="8" click={this.setDigit} />
                <Button label="9" click={this.setDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.setDigit} />
                <Button label="5" click={this.setDigit} />
                <Button label="6" click={this.setDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.setDigit} />
                <Button label="2" click={this.setDigit} />
                <Button label="3" click={this.setDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.setDigit} span2 />
                <Button label="." click={this.setDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}