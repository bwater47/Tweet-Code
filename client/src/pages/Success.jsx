import { useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  // Handle the sessionId here, e.g., verify the payment, show success message, etc.

  return (
    <div>
      <h1>Payment Successful!</h1>
      {sessionId && <p>Your session ID is: {sessionId}</p>}
    </div>
  );
}

export default Success;
