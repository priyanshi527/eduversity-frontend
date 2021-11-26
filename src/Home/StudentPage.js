import React, {useState} from 'react';
import {Button, Link, Checkbox} from '@material-ui/core';
import './HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function StudentPage() {
    const[show,setShow]=useState(true);
    const navigate = useNavigate();
    const [classes, setClasses] = useState([{
        subject:'',
        date:'',
        startTime:'',
        endTime:''
    }]);
    const getData =(dept) =>{
        setShow(false);
        axios.get(`http://localhost:3001/classes/${dept}`).then((jsonRes)=>{setClasses(jsonRes.data)})
    }
    const notespage = () => {
        navigate('/snotes');
    }
    return (
        <div>
        {show ? (
        <div className="page">
            <h1>Select Your Branch</h1>
            <div className="branch">
            <div className="form"><input type="radio" name="dept" onChange={()=>getData('cse')}/>Computer Science and Engineering</div>
            <div className="form"><input type="radio" name="dept" onChange={()=>getData('ece')}/>Electronics and Communication Engineering</div>
            <div className="form"><input type="radio" name="dept" onChange={()=>getData('ee')}/>Electrical Engineering</div>
            <div className="form"><input type="radio" name="dept" onChange={()=>getData('me')}/>Mechanical Engineering</div>
            <div className="form"><input type="radio" name="dept" onChange={()=>getData('ce')}/>Civil Engineering</div>
            <div className="form"><input type="radio" name="dept" onChange={()=>getData('che')}/>Chemical Engineering</div>
            </div>
            <div className="btn-del"><Button color="primary" variant="contained"  onClick={()=>notespage()}> Go to Notes Page</Button></div>
        </div>
        ):(
        <div className="page">
        {classes.length ? (
            <div className="container">
            {classes.map(classdetail =>
                <div className="Card">
                    <h1>{classdetail.subject}</h1>
                    <div>Date : {classdetail.date}</div>
                    <div>{classdetail.startTime}-{classdetail.endTime}</div>
                    <Checkbox color="primary"/>Virtual
                    <Checkbox/>In-Person
                </div>)
            }
            </div>
        ):(<h1 className="page">No class Scheduled</h1>)}
        </div>)}
        <div className="link"><Link onClick={()=>setShow(true)}>Go Back</Link></div>
        </div>
    )
}

export default StudentPage
