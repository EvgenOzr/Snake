import React, {Component} from 'react';
import '../../css/Field.min.css';


export default class Field extends Component{

    state = {
        snakePart: 0,
        keyId: 0,
        blocks: [(<div
                    key = {0}
                    className = 'head'
                    style = {{left: '600px', top: '350px'}}
                    >:)</div>)],
        prevSnakePosition: {},
    }

    componentDidUpdate(){
        if(!this.props.endGame){
            if (this.props.snakeNumber > this.state.snakePart){
                this.setState({snakePart: this.props.snakeNumber});
                this.createSnake();
            }
            if(this.props.snakePosition.left){
                if(this.savePrevSnakePosition(this.props.snakePosition)) {
                    this.moveSnakeBody(this.props.snakePosition);
                }
            }
            if (this.props.snakeNumber < this.state.snakePart) this.newGame();
        }
    }

    randomInteger = (min, max) => { 
        // случайное число от min до (max+1) 
        let rand =  Math.floor(min + Math.random() * (max + 1 - min));
        let rest = rand % 25; 
        return rand - rest;
    }

    createSnake = () =>  {
        let newLeft, newTop, newStyle, newKey, newBlocks;
        while (true){
            let exit = true;
            newLeft = this.randomInteger(25, 1175);
            newTop = this.randomInteger(25, 575);
            this.state.blocks.forEach((item) => {
                if ((+item.props.style.left.replace(/\D/g, '') === newLeft)
                && (+item.props.style.top.replace(/\D/g, '') === newTop)) exit = false;
            })
            if (exit) break;
        }
        newStyle = {left: `${newLeft}px`, top: `${newTop}px`}
        newKey = this.state.keyId + 1;
        newBlocks = this.state.blocks;
        newBlocks.push(
            <div
                key = {newKey}
                className = 'partSnake'
                style = {newStyle}>
            </div>
        );
        this.setState({keyId: newKey, blocks: newBlocks})
    }

    moveSnakeBody = (snakePosition) => {
        let newLeft, newTop, newClassName;

        newLeft = +snakePosition.left.replace(/\D/ig, '');
        newTop = +snakePosition.top.replace(/\D/ig, '');

        const newBlocks = this.state.blocks.map((item, index) => {
            let newStyle;
            let picture;
            if (index == 0){
                newStyle = {left:`${newLeft}px`, top: `${newTop}px`};
                newClassName = 'head';
                picture = ':)'
            }else if ((index < this.state.blocks.length - 1) && (index != 0)) {
                newLeft = this.state.blocks[index - 1].props.style.left;
                newTop = this.state.blocks[index - 1].props.style.top;
                newStyle = {left: newLeft, top: newTop};
                newClassName = 'bodySnake';
            } else {
                newClassName = 'partSnake'
                newStyle = item.props.style;
            }
            return (
                <div
                    key = {item.key}
                    className = {newClassName}
                    style = {newStyle}>{picture}
                </div>
            )
        });

        this.state.prevSnakePosition = snakePosition;
        this.setState({blocks: newBlocks});
    }

    savePrevSnakePosition = (newPosition) => {
        if((newPosition.left !== this.state.prevSnakePosition.left) ||
            (newPosition.top !== this.state.prevSnakePosition.top)){
            this.setState({prevSnakePosition: newPosition})
            return true;
        } else {
            return false;
        }
    }
    
    newGame = () => {
        this.setState({
            snakePart: 0,
            keyId: 0,
            blocks: [(<div
                        key = {0}
                        className = 'head'
                        style = {{left: '600px', top: '350px'}}
                        >:)</div>)],
            prevSnakePosition: {},
        })
    }

    render(){
        let newClassName;
        (this.props.start) ? newClassName = 'field noCursor' : newClassName = 'field';
        return(
            <div className = {newClassName}>
                {this.state.blocks}
            </div>
        )
    }

}

