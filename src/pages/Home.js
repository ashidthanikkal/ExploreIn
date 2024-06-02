import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import PlanCard from '../components/PlanCard';
import Add from '../components/Add';
import { accessDataApi } from '../services/allApis';
import './Home.css';

function Home() {

    const [addUpdates, setUpdates] = useState(false);
    const [allData, setData] = useState([]);
    const[allDataCopy,setAllDataCopy]=useState([])
    const [deleteUpdate, setDeleteUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    const getData = async () => {
        const result = await accessDataApi();
        if (result.status >= 200 && result.status < 300) {
            
            setData(result.data);
            setAllDataCopy(result.data)
        } else {
            alert('Data access failed');
        }
    }

    useEffect(() => {
        getData();
    }, [addUpdates, deleteUpdate]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = allData.slice(firstPostIndex, lastPostIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(allData.length / postsPerPage);

    const searchResult=(e)=>{
        const sData=allDataCopy.filter(i=>i.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setData(sData);
    }

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
                        <input type="text" placeholder='Search your destination' className='form-control container mt-4' style={{ width: '100%' }} onChange={(e)=>searchResult(e)} />
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
                                ) : 
                                (
                                    <img src="https://media0.giphy.com/media/OfdA9ssTZzVgBWJuB9/giphy.gif?cid=6c09b952ofllpx42f4njv510s1880qhm3o530khefaufqq17&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="" srcset="" 
                                    style={{width:"300px"}}
                                    />

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
