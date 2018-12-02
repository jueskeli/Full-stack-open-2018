import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import alan from './../Alan_Turing.jpg'

class About extends React.Component {

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={8}>
            <h2>About</h2>
            <p>Tämä sivu kertoo perustietoja.</p>
            <p>Tämä react sovellus on tehty Full Stack-open 2018 kurssille. </p>
            <p>Tämän sovelluksen on tehnyt Juuso-Julius Eskelinen</p>
            <div><p>Kuvassa Alan Turing --></p></div>
          </Col>
          <Col xs={6} md={3}>
            <img src={alan}></img>
          </Col>
        </Row>
      </Grid>

    )
  }
}

export default About
