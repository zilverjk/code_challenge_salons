import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Salon Appointments</h1>
      
      <Row className="mb-4">
        <Col className="d-flex justify-content-center gap-3">
          <Button 
            variant={currentView === 'list' ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentView('list')}
          >
            View Appointments
          </Button>
          <Button 
            variant={currentView === 'form' ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentView('form')}
          >
            Create Appointment
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {currentView === 'list' ? <AppointmentList /> : <AppointmentForm />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
