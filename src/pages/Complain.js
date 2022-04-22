import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Navbar from '../components/Navbar'
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'
import Photo from '../assets/Scan.jpg'

export default function Complain() {
    const [contact, setContact] = useState(null)

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    const dataContact = [
        {
            id: 1,
            name: 'Admin',
            chat: 'Yes, Is there anything I can help',
            img: Photo,
        },
    ]

    return (
        <>
            <Navbar title={title} />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={dataContact}  setContact={setContact} contact={contact} />
                    </Col>
                    <Col md={9} style={{maxHeight: '89.5vh'}} className="px-0">
                        <Chat contact={contact} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
