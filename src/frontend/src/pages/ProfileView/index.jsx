import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';
import ServicePost from '../../components/ServicePost';

export default function ProfileView() {

    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[about, setAbout] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[gravatarphoto,setGravatarPhoto] = useState("");
    const[categories, setCategories] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const[postslist, setPostsList] = useState([]);


    let profile_view = 0;


    function handleClick(pid) {
        const w = window.open('_blank');
        let url = "../../postview/" + pid;
        w.location.href = url;
    }

    useEffect(() => {
        
        axios.get("/api/user_info_by_uid/", {params:{uid: params.uid}}).then(
            resolution => {
                if (resolution.data.status === 'failed'){
                    console.log("Failed");
                } else {
                    setFirstName(resolution.data.first_name);
                    setLastName(resolution.data.last_name);
                    setAbout(resolution.data.about);
                    setEmail(resolution.data.email);
                    setPhone(resolution.data.phone);
                    setCategories(resolution.data.categories);
                    setGravatarPhoto("https://www.gravatar.com/avatar/" + resolution.data.gravatar_md5);
                }
            }, rejection => {
                console.log(rejection);
            }
        )
        axios.get("/api/get_post_list/", {params:{author: params.uid}}).then(
            result => {
                if (result.data.status === 'succeeded') {
                    setPostsList(result.data.result);
                }
                else {
                    alert('load list failed, please try again.');
                }
            }, error => {
                console.log("error")
            }
        )
    },[profile_view]);

    return (
        <div className="mdui-container">

            <div className="mdui-col mdui-p-x-6 mdui-p-y-6">
                <div class="mdui-card mdui-m-t-5">


                    <div class="mdui-card-header">
                        <img class="mdui-card-header-avatar" src={gravatarphoto} alt="gravatar"/>
                        <div class="mdui-card-header-title">{first_name} {last_name}</div>
                        <div class="mdui-card-header-subtitle">{categories}</div>
                    </div>




                    <div class="mdui-card-primary">
                        <div class="mdui-card-primary-title">Contact</div>
                        <div class="mdui-card-primary-subtitle">Email: {email}</div>
                        <div class="mdui-card-primary-subtitle">Phone: {phone}</div>
                    </div>

                    <div class="mdui-card-content">{about}</div>

                    
                </div>
            </div>
            <div className="mdui-row-lg-3 mdui-row-sm-2 mdui-row-xs-1 mdui-m-y-4">
                
                {
                    postslist.map(post => {
                        return (
                            <div className="mdui-col mdui-p-x-3 mdui-p-y-3" onClick={() => handleClick(post.pid)}>
                                <ServicePost post={post}/>
                            </div>
                        )
                    })
                }     
            </div>
        </div>
            )
}
            



                

            
            
  

