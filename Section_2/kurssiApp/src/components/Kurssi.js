import React from 'react'

const Kurssi = (props) => {
    const sisalto = props.kurssi.osat.map(osa => osa)
    return (
      <div>
        <Otsikko nimi ={props.kurssi.nimi}/>
        <Sisalto sisalto= {sisalto}/>
        <Yhteensa sisalto={sisalto}/>
      </div>
    ) 
}

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.nimi}</h1>
      </div>
    )
  }


const Sisalto = (props) => {
    return (
      <div>
          { props.sisalto.map(item =>
            <div key={item.id}>
              {
                <Osa nimi={item.nimi} tehtavia={item.tehtavia}/>
              }
            </div>
            )}
      </div>
    )
}

const Osa = (props) => {
    return (
      <div>
        <p>{props.nimi} {props.tehtavia}</p>
      </div>
    )
}

const Yhteensa = (props) => {
  console.log(props)
    return (
      <div>
          Yhteensä :{props.sisalto.reduce(function(sum, osa){
              return sum + osa.tehtavia
          }, 0)}
      </div>
    )
}

export default Kurssi