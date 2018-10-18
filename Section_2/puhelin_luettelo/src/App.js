import React from 'react';
import Numero from './components/Numero'
import HenkiloLisays from './components/HenkiloLisays'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: 'anna uusi nimi',
      newNumber: '000-00000000',
      showOnly: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
       const bookObject ={
         name: this.state.newName,
         number: this.state.newNumber
       }
    if(this.state.persons.some(person => person.name === this.state.newName) === false &&
       this.state.persons.some(person => person.number === this.state.newNumber) === false){
        const persons = this.state.persons.concat(bookObject)  
        this.setState({
           persons : persons,
           newName : 'anna uusi nimi',
           newNumber : '000-0000000'
         })
    }
    else alert('NIMI TAI NUMERO LÖYTYY JO OSOITEKIRJASTA')
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({newName : event.target.value})
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newNumber : event.target.value})
  }

  handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({showOnly : event.target.value})
  }

  render() {
    const namesToShow =
    this.state.persons.filter(person => person.name.includes(this.state.showOnly))
    return (
      <div>
        <h3>haku</h3>
        <form>
        <div>
            rajaa: <input value={this.state.showOnly} onChange={this.handleFilter}/>
        </div>
        </form>
        <h2>Puhelinluettelo</h2>
        <div>
          <HenkiloLisays state={this.state}
          onSubmit={this.addName}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange} />
        </div>
        <h2>Numerot</h2>
        <div>
           <Numero props={namesToShow} showOnly={this.state.showOnly} />
        </div>
      </div>
    )
  }
}


export default App;
