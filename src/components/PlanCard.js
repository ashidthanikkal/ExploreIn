import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Edit, Trash2 } from 'react-feather';
import { deleteDataApi, editDataApi } from '../services/allApis';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { base } from '../services/base';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PlanCard({ data, update }) {
    const [show, setShow] = useState(false);
    const [inputContent, setInputContent] = useState({});
    const [cardInputs, setCardInputs] = useState({
        title: '',
        about: '',
        itinerary: '',
        date: '',
        image: ''
    });

    useEffect(() => {
        setCardInputs({
            title: inputContent?.title || '',
            about: inputContent?.about || '',
            itinerary: inputContent?.itinerary || '',
            date: inputContent?.date || '',
            image: inputContent?.image || ''
        });
    }, [inputContent]);

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
        const out = await axios.get(`${base}/cards/${id}`);
        setInputContent(out.data);
        setShow(true);
    };

    const deleteCard = async (id) => {
        const result = await deleteDataApi(id);
        if (result.status >= 200 && result.status < 300) {
            update(prev=>!prev);
        }
    };

    const setDatas = (e) => {
        const { value, name } = e.target;
        setCardInputs({ ...cardInputs, [name]: value });
    };

    const saveData = async () => {
        const { title, about, itinerary, date, image } = cardInputs;

        if (!title || !about || !itinerary || !date || !image) {
            // alert('Please fill all fields');
            toast.warn('Please fill all datas', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        } else {
            const response = await editDataApi(inputContent.id, cardInputs);
            if (response.status >= 200 && response.status < 300) {
                // alert('Data updated successfully');
                toast.success('Data updated successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
                handleClose();
                update(prev=>!prev);
            } else {
                // alert('Data update failed');
                toast.error('Data update failed', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }
        }
    };

    return (
        <div>
            <div className='py-3'>
                <Card
                    style={{
                        width: '18rem',
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'rgba(255, 255, 255, 0.15) 0px 4px 4px -2px inset',
                        color: 'black'
                    }}
                    className='shadow'
                >
                    <Card.Img variant='top' src={data.image} style={{ height: '200px' }} />
                    <Card.Body>
                        <Card.Title >
                            <b>{data.title}</b>
                        </Card.Title>
                        <div style={{ height: '40px' }}><span >Itinerary: <b>{data.itinerary}</b></span></div>
                        <Card.Text className='py-2'>
                            <p>{data.about?.length > 85 ? data.about.slice(0, 85) + '...' : data.about}<Link to={`/single_view/${data.id}`} >view More</Link></p>
                            <h6>Planned Date: {data.date}</h6>
                        </Card.Text>
                        <span className='d-flex justify-content-between align-items-center'>
                            <Edit onClick={() => handleShow(data.id)} className='text-primary'></Edit>
                            <Trash2 onClick={() => deleteCard(data.id)} className='text-danger'></Trash2>
                        </span>
                    </Card.Body>
                </Card>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Your Trip...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        name='title'
                        onChange={setDatas}
                        type='text'
                        placeholder='Name Your Journey'
                        className='form-control'
                        value={cardInputs.title}
                    />
                    <textarea
                        name='about'
                        onChange={setDatas}
                        placeholder='About'
                        className='form-control mt-3'
                        value={cardInputs.about}
                    ></textarea>
                    <input
                        name='itinerary'
                        onChange={setDatas}
                        type='text'
                        placeholder='Itinerary'
                        className='form-control mt-3'
                        value={cardInputs.itinerary}
                    />
                    <input
                        name='date'
                        onChange={setDatas}
                        type='date'
                        className='form-control mt-3'
                        value={cardInputs.date}
                    />
                    <input
                        name='image'
                        onChange={setDatas}
                        type='text'
                        placeholder='Add image url'
                        className='form-control mt-3'
                        value={cardInputs.image}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={saveData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PlanCard;
