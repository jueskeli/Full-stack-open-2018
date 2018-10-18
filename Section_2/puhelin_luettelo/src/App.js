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
    if(this.state.persons.some(person => person.name === this.state.newName) === false){
        const persons = this.state.persons.concat(bookObject)  
        this.setState({
           persons : persons,
           newName : 'anna uusi nimi'
         })
    }
    else alert('NIMI LÖYTYY JO OSOITEKIRJASTA')
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({newName : event.target.value})
  }

  showNames = (persons) => {
    
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
        <div>
           <Numero props={this.state.persons} />
        </div>
      </div>
    )
  }
}


export default App;
