import SignUp from '../../pages/SignUp'
import {Route, Routes} from 'react-router-dom'
import Login from '../../pages/Login'
import ClientProfile from '../../pages/ClientProfile'
import ClientIDUpload from '../../pages/ClientIDUpload'
import React, {useState} from 'react'
import MainPage from '../../pages/MainPage'
import ProviderPosts from '../../pages/ProviderPosts'
import ProviderSignup from '../../pages/ProviderSignup'
import ProviderProfile from '../../pages/ProviderProfile'

import DetailedPost from '../../pages/DetailedPost'
import ProviderCertificateUpload from '../../pages/ProviderCertificateUpload'
import ProviderIDUpload from '../../pages/ProviderIDUpload'

export default function Body(props) {

    const[pid, setPid] = useState(0);

    function changePid(id) {
        setPid(id);
    }

    return (
        <div className="p-5">
            
            <Routes>
                <Route path='' element={<MainPage/>}/>
                <Route path='signup' element={<SignUp/>}/>
                <Route path='clientprofile' element={<ClientProfile/>}/>
                <Route path='login' element={<Login updateLoginState={props.updateLoginState}/>}/>
                <Route path='clientidupload' element={<ClientIDUpload/>}/>
                <Route path='providerposts' element={<ProviderPosts changePid={changePid}/>}/>
                <Route path='providersignup' element={<ProviderSignup/>}/>
                <Route path='providercertificateupload' element={<ProviderCertificateUpload/>}/>
                <Route path='providerprofile' element={<ProviderProfile/>}/>
                <Route path='detailedpost' element={<DetailedPost pid={pid}/>}/>
                <Route path='provideridupload' element={<ProviderIDUpload/>}/>
            </Routes>
        </div>
    )
}