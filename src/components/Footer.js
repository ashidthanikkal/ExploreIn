import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (

    <div className='foot py-2' style={{ backgroundColor: "rgb(153, 156, 159)" }}>

<Container>
        <Row>
          <Col lg={4} md={6} sm={12} className='mt-2'>
            <h4><b>ExploreIn.</b></h4>
            <h6>Copyright ©  2024 ExploreIn All rights reserved.</h6>
          </Col>
  
          <Col lg={4} md={6} sm={12} className='mt-2'>
            <h5><b>Links</b></h5>
            <Link to={'/home'} style={{textDecoration:"none", color:"black"}}><h6>Home</h6></Link>
            <Link to={'/'} style={{textDecoration:"none", color:"black"}}><h6>Landing page</h6></Link>
            <Link to={'/about'} style={{textDecoration:"none", color:"black"}}><h6>About</h6></Link>
          </Col>
  
          <Col lg={4} md={6} sm={12} className='mt-2'>
          <div>
            <h5><b>Contact Us</b></h5>
              <div className='d-flex justify-content-between mt-2 w-50'>
                <i className="fa-brands fa-2x fa-instagram"></i>
                <i className="fa-brands fa-2x fa-facebook" ></i>
                <i className="fa-brands fa-2x fa-x-twitter" ></i>
                <i className="fa-brands fa-2x fa-github"></i>
              </div>
          </div>
          </Col>
        </Row>
  
</Container>
    </div>
  )
}

export default Footer
