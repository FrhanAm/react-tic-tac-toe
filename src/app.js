import React from "react";
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Grid, Typography, Snackbar,Fab } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Clear from '@material-ui/icons/Clear';
import Brightness1 from '@material-ui/icons/Brightness1';

import GameButton from './component/GameButton';
import calculateWinner from './game-logic/CheckWin';

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           gameMap: Array(9).fill(0),
           xIsNext: true,
           lock: false,
           winner: false
        };
        this.reset = this.reset.bind(this)
    };

    kernel(index) {
       // return if button was selected or game over 
       if (this.state.gameMap[index] || this.state.winner)
           return;
       // clone current state
       let gameMap = this.state.gameMap.slice();
       gameMap[index] = this.state.xIsNext ? 'O' : 'X';
       // calculate winner
       let winner = calculateWinner(gameMap);
       this.setState({
           gameMap: gameMap,
           xIsNext: !this.state.xIsNext,
           winner: winner
        });
          // return x or o icon
          return gameMap[index] == 'O' ? <Brightness1 fontSize="large" /> : <Clear fontSize="large" color="secondary" />;
    }

    reset() {
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
        ReactDOM.render(<TicTacToe />, document.getElementById('app'));
    }
    

    render() {
       return (
           <Grid container alignItems="center" justify="center" direction="column" style={{ minHeight: "100vh" }}>
                <Typography variant="h2" component="h2"
                   color={this.state.xIsNext ? "primary" : "secondary"}
                   style={{ marginBottom: "3rem" }}>
                   Tik Tak Toe
               </Typography>
                <div className="game">
                   {[...Array(9)].map((val, index) => <GameButton click={() => this.kernel(index)} key={index} id={index} />)}
               </div>
                <Snackbar open={Boolean(this.state.winner)} autoHideDuration={10000} onClose={() => { location.reload(); }}>
                   <MuiAlert elevation={6} variant="filled" onClose={() => { location.reload(); }} severity="success">
                       {this.state.winner} won the game !
                   </MuiAlert>
               </Snackbar>
               <Fab onClick={() => { this.reset() }} color="primary" aria-label="add" style={{ position: "absolute", bottom: '15px', left: '15px' }}>
                    <RefreshIcon />
               </Fab>
            </Grid>
       );
   }
}

ReactDOM.render(<TicTacToe />, document.getElementById('app'));