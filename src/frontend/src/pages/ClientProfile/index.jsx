import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export default function ClientProfile() {
    const[first_name, setFirstName] = useState(null);
    const[last_name, setLastName] = useState(null);
    const[about, setAbout] = useState(null);
    const[password, setPassword] = useState(null);
    const[email, setEmail] = useState(null);
    const[phone, setPhoneNumber] = useState(null);
    const[gravatarphoto,setGravatarPhoto] = useState(null);
    const[same, setSame] = useState(true);
    const navigate = useNavigate();
    var profile_change = 0;
    
   
   
    function handleSave(){
        axios.post('/api/user_info_set/',{
            
            about: about,
            email: email,
            phone: phone,
            password: password
        }).then(
            result => {
                console.log('Success', result.data);
            }, error => {
                console.log('Error');
            }
        )
        profile_change = profile_change+ 1;
        console.log(about)
        console.log(email)
        console.log(phone)
        console.log(password)
        console.log(first_name)
        console.log(last_name)

    }


    function handleIDUpload(){
        navigate('/clientidupload');
    }
    

    function getAbout(event){
        setAbout(event.target.value);
    }
    function getFirstName(event){
        setFirstName(event.target.first_name);
    }
    function getLastName(event){
        setLastName(event.target.last_name);
    }

    function getEmail(event) {
        setEmail(event.target.value);
    }
    function getPhoneNumber(event){
        setPhoneNumber(event.target.value);
    }
    function getPassword(event) {
        setPassword(event.target.value);
    }

    function confirm(event) {
        if(event.target.value === password) {
            setSame(true);
        } else {
            setSame(false);
        }
    }

    useEffect(() => {
        axios.get('/api/user_info/').then(
            result => {
                console.log('Success', result.data);
                   if (result.data.status ==='failed'){
                       alert('Please Log in');
                       navigate('/login');
                   
                   }else {
                    setFirstName(result.data.first_name);
                    setLastName(result.data.last_name);
                    setAbout(result.data.about);
                    setEmail(result.data.email);
                    setPhoneNumber(result.data.phone);
                    setGravatarPhoto(result.data.gravatarphoto);
                    setGravatarPhoto("https://www.gravatar.com/avatar/"+{gravatarphoto});
                }
    
                
    
            }, rejection => {
                console.log('Error', rejection.data);
            }
    
        )
    },[profile_change]);
    

    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Client Profile
            </h2>

            <div class="mdui-typo">
                <hr/>
            </div>
            <div className="mdui-container">
                <div className="mdui-row">
                    <div className="mdui-card mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div class="mdui-card-header">
                            <img class="mdui-card-header-avatar" src={gravatarphoto}/>
                            <input class="mdui-textfield-input mdui-col-md-4" type="text" defaultValue={first_name} onChange={getFirstName}/>
                            <input class="mdui-textfield-input mdui-col-offset-md-4" type="text" defaultValue={last_name} onChange={getLastName}/>
                        </div>
                {/* <div className="mdui-card-media">
                <img className="mdui-img-fluid" src="https://s2.loli.net/2022/06/08/o2tTMzwHYS1RieW.png"/> */}
                        <div className="mdui-card-media">
                            <div className="mdui-card-primary">
                            </div>
                {/* </div> */}
                        </div>
                        <div class="mdui-card-actions">
                            <a className="mdui-btn mdui-color-pink-accent mdui-ripple"  href="https://en.gravatar.com/">Gravatar</a>
                        </div>
                        <div class="mdui-card-content">
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">email</label>
                            <input class="mdui-textfield-input" type="email" maxLength="32"  defaultValue={email} onChange={getEmail}/>
                            <div className="mdui-textfield-error">Wrong Email Format</div>
                        </div>

                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">phone</label>
                            <input class="mdui-textfield-input" maxLength="10" minLength="10"  defaultValue={phone} onChange={getPhoneNumber}/>
                            <div className="mdui-textfield-error">Wrong Phone Format</div>
                        </div>
                
                       
                    
                        <div className="mdui-textfield">
                            <label class="mdui-textfield-label">password</label>
                            <input class="mdui-textfield-input" type="password" maxLength="32" pattern="^.*(?=.{6,}).*$" onChange={getPassword} required/>
                            <div className="mdui-textfield-error">Password length has to be greater than 6 and less than 32!</div>
                        </div>
                        

                        
                        <div className={same?"mdui-textfield":"mdui-textfield mdui-textfield-invalid"}>
                            <label class="mdui-textfield-label">Confirm Password</label>
                            <input class="mdui-textfield-input" type="password" maxLength="32" onChange={confirm} required/>
                            <div className="mdui-textfield-error">Password must be the same</div>
                        </div>
                        
            
            
                    <div className="mdui-row">
                        <h2 className="mdui-text-center">
                            About Me
                        </h2>
                    </div>

                    <div className="mdui-row">
                        <div class="mdui-textfield mdui-m-l-2">
                            <textarea class="mdui-textfield-input" rows="4" defaultValue={about} maxLength="200" onChange={getAbout} ></textarea>
                        </div>
                    </div>

                    <div class="mdui-card-actions">
                        <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-xm-4"  mdui-dialog="{target: '#exampleDialog'}">save</button>
                        <div class="mdui-dialog" id="exampleDialog">
                        <div class="mdui-dialog-title">Are you sure?</div>
                        <div class="mdui-dialog-content">You'll edit your profile!</div>
                        <div class="mdui-dialog-actions">
                            <a class="mdui-btn mdui-ripple" mdui-dialog-confirm onClick={handleSave}>Edit</a>
                        </div>
                    </div>

                    <div className="mdui-row">
                        <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-m-t-1">
                            <a  className="mdui-btn mdui-text-color-blue" onClick={handleIDUpload}><u>Upload Your Photo ID</u></a>
                        </div>
                    </div>
                </div>
            </div>
            
            </div>
            
                
                
            </div> 
            
            </div>
            <div className="mdui-container">
            
            
            
            </div>
            
            
            
        </div>
    )
}
