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
  
    klikHyvä = () =>
        () => {
          this.setState({
            hyvä: this.state.hyvä + 1,
            yhteensä: this.state.yhteensä + 1
        })
      }

    klikNeutraali = () =>
    () => {
      this.setState({
        neutraali: this.state.neutraali + 1,
        yhteensä: this.state.yhteensä + 1
      })
    }

    klikHuono = () =>
    () => {
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
            <Button 
                handleClick={this.klikHyvä()}
                text="Hyvä"
            />
            <Button 
                handleClick={this.klikNeutraali()}
                text="Neutraali"
            />
            <Button 
                handleClick={this.klikHuono()}
                text="Huono"
            />
          </div>
          <h1>Statistiikka</h1>
            <div>
                <Statistics
                    hyvä={this.state.hyvä}
                    neutraali={this.state.neutraali}
                    huono={this.state.huono}
                    yhteensä={this.state.yhteensä}
                />          
            </div>
        </div>
      )
    }
  }

  const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistics = ({hyvä, neutraali, huono, yhteensä}) => (
    <div>
        <Statistic
            text="Hyviä ääniä"
            arvo={hyvä}
            lisäteksti=" kpl"
        />
        <Statistic
            text="Neutraaleja ääniä"
            arvo={neutraali}
            lisäteksti=" kpl"
        />
        <Statistic
            text="Huonoja ääniä"
            arvo={huono}
            lisäteksti=" kpl"
        />
        <Statistic
            text="Yhteensä ääniä"
            arvo={yhteensä}
            lisäteksti=" kpl"
        />
        <Statistic
            text="Keskiarvo"
            arvo={Math.round((hyvä - huono) / yhteensä *10) / 10}
            lisäteksti="/1"
        />
        <Statistic
            text="Positiivisia"
            arvo={Math.round((hyvä / yhteensä) * 100 * 10) / 10}
            lisäteksti="%"
        />
    </div>
  )

  const Statistic = ({text, arvo, lisäteksti}) => (
    <div>
        {text} : {arvo}{lisäteksti}
    </div>
  )
    

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
