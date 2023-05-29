import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./Sidebar.scss"
import Immagine from "../../assets/logo.png"
const Sidebar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className='navbar'>
                <Container>
                   <img src={Immagine} width="100px" height="90px"></img>
                    <Navbar.Brand className='font' href="#">Officina Sablone Elvano</Navbar.Brand>
                    <Button className="colorstyle1" onClick={handleShow}>
                        <FontAwesomeIcon icon={faBars} beat />
                    </Button>
                </Container>
            </Navbar>



            <Offcanvas className='colorstyle1'  show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='colorstyle2'> 
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active red colorstyle" onClick={handleClose} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="orders" className="nav-link colorstyle"  onClick={handleClose} >Ordini</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="customers" className="nav-link colorstyle" onClick={handleClose} >Clienti</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="products" className="nav-link colorstyle" onClick={handleClose} >Prodotti</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="workings" className="nav-link colorstyle" onClick={handleClose} >Lavorazioni</Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;

