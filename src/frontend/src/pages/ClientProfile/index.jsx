import React, {useState} from 'react'
import axios from 'axios'
export default function ClientProfile() {
    const[about, setAbout] = useState(null);
    const[selfdescription, setSelfDescription] = useState(null);
    const[email, setEmail] = useState(null);
    const[phonenumber, setPhoneNumber] = useState(null);

    function handleProUpload(){

    }
    function handleSave(){
         axios.get('/api/signup/', {
            About: about,
            Self_Description: selfdescription,
            email: email,
            phone_number: phonenumber
        }).then(
            result => {
                console.log('Success', result.data);
            }, error => {
                console.log('Error');
            }
        )
        console.log(about)
        console.log(selfdescription)
        console.log(email)
        console.log(phonenumber)

    }
    function handleIDUpload(){

    }
    //function handleSignUp() {
        // axios.get('/api/signup/', {
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password: password
        // }).then(
        //     result => {
        //         console.log('Success', result.data);
        //     }, error => {
        //         console.log('Error');
        //     }
        // )
        // console.log(firstName)
        // console.log(lastName)
        // console.log(email)
        // console.log(password)
    //}

    function getAbout(event){
        setAbout(event.target.value);
    }
    function getSelfDescription(event){
        setSelfDescription(event.target.value);
    }

    function getEmail(event) {
        setEmail(event.target.value);
    }
    function getPhoneNumber(event){
        setPhoneNumber(event.target.value);
    }
    

    

    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Client Profile
            </h2>

            <div class="mdui-typo">
                <hr/>
            </div>
            <div className="mdui-container">
            <div class="mdui-row">
            <div class="mdui-card mdui-col-xs-6 mdui-col-sm-6">
                <div class="mdui-card-media">
                <img src="https://s2.loli.net/2022/06/08/o2tTMzwHYS1RieW.png" style={{maxWidth:600, height:200}}/>
                <div class="mdui-card-media-covered">
                <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">User Name</div>
                <img class="mdui-card-header-avatar" src="https://s2.loli.net/2022/06/08/o2tTMzwHYS1RieW.png" style={{maxWidth:100, height:'auto'}}/>
                </div>
                </div>
                </div>
                <div class="mdui-card-actions">
                    <button className="mdui-btn mdui-color-pink-accent mdui-ripple" onClick={handleProUpload}>Upload</button>
                </div>
            <div class="mdui-card-content">
            {/* <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Email</label>
                    <input className="mdui-textfield-input" type="email" maxLength="32" onChange={getEmail} required/>
                    <div className="mdui-textfield-error">Wrong Email Format</div>
                </div> */}
                <div class="mdui-textfield">
                    <i class="mdui-icon material-icons">email</i>
                    <label class="mdui-textfield-label">email</label>
                    <input class="mdui-textfield-input" type="email" maxLength="32" placeholder="xxx@xxx" onChange={getEmail} required/>
                    <div className="mdui-textfield-error">Wrong Email Format</div>
                </div>
                <div class="mdui-textfield">
                    <i class="mdui-icon material-icons">phone_number</i>
                    <label class="mdui-textfield-label">phone</label>
                    <input class="mdui-textfield-input" maxLength="10" minLength="10"  placeholder="6470000000" onChange={getPhoneNumber} required/>
                    <div className="mdui-textfield-error">Wrong Phone Format</div>
                </div>
            </div>
            
            </div>
            
                
                <h2 className="mdui-text-left">
                Your Photo ID
            </h2>
                     <div class="mdui-col-xs-6 mdui-col-sm-6">
                <img class="mdui-img" src="https://s2.loli.net/2022/06/08/o2tTMzwHYS1RieW.png" style={{maxWidth:200, height:'auto'}}/>
                <div className="mdui-row">
                <div className="mdui-col-xs-4">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleIDUpload}>Upload</button>
                </div>
                </div>
            </div>
            <div>
            <div class="mdui-col-xs-6">
                <h2 className="mdui-text-left">
                   Self Description
            </h2>
            </div>
            <div class="mdui-col-xs-6 mdui-col-sm-6">
                <div class="mdui-textfield">
                    <textarea class="mdui-textfield-input" rows="1" placeholder="str_sd" maxLength="100" onChange={getAbout} required></textarea>
                  </div>
                 
                  
           
                
                </div>
            <h2 className="mdui-text-left">
                About Me
            </h2>
            </div>
            <div class="mdui-col-xs-6 mdui-col-sm-6">
                <div class="mdui-textfield">
                    <textarea class="mdui-textfield-input" rows="3" placeholder="More details about me" maxLength="200" onChange={getSelfDescription} required></textarea>
                  </div>
                  </div>
            </div>
            
            </div>
            <div className="mdui-container">
            {/* <div class="mdui-rows">
            <button className="mdui-btn  mdui-color-pink-accent mdui-ripple" onClick={handleSave}>
                Save
                </button>
                </div> */}
            <button class="mdui-btn mdui-ripple mdui-color-pink-accent" mdui-dialog="{target: '#exampleDialog'}">save</button>
            <div class="mdui-dialog" id="exampleDialog">
                <div class="mdui-dialog-title">Are you sure?</div>
                <div class="mdui-dialog-content">You'll edit your profile!</div>
                 <div class="mdui-dialog-actions">
                     <button class="mdui-btn mdui-ripple" mdui-dialog-close>Cancel</button>
                     <button class="mdui-btn mdui-ripple" mdui-dialog-confirm onClick={handleSave}>Edit</button>
                     </div>
                </div>
            
            </div>
            
            
            {/* <div class="mdui-row">
                <div class="mdui-col-xs-6 mdui-col-sm-6">
                   <h2 className="mdui-text-left">
                   Your Profile
            </h2>
                </div>
                <div class="mdui-col-xs-6 mdui-col-sm-6">
                <h2 className="mdui-text-left">
                   Self Description
            </h2>
                
                
                </div>
           </div>
            
                 <div className="mdui-row">
                     <div class="mdui-col-xs-6 mdui-col-sm-6">
                <img class="mdui-img" src="https://s2.loli.net/2022/06/08/o2tTMzwHYS1RieW.png" style={{maxWidth:300, height:'auto'}}/>
                </div>
                <div class="mdui-col-xs-6 mdui-col-sm-6">
                <div class="mdui-textfield">
                    <textarea class="mdui-textfield-input" rows="6" placeholder="Message" maxLength="200" onChange={getSelfDescription} required></textarea>
                  </div>
                  </div>
                </div>
             
             <div className="mdui-row">
                <div className="mdui-col-xs-4">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleProUpload}>Upload</button>
                </div>
            </div>
            <div className="mdui-row">
            <div class="mdui-col-xs-6 mdui-col-sm-6">
                   <h2 className="mdui-text-left">
                   Your Photo ID
            </h2>
                </div>
                <div class="mdui-col-xs-6 mdui-col-sm-6">
                <h2 className="mdui-text-left">
                   About
            </h2>
                
                
                </div>
           </div>
            
                 <div className="mdui-row">
                     <div class="mdui-col-xs-6 mdui-col-sm-6">
                <img class="mdui-img" src="https://s2.loli.net/2022/06/08/o2tTMzwHYS1RieW.png" style={{maxWidth:300, height:'auto'}}/>
                </div>
                <div class="mdui-col-xs-6 mdui-col-sm-6">
                <div class="mdui-textfield">
                    <textarea class="mdui-textfield-input" rows="6" placeholder="About yourself" maxLength="200" onChange={getAbout} require></textarea>
                  </div>
                  </div>

            </div>
            <div className="mdui-row">
                <div className="mdui-col-xs-4">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleIDUpload}>Upload</button>
                </div>
            </div>
            
                  
                     
         
            
            
    

            


            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Email</label>
                    <input className="mdui-textfield-input" type="email" maxLength="32" onChange={getEmail} required/>
                    <div className="mdui-textfield-error">Wrong Email Format</div>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Phone Number</label>
                    <input className="mdui-textfield-input" type="phonenumber" maxLength="10" minLength="10" onChange={getPhoneNumber} required/>
                    <div className="mdui-textfield-error">Wrong Phone number Format</div>
                </div>
            </div>

            
            

             

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleSave}>Save</button>
                </div>
            </div> */}
        </div>
    )
}
