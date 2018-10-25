import React from 'react';
import axios from 'axios';
import Maa from './components/Maa'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maat: [],
      showOnly: ''
    }
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fullfilled')
        this.setState({ maat: response.data})
      })
  }

  handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({showOnly : event.target.value})
  }

  render() {
    const countriesToShow =
    this.state.maat.filter(maa => maa.name.includes(this.state.showOnly))
    return (
      <div>
        <form>
        <div>
            find countries: <input value={this.state.showOnly} onChange={this.handleFilter}/>
        </div>
        </form>
        <div>
           <Maa props={countriesToShow} showOnly={this.state.showOnly} />
        </div>
      </div>
    )
  }
}


export default App;
