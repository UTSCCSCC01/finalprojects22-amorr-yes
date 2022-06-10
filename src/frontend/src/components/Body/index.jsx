import SignUp from '../../pages/SignUp'
import {Route, Routes, Redirect} from 'react-router-dom'
import Login from '../../pages/Login'
import ClientProfile from '../../pages/ClientProfile'
import ClientIDUpload from '../../pages/ClientIDUpload'
import React, {useState} from 'react'
export default function Body(props) {
    return (
        <div className="p-5">
            
            <Routes>
                {/* <Route path='/about' component={About}/>
                <Route path='/market' component={Market}/>
                <Route path='/community' component={Community}/> */}
                <Route path='signup' element={<SignUp/>}/>
                <Route path='clientprofile' element={<ClientProfile/>}/>
                <Route path='login' element={<Login updateLoginState={props.updateLoginState}/>}/>
                <Route path='clientidupload' element={<ClientIDUpload/>}/>
                {/* <Redirect to='/about'/> */}
            </Routes>
        </div>
    )
}