import React from 'react';

const Numero = (props) => {
    console.log(props)
      return (
        <ul>
             {props.props.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      )
  }
  
  export default Numero