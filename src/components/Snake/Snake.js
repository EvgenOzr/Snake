import React, {Component} from 'react';
import '../../css/Snake.min.css';
import Field from '../Field/Field';
import Statistics from '../Statistics/Statistics'
import Info from '../Info/Info'

export default class Snake extends Component{

    state = {
        startGame: false,
        snakeNumber: 0,
        direction: '',
        directionLock: false,
        snakePosition: {},
        gameOver: false,
    }

    componentDidMount(){
        this.moveSnake();
    }

    checkDirection = (newDirection) => {
        let oldDirection = this.state.direction;
        if ((newDirection !== oldDirection) && (!this.state.directionLock)){
            if ((newDirection === "Right" && oldDirection === "Left") ||
                (newDirection === "Left" && oldDirection === "Right") ||
                (newDirection === "Up" && oldDirection === "Down") ||
                (newDirection === "Down" && oldDirection === "Up")){
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    moveSnake = () => {
        document.addEventListener('keydown', (event) => {
            let newDirection = event.code.slice(5);
            if(this.state.gameOver) return;
            if ((event.code === 'ArrowLeft') || (event.code === 'ArrowRight') || (event.code === 'ArrowDown') || (event.code === 'ArrowUp')){
                if (this.state.startGame){
                    if (this.checkDirection(newDirection)){
                        this.setState({direction: newDirection, directionLock: true})
                    }
                } else {
                    let newSnakeNumber = this.state.snakeNumber + 1;
                    this.setState({snakeNumber: newSnakeNumber, direction: newDirection})
                    this.game();
                }
            }     
        });
    }

    changeSnakePosition = (newLeft, newTop) => {
        this.setState({snakePosition: {left:`${newLeft}px`, top: `${newTop}px`}, directionLock: false})
    }

    game = () => {
        let field = document.querySelector('.field');
        let head = document.querySelector('.head');
        let snakeTop = +getComputedStyle(head).top.replace(/\D/g, '');
        let snakeLeft = +getComputedStyle(head).left.replace(/\D/g, '');
        let speed = 500;
        let speedChange = false;
        let run;
        this.setState({startGame: true})

        const move = () => {
            if (!this.state.startGame) return;
            if (this.state.snakeNumber%3 === 0){
                if((speed > 50) && (speedChange === false)) speed -= 50;
                speedChange = true;
            } else {
                speedChange = false;
            }
            //проверки на столкновение с границами поля
            const checkBorderField = (snakeXY, direct) =>{
                let crash = false;
                // верхняя граница поля
                if((direct == 'Up') && (snakeXY.top - snakeXY.height < field.getBoundingClientRect().top)){                 
                    crash = true;
                }
                // правая и левая граница
                if (((direct == 'Left') && (snakeXY.left - snakeXY.width < field.getBoundingClientRect().left)) || 
                    ((direct == 'Right') && (snakeXY.left + snakeXY.width*2 > field.getBoundingClientRect().left + field.getBoundingClientRect().width))){
                    crash = true;
                }
                // нижняя граница поля
                if ((direct == 'Down') && (snakeXY.bottom + snakeXY.height > field.getBoundingClientRect().bottom)){   
                    crash = true;
                }
                if(crash){
                    this.stopGame(run);
                    return true;
                }else{
                    return false;
                }
            }

            // движение змейки
            const nextMove = (direction) => {
                let step = head.getBoundingClientRect().width;
                if (direction == "Left"){
                    snakeLeft -= step;
                } else if(direction == "Right"){
                    snakeLeft += step;
                } else if(direction == "Up"){
                    snakeTop -= step;
                } else if(direction == "Down"){
                    snakeTop += step;
                }          
                this.changeSnakePosition(snakeLeft, snakeTop);
            }

            // проверка на часть змейки
            const checkSnakePart = (snakeXY, direction) => {
                let chekPoint;
                if (direction == "Left"){
                    chekPoint = document.elementFromPoint(snakeXY.x - snakeXY.width + 10, snakeXY.y + 1);
                } else if (direction == "Right"){
                    chekPoint = document.elementFromPoint(snakeXY.x + snakeXY.width + 10, snakeXY.y + 1);
                } else if (direction == "Up"){
                    chekPoint = document.elementFromPoint(snakeXY.x + 1, snakeXY.y - snakeXY.height + 10);
                } else if (direction == "Down"){
                    chekPoint = document.elementFromPoint(snakeXY.x + 1, snakeXY.y + snakeXY.height + 10);
                }
                if(chekPoint){
                    // столкновение с новой частью
                    if (chekPoint.classList == "partSnake") {
                        let addSnake = this.state.snakeNumber + 1;
                        this.setState({snakeNumber: addSnake});
                    }
                    // столкновение с самой змейкой
                    if (chekPoint.classList == "bodySnake") {
                        // console.log("bodySnake", direction);
                        this.stopGame(run);
                        return true;
                    }
                }
                return false;
            }

            // проверка на границы поля
            if (checkBorderField(head.getBoundingClientRect(), this.state.direction)){
                return;
            } else {
                if (checkSnakePart(head.getBoundingClientRect(), this.state.direction)){
                    return;
                }
                nextMove(this.state.direction);

            }
            if (this.state.startGame) run = setTimeout(move, speed);
        }
        if(this.state.startGame) run = setTimeout(move, speed);
    }

    stopGame = (timerId) =>{
        this.setState({
            startGame: false,
            gameOver: true,
        });
        clearTimeout(timerId);
    }

    startNewGame = () => {

        this.setState({
            gameOver: false,
            snakeNumber: 0,
            direction: '',
            snakePosition: {},
        })
    }

    render(){
        return(
            <>
                <h1 className='snake_title'>Змейка</h1>
                <div className = 'snake'>
                    <Statistics
                        snakeNumber={this.state.snakeNumber}
                        endGame={this.state.gameOver}
                    />
                    <Field 
                        start={this.state.startGame}
                        snakeNumber={this.state.snakeNumber}
                        snakePosition={this.state.snakePosition}
                        endGame={this.state.gameOver}
                    />
                    <Info
                        startNewGame = {this.startNewGame}
                        endGame={this.state.gameOver}
                    />
                </div>
            </>
        )
    }
}