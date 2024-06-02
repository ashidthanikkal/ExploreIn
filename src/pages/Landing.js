import React, { useEffect } from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'


function Landing() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className='landing d-flex flex-column justify-content-center align-items-center' >

            <div className='p-3'>
                <h1>Embark on Your Next Journey with Confidence</h1>
                <p>Our tour planner makes travel planning easy and enjoyable. Start planning your next trip today...!</p>
            </div>
            <Link to={'/home'}>
                <button class="cta">
                    <span>Explore</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </Link>
        </div>
    )
}

export default Landing
