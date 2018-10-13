import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
    this.kasvata = function(kohta) {
        const uudet_äänet = [...this.state.votes]
        uudet_äänet[kohta] += 1
        return uudet_äänet
    }
  }

  uusi = () => {
    return () => {
        this.setState({
           selected : (Math.random() * (5 - 0 + 1) ) << 0
        })
    }
   }

  ääni = (new_votes) => {
    return () => {
        this.setState({
            votes : new_votes
        })
    }
   }

  render() {
    return (
      <div>
        <h1>Arvotaan anekdootti :</h1>
        {this.props.anecdotes[this.state.selected]} <br></br>
        ääniä : {this.state.votes[this.state.selected]} <br></br>
        <Button 
                handleClick={this.ääni(this.kasvata(this.state.selected))}
                text="Anna ääni"
            />
        <Button 
                handleClick={this.uusi(this.state.votes[this.state.selected])}
                text="Uusi anekdootti"
            />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)