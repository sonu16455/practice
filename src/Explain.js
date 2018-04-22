import React from 'react';
import ReactDOM from 'react'

class Explain extends React.Component{
    constructor(){
        super();
        this.onClickMe = this.onClickMe.bind(this);
    }
onClickMe(){
    console.log(this);
}
render(){
    return(
        <button onClick = {this.onClickMe} type = "button">
        Click Me
        </button>
    )
}
}

export default Explain