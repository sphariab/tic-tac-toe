import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cells from './helpers/cells';
import getResult from './helpers/getResult'
import styles from '../styles/gameStyles';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: cells(),
      userCells: [],
      computerCells: [],
      userResult: '',
      computerResult: '',
      player: '',
    }
  }

  componentDidMount(){
    this.setState({ player: this.props.history.location.state.player })
  }

  setResult (result, player) {
    player === 'user' ?
      this.setState({ userResult: result }, () => this.goToResultPage())
      : this.setState({ computerResult: result }, () => this.goToResultPage())
  }

  showAllResult = () => {
    this.setResult(getResult(this.state.userCells),  'user')
    this.setResult(getResult(this.state.computerCells), 'computer')
  }


  goToResultPage = () => {
    let userResult = this.state.userResult
    let computerResult = this.state.computerResult
    this.props.history.push({
      pathname: '/finish',
      state: {userResult, computerResult}
    })
  }

  restartGame = () => {
    this.setState({
      userCells: [],
      computerCells: [],
      userResult: '',
      computerResult: ''
    })

    this.props.history.push({
      pathname: '/',
    })
  }

  chooseRandomCell = () => {
    let userCells = this.state.userCells;
    let computerCells = this.state.computerCells;
    let container = [].concat(userCells, computerCells);
    let arr = cells()
    let diffArray = arr.filter(item => container.indexOf(item.number) === -1);
    const randomElement = diffArray[Math.floor(Math.random() * diffArray.length)];
    return randomElement.number
  }

  computerPlay = () => {
    let computerCells = this.state.computerCells;
    let cellsCopy = this.state.cells;
    if (computerCells.length <= 3 ) {
      let selectedCellNumber = this.chooseRandomCell();

      cellsCopy = cellsCopy.map(item => {
        if (item.number === selectedCellNumber) {
          item.selected = true;
          item.player = 'computer';
        }
        return item
      })

      computerCells = computerCells.concat([selectedCellNumber]);

      this.setState({computerCells: computerCells, cells: cellsCopy}, () => {
        if (computerCells.length === 4 ) {
          this.showAllResult()
        }
      })
    } else {
      this.showAllResult()
    }
  }

  fillResult = (cell) => {
    let userCells = this.state.userCells
    let cellsCopy = this.state.cells

    cellsCopy = cellsCopy.map(item => {
      if (item.number === cell.number) {
        item.selected = true;
        item.player = 'user';
      }
      return item
    })

    if (userCells.length <= 3 ) {
      userCells = userCells.concat([cell.number]);

      this.setState({userCells: userCells, cells: cellsCopy}, () => {
        if (userCells.length === 4 ) {
          this.showAllResult()
        }
        this.computerPlay()
      })
    } else {
      this.showAllResult()
      this.computerPlay()
    }
  };

  renderIcon = (cell, player) => {
    return cell.player === 'user' && player === 'x' && cell.selected ? <CloseIcon /> :
      cell.player === 'user' && player === 'o' && cell.selected ?  <PanoramaFishEyeIcon /> :
      cell.player === 'computer' && player === 'x' && cell.selected ? <PanoramaFishEyeIcon /> :
      cell.player === 'computer' && player === 'o' && cell.selected ? <CloseIcon /> : null
   };

  render () {
    const { cells, player } = this.state
    const { classes } = this.props

    return (
      <section className={classes.gameWrapper}>
        <h1>Tic-Tac-Toe</h1>
        <div className={classes.gameContainer}>
          {cells.map((cell, index) =>
            <Button
              key={index}
              className={classes.cell}
              disabled={cell.selected}
              onClick={() => {
                this.fillResult(cell)
              }}
            >
              {this.renderIcon(cell, player)}
            </Button>
          )}
        </div>
        <Button
          className={classes.restartButton}
          onClick={this.restartGame}
        >
          Restart Game
        </Button>
      </section>
    )
  }
}

export default withStyles(styles)(Game)


