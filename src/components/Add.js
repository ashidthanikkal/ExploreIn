import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Add.css'
import { addDataApi } from '../services/allApis';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function Add({update}) {

    
    //########################################################


    const [cardInputs,setInputs]=useState({
        title:"",
        about:"",
        itinerary:"",
        date:"",
        image:""
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setDatas=(e)=>{
        // console.log(e.target.value);
        // console.log(e.target.name);

        // let value=e.target.value
        // let name=e.target.name

        let {value,name}=e.target
        setInputs({...cardInputs,[name]:value})
    }
    // console.log(cardInputs);

    const addDatas=async()=>{
        const {title,about,itinerary,date,image}=cardInputs

        if(title==""||about==""||itinerary==""||date==""||image==""){
            // alert("please fill all datas")
            toast.warn('please fill all datas', {
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
        else{
        //    const out=await addDataApi(cardInputs)
        //    console.log(out);
        const out=await addDataApi(cardInputs)

        console.log(out);

        if(out.status>=200 && out.status<300 ){
            // alert('Data added successfully')
            toast.success('Data added successfully', {
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


            handleClose()
            update(prev=>!prev)
        }
        else{
            // alert('Data adding failed')
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
    }

    return (
        <div>
            <button type="button" className="add" onClick={handleShow}>
                <span className="button__text">Add plan</span>
                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Your Trip..!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input name='title' onChange={(e)=>setDatas(e)} type="text" placeholder='Name Your Journey' className='form-control' />
                    <textarea name='about' onChange={(e)=>setDatas(e)} placeholder='About' className='form-control mt-3' ></textarea>
                    <input name='itinerary'  onChange={(e)=>setDatas(e)} type="text" placeholder='Itinerary' className='form-control mt-3' />
                    <input name='date' onChange={(e)=>setDatas(e)} type="date" className='form-control mt-3' />
                    <input name='image' onChange={(e)=>setDatas(e)} type="input" placeholder='Add image url' className='form-control mt-3' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addDatas}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Add
