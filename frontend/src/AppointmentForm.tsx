import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { CREATE_APPOINTMENT, GET_APPOINTMENTS } from './graphql/appointment';

interface AppointmentFormData {
  customerName: string;
  salonId: number | '';
  serviceId: number | '';
  appointmentTime: string;
}

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    customerName: '',
    salonId: '',
    serviceId: '',
    appointmentTime: '',
  });
  const [error, setError] = useState('');

  const [createAppointment, { loading }] = useMutation(CREATE_APPOINTMENT, {
    refetchQueries: [{ query: GET_APPOINTMENTS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.salonId || !formData.serviceId) {
      setError('Salon ID and Service ID must be valid numbers');

      return;
    }

    try {
      await createAppointment({
        variables: {
          input: {
            customerName: formData.customerName,
            salonId: Number(formData.salonId),
            serviceId: Number(formData.serviceId),
            appointmentTime: new Date(formData.appointmentTime).toISOString(),
          },
        },
      });
      
      // Reset form
      setFormData({
        customerName: '',
        salonId: '',
        serviceId: '',
        appointmentTime: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleNumberInput = (value: string, field: 'salonId' | 'serviceId') => {
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: value === '' ? '' : parseInt(value, 10)
      }));
    }
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">New Appointment</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salon ID</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={formData.salonId}
              onChange={(e) => handleNumberInput(e.target.value, 'salonId')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service ID</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={formData.serviceId}
              onChange={(e) => handleNumberInput(e.target.value, 'serviceId')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Appointment Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={formData.appointmentTime}
              onChange={(e) => setFormData(prev => ({ ...prev, appointmentTime: e.target.value }))}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Appointment'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AppointmentForm;
