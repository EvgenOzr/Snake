import React, {Component}from 'react';
// import './Statistics.css';
import '../../css/Statistics.min.css'

export default class Statistics extends Component {

    state = {
        user: '',
        score: 0
    }

    componentDidMount(){
        if(localStorage.getItem('user')) this.getUser();
    }

    componentDidUpdate(){
        if((this.props.endGame) && localStorage.getItem('user')){
            if(+localStorage.getItem('score') < +this.props.snakeNumber){
                localStorage.setItem('score', this.props.snakeNumber);
                this.setState({score: this.props.snakeNumber})
            }
        }
    }

    setUser = () => {
        let newUser = document.querySelector('.newUser_name')
        if(newUser.value !== ''){
            localStorage.setItem('user', newUser.value);
            localStorage.setItem('score', 0);
            this.setState({user: newUser.value})
        }       
    }

    getUser = () => {
        this.setState({user: localStorage.getItem('user'), score: localStorage.getItem('score')});
    }

    render(){
        let newClassName ='newUser';
        (!localStorage.getItem('user')) ? newClassName +=' newUser_show' : newClassName +=' newUser_hidden';
        return(
            <div className = "stat">
                <h2 className = "stat_title">Статистика</h2>
                <div className = "stat_name">
                    <div className = "stat_name_user">Игрок</div>
                    <div className = "stat_name_value">{this.state.user}</div>
                </div>
                <div className = "stat_name">
                    <div className = "stat_name_user">Рекорд</div>
                    <div className = "stat_name_value">{this.state.score}</div>
                </div>
                <div className = {newClassName}>
                    <div className = "stat_addUser">Добавить нового пользователя.
                    </div>
                    <div className = "newUser_btnBlock">
                        <input
                            className = "newUser_name"
                            type="text"
                            placeholder="Имя"
                        />
                        <button 
                            className = "newUser_btn"
                            onClick = {this.setUser}
                        >OK</button>
                    </div>
                </div>
            </div>
        )
    }
    
}