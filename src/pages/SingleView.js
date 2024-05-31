import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { accessDataApi } from '../services/allApis';
import './SingleView.css';

function PlanDetail() {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);

    const getPlan = async () => {
        const result = await accessDataApi();
        if (result.status >= 200 && result.status < 300) {
            const planData = result.data.find(plan => plan.id === parseInt(id));
            setPlan(planData);
        } else {
            alert('Data access failed');
        }
    }

    useEffect(() => {
        getPlan();
    }, [id]);

    if (!plan) {
        return <h1>Loading...</h1>;
    }

    return (
       <div className='single d-flex flex-column justify-content-center align-items-center'>
          <Container className="plan-detail">
              <Row className="mt-5">
                  <Col md={6}>
                      <img src={plan.image} alt={plan.title} className="img-fluid" />
                  </Col>
                  <Col md={6}>
                      <h1>{plan.title}</h1>
                      <p>{plan.about}</p>
                      <Link to={'/home'} style={{textDecoration:"none"}}><Button className='bg-primary'>Back to Home</Button></Link>
                      

                  </Col>
              </Row>
          </Container>
       </div>
    );
}

export default PlanDetail;
