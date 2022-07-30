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
    
    axios.get('/api/get_admin_status/').then(
      result => {
        console.log('Success', result.data);
        if(result.data.result === false){
          setIsAdmin(false);
          axios.get('/api/user_info/').then(
            res => {
                if(res.data.status === "failed") {
                  setIsLogin(false);
                  setIsProvider(false);
                  setIsClient(false);
                } else {
                  setIsLogin(true);
                  if(res.data.user_type === "provider") {
                    setIsProvider(true);
                  } else {
                    setIsClient(true);
                  }
                }
            }, err => {
                console.log('Error');
                setIsLogin(false);
                setIsProvider(false);
                setIsClient(false);
            }
        )
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

  const updateAdminLoginState = () => {
    axios.get('/api/get_admin_status').then(
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
    //updateAdminLoginState();
  });

  return (
    <div>
         <Navbar isLogin={isLogin} isClient={isClient} isProvider={isProvider} isAdmin={isAdmin} updateLoginState={updateLoginState} updateClientState={updateLoginState} updateProviderState={updateLoginState}/>
         <Body updateLoginState={updateLoginState}/>
    </div>
  );
}

export default App;