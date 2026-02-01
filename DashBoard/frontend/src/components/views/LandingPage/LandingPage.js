import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd';
import About from './photo.jpg';
import './LandingPage.css';

function LandingPage() {

    return (
        <div style={{ width: '75%', margin: '6rem auto' }}>
                <div>
                    <header id='header'>
                        <div className='intro'>
                            <div className='overlay'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-8 col-md-offset-2 intro-text'>
                                        <div className='smart-tea-header'>
                                            SMART TEA
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
    )
}

export default LandingPage
