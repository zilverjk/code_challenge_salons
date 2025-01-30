import React from 'react';
import { useQuery, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import './App.css'; // Import the custom CSS file for styling

// Define the type for the query response
interface HelloResponse {
  hello: string;
}

// GraphQL query
const HELLO_QUERY = gql`
  query {
    hello
  }
`;

function App() {
  const { loading, error, data } = useQuery<HelloResponse>(HELLO_QUERY);

  // Determine the content of the badge
  let badgeContent: string;
  if (loading) {
    badgeContent = 'Loading...'; // Show "Loading..." while the query is in progress
  } else if (error) {
    badgeContent = `Error: ${error.message}`; // Show the error message if there is an error
  } else {
    badgeContent = data?.hello || 'No data'; // Show the result, or "No data" if `hello` is null/undefined
  }

  return (
    <div className="App">
      <div className="content">
        <Badge className="p-3">{badgeContent}</Badge>
      </div>
    </div>
  );
}

export default App;

