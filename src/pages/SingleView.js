import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { accessDataApi } from '../services/allApis';
import './SingleView.css';

function PlanDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

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
        <div className='single'>

            {
                id.length>0?
                (<div>
                <Container className="plan-detail py-4">
                    <Row className="mt-5 align-items-center justify-content-center">
                        <Col xs={12} md={6} className="mb-4">
                            <img src={plan.image} alt={plan.title} className="img-fluid rounded" />
                        </Col>
                        <Col xs={12} md={6}>
                            <h1>{plan.title}</h1>
                            <p>{plan.about}</p>
                            <Link to={'/home'} style={{ textDecoration: "none" }}>
                                <Button className='bg-primary'>Back to Home</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>)
            :
            (<div>
                <img src="https://media0.giphy.com/media/OfdA9ssTZzVgBWJuB9/giphy.gif?cid=6c09b952ofllpx42f4njv510s1880qhm3o530khefaufqq17&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="" srcset=""
                    style={{ width: "300px" }}
                />
            </div>)
            }

        </div>
    );
}

export default PlanDetail;
