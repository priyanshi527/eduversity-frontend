import React, {useState} from 'react'
import './LoginPage.css';
import '../Login.css';
import { Button, TextField, Link } from "@material-ui/core";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function StudentLoginPage() {
    const BaseUrl = "https://eduversity-backend.herokuapp.com";
    const navigate= useNavigate();
    const [show,setshow]=useState(false);
    const [input, setInput] = useState({
        username:'',
        Rollno:'',
        Password:'',
        Vaccination:'',
        Department:''
    });
    const handlechange = e =>{
        const {name,value} = e.target;
        setInput( prevInput => {
            return {
                ...prevInput,
                [name]:value
            }
        })
    }
    const register = (e) =>{
        setshow(true);
        setInput({Rollno:'',Password:'',username:''});
    }
    const checkLogin = (e) =>{
        e.preventDefault();
        const studentlogin={
            Rollno: input.Rollno,
            Password: input.Password
        }
        axios.post(`${BaseUrl}/student-login`, studentlogin).then((result)=>{
            console.log("Got the token:", result.data)
            if(result.data.status === 'ok' ){
                navigate('/student/home');
            }
            if(result.data.status === 'error' ){
                alert("Invalid Username/Password");
            }
        })
    }
    const submitValue = (e) => {
        e.preventDefault();
        if(input.username !== '' && input.Rollno !== '' && input.Password !== '' && input.Vaccination !== '' && input.Department !== ''){
            const studentdetails = {
                username: input.username,
                Rollno: input.Rollno,
                Password: input.Password,
                Vaccination: input.Vaccination,
                Department:input.Department 
            }
            axios.post(`${BaseUrl}/student`, studentdetails);
            navigate('/student/home');
        }
        else {
            alert("Please fill all the feilds");
        }
    }
    return (
        <div className="login">
        {!show ? (
        <div>
        <h1 className="heading"> STUDENT LOGIN PAGE </h1>
            <div className="form-group">
                <div className="form">Roll No.<div><TextField name="Rollno" placeholder="Roll No." value={input.Rollno} onChange={handlechange}/></div></div>
                <div className="form">Password<div><TextField name="Password" placeholder="Password" value={input.Password} onChange={handlechange}/></div></div>
                <Button onClick={checkLogin} color="primary" variant="contained">Login</Button>
                <div className="link">Or <Link onClick={register}>Register</Link></div>
            </div>            
        </div>):(
            <div>
            <h1 className="heading"> STUDENT SIGN-UP PAGE </h1>
            <div className="frm-group">
                <div className="form">Name<div><TextField  name="username" value={input.username} placeholder="UserName" onChange={handlechange}/></div></div>
                <div className="form">Roll No.<div><TextField name="Rollno" value={input.Rollno} placeholder="Roll No." onChange={handlechange}/></div></div>
                <div className="form">Password<div><TextField name="Password" value={input.Password} onChange={handlechange} placeholder="Password"/></div></div>
                <div className="form">Vaccinated:<div><input type="radio" name="Vaccination" value="yes" onChange={handlechange}/>Yes</div>
                <div><input type="radio" name="Vaccination" value="no" onChange={handlechange}/>No</div></div>
                <div className="form">Branch-
                <div><input type = "radio" name="Department" value="cse" onChange={handlechange}/>CSE</div>
                <div><input type = "radio" name="Department" vaue="ece" onChange={handlechange}/>ECE</div>
                <div><input type = "radio" name="Department" value="ee" onChange={handlechange}/>EE</div>
                <div><input type = "radio" name="Department" value="me" onChange={handlechange}/>ME</div>
                <div><input type = "radio" name="Department" value="ce" onChange={handlechange}/>CE</div>
                <div><input type = "radio" name="Department" value="che" onChange={handlechange}/>CHE</div>
                </div>   
                <Button color="primary" variant="contained" onClick={submitValue}>SignUp</Button>
                </div> 
            </div>   
        )
        }
        </div>
    )
}

export default StudentLoginPage
