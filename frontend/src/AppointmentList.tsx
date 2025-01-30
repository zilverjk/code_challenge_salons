import { useQuery, useMutation } from '@apollo/client';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Appointment, DELETE_APPOINTMENT, GET_APPOINTMENTS } from './graphql/appointment';

const AppointmentList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT, {
    refetchQueries: [{ query: GET_APPOINTMENTS }],
  });

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  const handleDelete = async (id: number) => {
    try {
      await deleteAppointment({ variables: { id } });
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>Salon</th>
          <th>Service</th>
          <th>Time</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.appointments.map((appointment: Appointment) => (
          <tr key={appointment.id}>
            <td>{appointment.id}</td>
            <td>{appointment.customerName}</td>
            <td>{`${appointment.salon.name}`}</td>
            <td>{`${appointment.service.name}`}</td>
            <td>{formatDate(appointment.appointmentTime)}</td>
            <td>${appointment.service.price}</td>
            <td>
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => handleDelete(appointment.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentList;
