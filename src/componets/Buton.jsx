import React from 'react'
import './Button.css'

export default props => {
    let elementClass = 'button '
    elementClass += props.operation ? 'operation' : ''
    elementClass += props.span2 ? 'span2' : ''
    elementClass += props.span3 ? 'span3' : ''
    return (
        <button
            onClick={e => props.click && props.click(props.label)}
            className={elementClass}>
            {props.label}
        </button>
    )
}