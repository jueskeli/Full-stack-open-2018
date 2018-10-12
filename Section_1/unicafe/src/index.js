import React from 'react';
import ReactDOM from 'react-dom';

  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyvä: 0,
        neutraali: 0,
        huono: 0,
        yhteensä: 0
      }
    }
  
    klikHyvä = () => {
      this.setState({
        hyvä: this.state.hyvä + 1,
        yhteensä: this.state.yhteensä + 1
      })
    }
  
    klikNeutraali = () => {
      this.setState({
        neutraali: this.state.neutraali + 1,
        yhteensä: this.state.yhteensä + 1
      })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            yhteensä: this.state.yhteensä + 1
        })
      }
  
    render() {
      return (
        <div>
        <h1>Anna palautetta</h1>
          <div>          
            <button onClick={this.klikHyvä}>hyvä</button>
            <button onClick={this.klikNeutraali}>neutraali</button>
            <button onClick={this.klikHuono}>huono</button>

          </div>
          <h1>Statistiikka</h1>
            <div>
            Hyvä : {this.state.hyvä} <br></br>
            Neutraali : {this.state.neutraali} <br></br>
            Huono : {this.state.huono} <br></br><br></br>
            Äänet yhteensä : {this.state.yhteensä} <br></br><br></br>
            Keskiarvo : {Math.round((this.state.hyvä - this.state.huono) / this.state.yhteensä * 10) /10 } <br></br>
            Positiivisia : {Math.round((this.state.hyvä / this.state.yhteensä) * 100 * 10) / 10} % <br></br>
            </div>
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
