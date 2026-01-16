import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import SuccessPage from './components/SuccessPage';
import './index.css';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleRegistrationSuccess = (link) => {
    setWhatsappLink(link);
    setIsRegistered(true);
  };

  return (
    <>
      {!isRegistered ? (
        <RegistrationForm onSuccess={handleRegistrationSuccess} />
      ) : (
        <SuccessPage whatsappLink={whatsappLink} />
      )}
    </>
  );
}

export default App;
