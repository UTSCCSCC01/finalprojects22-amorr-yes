import SignUp from '../../pages/SignUp'
import {Route, Routes, Redirect} from 'react-router-dom'
import Login from '../../pages/Login'
import React, {useState} from 'react'
export default function Body(props) {

    return (
        <div className="p-5">
            
            <Routes>
                {/* <Route path='/about' component={About}/>
                <Route path='/market' component={Market}/>
                <Route path='/community' component={Community}/> */}
                <Route path='signup' element={<SignUp/>}/>
                <Route path='login' element={<Login updateLoginState={props.updateLoginState}/>}/>
                {/* <Redirect to='/about'/> */}
            </Routes>
        </div>
    )
}