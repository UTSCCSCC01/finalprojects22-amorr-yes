import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import axios from 'axios';
import { Navigate } from 'react-router';

function App() {

  const[isLogin, setIsLogin] = useState(false);
  const[isClient, setIsClient] = useState(false);
  const[isProvider, setIsProvider] = useState(false);
  const[isAdmin, setIsAdmin] = useState(false);

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

  const updateAdminLoginState = () => {
    axios.get('/api/admin_info').then(
      result => {
        if(result.data.status === "failed"){
          setIsAdmin(false);
          setIsProvider(false);
          setIsClient(false);
        } else{
          setIsLogin(true);
          setIsAdmin(true);
          setIsProvider(false);
          setIsClient(false);
        }
      }, error => {
        console.log('Error');
        alert("error");
      }
    )
  };


  useEffect(() => {
    updateLoginState();
    // updateAdminLoginState();
  });

  return (
    <div>
         <Navbar isLogin={isLogin} isClient={isClient} isProvider={isProvider} isAdmin={isAdmin} updateLoginState={updateLoginState} updateClientState={updateLoginState} updateProviderState={updateLoginState}/>
         <Body updateLoginState={updateLoginState}/>
    </div>
  );
}

export default App;