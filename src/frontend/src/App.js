import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import axios from 'axios';

function App() {

  const[isLogin, setIsLogin] = useState(false);

  const updateLoginState = () => {
    axios.get('/api/user_info/').then(
        result => {
            if(result.status === "failed") {
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

  useEffect(() => {
    // console.log("after render")
    updateLoginState();
  });

  return (
    <div>
         <Navbar isLogin={isLogin} updateLoginState={updateLoginState}/>
         <Body updateLoginState={updateLoginState}/>
         {/* <Navbar/>
         <Body/> */}
    </div>
  );
}

export default App;