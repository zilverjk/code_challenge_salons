import { gql } from '@apollo/client';
import { Salon } from './salon';
import { Service } from './service';


export interface Appointment {
  id: number;
  customerName: string;
  appointmentTime: string;
  salon: Salon;
  service: Service;
}

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      customerName
      appointmentTime
      salon {
        id
        name
        location
      }
      service {
        id
        name
        price
      }
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointment!) {
    createAppointment(input: $input) {
      id
      customerName
      appointmentTime
      salon {
        id
        name
      }
      service {
        id
        name
        price
      }
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: Int!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`;
