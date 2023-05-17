import React from 'react';
// import './Info.css';
import '../../css/Info.min.css'

const Info = ({endGame, startNewGame}) => {

    let newClassName ='newGame';
    (endGame) ? newClassName +=' newGame_show' :  newClassName +=' newGame_hidden';

    return(
        <div className = "info">
            <h2 className = "info_stat">Управление</h2>
            <div>
                <div className="info_definition">Вверх<span className="info_arrow fa fa-arrow-up"/></div>
                <div className="info_definition">Вниз<span className="info_arrow fa fa-arrow-down"/></div>
                <div className="info_definition">Влево<span className="info_arrow fa fa-arrow-left"/></div>
                <div className="info_definition">Вправо<span className="info_arrow fa fa-arrow-right"/></div>
            </div>
            <div className = "info_stat">Для начала игры нажмите одну из кнопок</div>
            <div className = {newClassName}>
                <div className = "newGame_question">Игра окончена.<br/>
                    Хотите начать заново?
                </div>
                <div className = "newGame_btnBlock">
                    <button 
                        className = "newGame_btn"
                        onClick = {startNewGame}
                    >Да</button>
                    <button className = "newGame_btn">Нет</button>
                </div>
            </div>
        </div>
    )
}

export default Info;