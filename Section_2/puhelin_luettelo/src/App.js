import React from 'react'
import Numero from './components/Numero'
import HenkiloLisays from './components/HenkiloLisays'
import henkiloPalvelu from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: 'anna uusi nimi',
      newNumber: '000-00000000',
      showOnly: ''
    }
  }

  componentDidMount() {
    console.log('did mount')
    henkiloPalvelu
      .getAll()
      .then(response => {
        this.setState({persons : response})
      })
  }

  addName = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
       const bookObject ={
         name: this.state.newName,
         number: this.state.newNumber
       }
    henkiloPalvelu
      .create(bookObject)
      .then(newPerson => {
        if(this.state.persons.some(person => person.name === this.state.newName) === false &&
        this.state.persons.some(person => person.number === this.state.newNumber) === false){ 
          this.setState({
            persons : this.state.persons.concat(newPerson),
            newName : 'anna uusi nimi',
            newNumber : '000-0000000'
          })
        }
        else alert('NIMI TAI NUMERO LÖYTYY JO OSOITEKIRJASTA')
      })
    }

  removeName = (id) => {
      console.log('remove')
      return () => {
      const henkilo = this.state.persons.filter(person => person.id === id)
      if (window.confirm(`'Poistetaanko ${henkilo[0].name}`)){
       henkiloPalvelu
        .remove(id)
        .then(
          console.log('remove successful'),
          this.setState({
            persons : this.state.persons.filter(person => person.id !== id),
          })
          )
        .catch(error => {
          alert(`henkiön ${id}  poisto epäonnistui`)
        })
      }
    }
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
           <Numero persons={namesToShow} poista={this.removeName}/>
        </div>
      </div>
    )
  }
}


export default App;
