import React from 'react';
import Numero from './components/Numero'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: 'anna uusi nimi'
    }
  }

  addName = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    const bookObject ={
      name: this.state.newName
    }

    const persons = this.state.persons.concat(bookObject)

    this.setState({
      persons : persons,
      newName : 'anna uusi nimi'
    })
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({newName : event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
    {this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}


export default App;
