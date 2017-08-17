import React, { Component } from 'react';
import './App.css';

const style = {
  button_small :{
    width : '80px',
    height : '50px',
    border : '#ececec 1px solid',
    fontSize : '20px',
  },
  button_big :{
    width : '160px',
    height : '50px',
    border : '#ededed 1px solid',
    fontSize : '20px',
  },
  displaybox :{
    width : '320px',
    height : '50px',
    fontSize : '25px',
    paddingLeft : '10px',
    paddingRight : '10px',
    textAlign : 'right',
    border : '#ededed 1px solid',
  },
  title :{
    width : '320px',
    textAlign : 'center',
  },
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      calcChain : "",
      lastChain : "",
    }
    this.calculateChain = this.calculateChain.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.backspace = this.backspace.bind(this);
    this.numberPressed = this.numberPressed.bind(this);
    this.operatorPressed = this.operatorPressed.bind(this);
    this.decimalPressed = this.decimalPressed.bind(this);
  }


  operatorPressed(event){
    let lastChain_i, calcChain_i;

    lastChain_i = event.target.innerHTML;

    calcChain_i = !isNaN(this.state.lastChain) 
    ? `${this.state.calcChain}${event.target.innerHTML}` 
    : this.state.calcChain.replace(/.$/,lastChain_i);

    this.setState({
      calcChain : calcChain_i,
      lastChain : lastChain_i,
    });
  }


  decimalPressed(){
    let lastChain_i, calcChain_i;
    lastChain_i = this.state.lastChain;
    calcChain_i = this.state.calcChain;

    calcChain_i = lastChain_i.includes(".") || ( !isNaN(calcChain_i) && (calcChain_i.match(/\./g)||"").length == 1)
    ? calcChain_i 
    : `${calcChain_i}.`;

    lastChain_i = lastChain_i.includes(".")
    ? lastChain_i 
    : `${lastChain_i}.`;

    this.setState({
      calcChain : calcChain_i,
      lastChain : lastChain_i
    });

  }

  numberPressed(event){
    let lastChain_i, calcChain_i;

    lastChain_i = this.state.lastChain;
    calcChain_i = this.state.calcChain;
    
    if (!(event.target.innerHTML == "0" && isNaN(calcChain_i) && this.state.lastChain == "0")){       
      // check case : after press CE
      calcChain_i = this.state.calcChain == "0" 
                    ? event.target.innerHTML 
                    : `${this.state.calcChain}${event.target.innerHTML}`;

      lastChain_i = isNaN(lastChain_i) || lastChain_i == "0" 
                    ? "" 
                    : lastChain_i;
      lastChain_i =  `${lastChain_i}${event.target.innerHTML}`;
    }

    this.setState({
      calcChain : calcChain_i,
      lastChain : lastChain_i
    });
  }

  clearAll(){
    this.setState({
      calcChain : "0",
      lastChain : "0",
    });
  }

  backspace(){
    let lastChain_i, calcChain_i;
    calcChain_i = this.state.calcChain;
    lastChain_i = this.state.lastChain;

    calcChain_i = calcChain_i.substr(0, calcChain_i.length - 1);
    lastChain_i = lastChain_i.substr(0, lastChain_i.length - 1);

    if (calcChain_i == "") {
        calcChain_i = "0"; 
        lastChain_i = "0"; 
    }

    this.setState({
      calcChain : calcChain_i,
      lastChain : lastChain_i
    }); 
  }

  calculateChain(){
    if (!isNaN(this.state.lastChain)){
      this.setState({
        calcChain : eval(this.state.calcChain).toString(),
        lastChain : eval(this.state.calcChain).toString()
      });
    }
  }

  render(){
    return (
      <div className="container text-center">
        <div className="row">
          <h2>{this.props.title}</h2>
        </div>
        <div className="row">
          <DisplayBox style={style.displaybox} calcChain={this.state.calcChain}/>
        </div>
        <div className="row">
          <Buttonku onClick={this.clearAll} style={style.button_small}>CE</Buttonku>
          <Buttonku onClick={this.backspace} style={style.button_small}>{`<<`}</Buttonku>
          <Buttonku onClick={this.operatorPressed} style={style.button_small}>+</Buttonku>
          <Buttonku onClick={this.operatorPressed} style={style.button_small}>-</Buttonku>
        </div>
        <div className="row">
          <Buttonku onClick={this.numberPressed} style={style.button_small}>7</Buttonku>
          <Buttonku onClick={this.numberPressed} style={style.button_small}>8</Buttonku>
          <Buttonku onClick={this.numberPressed} style={style.button_small}>9</Buttonku>
          <Buttonku onClick={this.operatorPressed} style={style.button_small}>/</Buttonku>
        </div>
        <div className="row">
          <Buttonku onClick={this.numberPressed} style={style.button_small}>4</Buttonku>
          <Buttonku onClick={this.numberPressed} style={style.button_small}>5</Buttonku>
          <Buttonku onClick={this.numberPressed} style={style.button_small}>6</Buttonku>
          <Buttonku onClick={this.operatorPressed} style={style.button_small}>*</Buttonku>
        </div>
        <div className="row">
          <Buttonku onClick={this.numberPressed} style={style.button_small}>1</Buttonku>
          <Buttonku onClick={this.numberPressed} style={style.button_small}>2</Buttonku>
          <Buttonku onClick={this.numberPressed} style={style.button_small}>3</Buttonku>
          <Buttonku onClick={this.decimalPressed} style={style.button_small}>.</Buttonku>
        </div>        
        <div className="row">
          <Buttonku onClick={this.numberPressed} style={style.button_big}>0</Buttonku>
          <Buttonku onClick={this.calculateChain} style={style.button_big}>=</Buttonku>
        </div>

      </div>
      );
  }
}   

class Buttonku extends Component {
 render (){
  const {children, style, onClick} = this.props;
  return(
    <button 
    onClick={onClick}
    style = {style}>
    {children}
    </button>

    );
}
}

const DisplayBox = ({style, calcChain}) =>
<input 
disabled='disabled'
type='text'
style={style}
value={calcChain}
>
</input>

export default App;