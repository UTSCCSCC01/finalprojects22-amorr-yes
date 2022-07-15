import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import axios from 'axios';

function App() {

  const[isLogin, setIsLogin] = useState(false);
  const[isClient, setIsClient] = useState(false);
  const[isProvider, setIsProvider] = useState(false);

  const updateLoginState = () => {
    axios.get('/api/user_info/').then(
        result => {
            if(result.data.status === "failed") {
              setIsLogin(false);
              setIsProvider(false);
              setIsClient(false);
            } else {
              setIsLogin(true);
              if(result.data.user_type === "provider") {
                setIsProvider(true);
              } else {
                setIsClient(true);
              }
            }
        }, error => {
            console.log('Error');
            setIsLogin(false);
            setIsProvider(false);
            setIsClient(false);
        }
    )
  };

  useEffect(() => {
    updateLoginState();
  });

  return (
    <div>
         <Navbar isLogin={isLogin} isClient={isClient} isProvider={isProvider} updateLoginState={updateLoginState} updateClientState={updateLoginState} updateProviderState={updateLoginState}/>
         <Body updateLoginState={updateLoginState}/>
    </div>
  );
}

export default App;