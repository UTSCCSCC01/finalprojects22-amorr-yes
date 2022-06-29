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
            console.log(result);
            if(result.data.status === "failed") {
              setIsLogin(false);
            } else {
              setIsLogin(true);
            }
        }, error => {
            console.log('Error');
            setIsLogin(false);
        }
    )
  };

  const updateClientState = () =>{
    axios.get('/api/user_info/').then(
      result => {
          console.log(result);
          if(result.data.status === "failed") {
            setIsClient(false);
          } else if(result.data.user_type === "provider"){
            setIsClient(false);
          } else {
            setIsClient(true);
          }
      }, error => {
          console.log('Error');
          setIsClient(false);
      }
    )
  };

  const updateProviderState = () =>{
    axios.get('/api/user_info/').then(
      result => {
          console.log(result);
          if(result.data.status === "failed") {
            setIsProvider(false);
          } else if(result.data.user_type === "client"){
            setIsProvider(false);
          } else {
            setIsProvider(true);
          }
      }, error => {
          console.log('Error');
          setIsProvider(false);
      }
    )
  };

  useEffect(() => {
    console.log(isLogin);
    updateLoginState();
    updateClientState();
    updateProviderState();
  });

  return (
    <div>
         <Navbar isLogin={isLogin} isClient={isClient} isProvider={isProvider} updateLoginState={updateLoginState} updateClientState={updateClientState} updateProviderState={updateProviderState}/>
         <Body updateLoginState={updateLoginState}/>
         {/* <Navbar/>
         <Body/> */}
    </div>
  );
}

export default App;