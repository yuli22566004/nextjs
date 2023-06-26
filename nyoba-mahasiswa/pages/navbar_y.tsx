import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function NavbarMenu() {
    return (
<Navbar bg="success" variant="dark">
      <div className="d-flex align-items-center">
        <Navbar.Brand href="#">
          <img
            src="path/logo_transparan.png"
            width="45"
            height="35"
            className="d-inline-block align-top"
            alt="Logo"
          /> {' '}
          
          <b>STMIK JAYAKARTA</b>
        </Navbar.Brand>
        <Nav className="mr-auto" fill variant="tabs">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <NavDropdown title="Dropdown" id="nav-dropdown" >
            <NavDropdown.Item href="#">Action</NavDropdown.Item>
            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#">Something else</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#">Contact</Nav.Link>
        </Nav>
      </div>
    </Navbar>

)
}