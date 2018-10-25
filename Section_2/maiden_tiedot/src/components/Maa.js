import React from 'react';

const Maa = (props) => {
    console.log(props)
    if(props.props.length > 10) {
      return (
        <ul>
        Liikaa tuloksia, kokeile uudestaan
        </ul>
      )
      }
    else if(props.props.length > 1 && props.props.length < 10) {
      return (
        <ul>
             {props.props.map(maa => <li key={maa.name}>{maa.name}</li>)}
        </ul>
      )
    }
    else {
      return (
        <ul>
            {props.props.map(maa => 
            <div key={maa.name}>
              <li>{maa.name}</li>
              <li> capital : {maa.capital} </li>
              <li> population : {maa.population} </li>
              <li>
                  <a href={maa.flag}>
                    <img src={maa.flag} width="400" alt="flag should be here"/>
                  </a>
              </li>
           </div>
            )}  
        </ul>  
      )
    }
}
  
  export default Maa