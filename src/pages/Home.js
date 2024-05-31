import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import PlanCard from '../components/PlanCard';
import Add from '../components/Add';
import { accessDataApi } from '../services/allApis';
import './Home.css';

function Home() {

    const [addUpdates, setUpdates] = useState(false);
    const [allData, setData] = useState([]);
    const [deleteUpdate, setDeleteUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    const getData = async () => {
        const result = await accessDataApi();
        if (result.status >= 200 && result.status < 300) {
            console.log(result.data);
            setData(result.data);
        } else {
            alert('Data access failed');
        }
    }

    useEffect(() => {
        getData();
    }, [addUpdates, deleteUpdate]);

    console.log(allData);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = allData.slice(firstPostIndex, lastPostIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(allData.length / postsPerPage);

    return (
        <div className='home 100vh'>
            <Container>
                <Row className='d-flex justify-content-center align-items-center pt-5'>
                    <Col lg={6} md={6}>
                        <img src="https://i.postimg.cc/nrPPgM6V/Journey-amico.png"
                            style={{ width: '100%' }}
                            alt="" />
                    </Col>
                    <Col lg={6} md={6}>
                        <h1 className='text-center'>Embark on Your Next Journey with Confidence</h1>
                        <div className='d-flex justify-content-center'>
                            <Add update={setUpdates}></Add>
                        </div>
                        <input type="text" placeholder='Search your destination' className='form-control container mt-4' style={{ width: '100%' }} />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <div className='d-flex flex-wrap justify-content-around align-items-center gap-3'>
                            {
                                currentPosts.length > 0 ? (
                                    currentPosts.map(data => (
                                        <PlanCard key={data.id} update={setDeleteUpdate} data={data}></PlanCard>
                                    ))
                                ) : (
                                    <h1>No Data found</h1>
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center mt-4 '>
                        <nav>
                            <ul className='pagination'>
                                {[...Array(totalPages).keys()].map(number => (
                                    <li key={number + 1} className='page-item'>
                                        <Button onClick={() => paginate(number + 1)} className='page-link me-3 text-bg-dark'>
                                            {number + 1}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
