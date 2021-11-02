import { useState } from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';





function Header() {

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    }

    return (
        <Navbar expand="lg" bg="danger" variant="dark" >
            <Container>
                <Link to="/" className="text-white navbar-brand " >Movie App</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className=" nav-link  { isActive ? 'active' : null }" onClick={toggleClass}>Home</Link>
                        <Link to="/add-Movies" className=" nav-link { isActive ? 'active' : null }" onClick={toggleClass} >Add Movies</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Header;