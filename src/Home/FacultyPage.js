import { Button , Link, TextField} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

function FacultyPage() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(false);
    const handleClose = () =>setShow(true);
    const [deptshow,setDeptshow]=useState(true);
    const [dept,setDept]= useState('');
    const [input, setInput] = useState({
        subject:'',
        date:'',
        startTime:'',
        endTime:'',
        classCapacity:''
    });
    const navigate=useNavigate();
    const [classes, setClasses] = useState([{
        _id:'',
        subject:'',
        date:'',
        startTime:'',
        endTime:'',
        classCapacity:''
    }]);
    const getpage = () =>{
        axios.get(`http://localhost:3001/classes/${dept}`).then((jsonRes)=>{setClasses(jsonRes.data)})
    }
    useEffect(()=>{
        getpage();
    })
    const getData =(dept) =>{
        setDept(dept);
        setDeptshow(false);
    }
    const handlechange = e =>{
        const {name,value} = e.target;
        setInput( prevInput => {
            return {
                ...prevInput,
                [name]:value
            }
        })
    }
    const addClass = (e) => {
        e.preventDefault();
        if(input.subject !=='' && input.date !== '' && input.startTime !== '' && input.endTime !== '' && input.classCapacity !== ''){
            handleShow();
            const classdetails = {
                subject: input.subject,
                date: input.date,
                startTime: input.startTime,
                endTime: input.endTime ,
                classCapacity: input.classCapacity
            }
            axios.post(`http://localhost:3001/classes/${dept}`, classdetails);
            setInput({
                subject:'',
                date:'',
                startTime:'',
                endTime:'',
                classCapacity:''
            })
        }
        else{
            alert("Please Fill all the details");
        }
    }
    const notespage = () => {
        navigate('/notes');
    }
    function deleteClass(id){
        axios.delete(`http://localhost:3001/classes/${dept}/${id}`,id);
    }
    return (
        <div>
        {deptshow ? (
        <div className="page">
            <h1>Select Your Department</h1>
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
            <div>         
            {show ? (    
            <div className="form-grp">
            <div className="frm"><TextField name="subject" value={input.subject} label="Subject" required onChange={handlechange}/></div>
            <div className="frm"><TextField name="date" value={input.date} label="Date" placeholder="dd/mm/yyyy" required onChange={handlechange}/></div>
            <div className="frm"><TextField name="startTime" value={input.startTime} placeholder="hh:mm am/pm" required onChange={handlechange} label="StartTime"/></div>
            <div className="frm"><TextField name="endTime" value={input.endTime} placeholder="hh:mm am/pm" required onChange={handlechange} label="EndTime"/></div>
            <div className="frm"><TextField name="classCapacity" value={input.classCapacity} required onChange={handlechange} label="Class Capacity"/></div>
            <Button color="primary" variant="contained" onClick={addClass}>Add</Button>
            </div>):(
                <div className="page">
                <Button variant="contained" color="primary" onClick={handleClose}>Add Class</Button>
                <div className="container">
                {classes.map(classdetail =>
                <div className="Card">
                    <h1>{classdetail.subject}</h1>
                    <div>Date : {classdetail.date}</div>
                    <div>{classdetail.startTime}-{classdetail.endTime}</div>
                    <div className="btn-del"><Button color="secondary" variant="contained" onClick={()=>deleteClass(classdetail._id)}>Delete</Button></div>
                </div>)
                }
                </div>
                <div className="link"><Link onClick={()=>setDeptshow(true)}>Go Back</Link></div>
                </div>    
            )}
            </div>)}
        </div>
    )}


export default FacultyPage
