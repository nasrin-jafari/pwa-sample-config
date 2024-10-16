import './App.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Home from './Home';
import About from './About';
import Users from './Users';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <BrowserRouter basename="/">
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/Home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/Home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/Users">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/About">
                  About
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <Routes>
            <Route path="/Users" element={<Users />} />
            <Route path="/About" element={<About />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
