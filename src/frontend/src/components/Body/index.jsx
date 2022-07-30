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

import PostView from '../../pages/PostView'
import ProfileView from '../../pages/ProfileView'
import ClientorderHistory from '../../pages/ClientorderHistory'
import ProviderOrders from '../../pages/ProviderOrders'
import AdminPhotoId from '../../pages/AdminPhotoId'
import AdminLogin from '../../pages/AdminLogin'
import Admin from '../../pages/Admin'
import AdminCertificate from '../../pages/AdminCertificate'
import ClientOrderDetail from '../../pages/ClientOrderDetail'

export default function Body(props) {

    const[pid, setPid] = useState(0);

    function changePid(id) {
        setPid(id);
    }

    return (
        <div>
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
                <Route path='ClientorderHistory' element={<ClientorderHistory/>}/>
                <Route path='postview/:pid' element={<PostView/>}/>
                <Route path='profileview/:uid' element={<ProfileView/>}/>
                <Route path='providerOrders' element={<ProviderOrders/>}/>
                <Route path='adminlogin' element={<AdminLogin updateLoginState={props.updateLoginState}/>}/>
                <Route path='admin' element={<Admin/>}/>
                <Route path='adminphotoid' element={<AdminPhotoId/>}/>
                <Route path='admincertificate' element={<AdminCertificate/>}/>
                <Route path='adminphotoidverification' element={<AdminPhotoIdVerification/>}/>
                <Route path='admincertificateverification' element={<AdminCertificateVerification/>}/>
                {/* <Route path='admindeposit' element={<AdminDeposit/>}/> */}
                <Route path='clientorderdetail/:oid' element={<ClientOrderDetail/>}/>
            </Routes>
        </div>
    )
}