import React, { useState, useEffect } from 'react';
import { Button, TextareaAutosize, Link, TextField } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import './Notes.css';
import { useNavigate } from 'react-router-dom';

function FacultyNotes() {
    const BaseUrl = "https://eduversity-backend.herokuapp.com";
    const navigate = useNavigate();
    const [show,setShow]=useState(false);
    const [input, setInput]=useState({
        name:'',
        notes:'',
    }) 
    const [notes, setNotes] = useState([{
        _id:'',
        name:'',
        notes:'',
    }]);
    useEffect(()=>{
        axios.get(`${BaseUrl}/notes`).then((jsonRes)=>{setNotes(jsonRes.data)})
    })
    const handlechange = e =>{
        const {name,value} = e.target;
        setInput( prevInput => {
            return {
                ...prevInput,
                [name]:value
            }
        })
    }
    const addNotes = (e) => {
        setShow(false);
        e.preventDefault();
        if(input.name !== '' && input.notes !== ''){
            const notesdetails = {
                name: input.name,
                notes: input.notes
             }
             axios.post(`${BaseUrl}/notes`, notesdetails);
        }
        else{
            alert("Enter Notes Title/Content");
        }
    }
    const deleteNotes = (id) =>{
        axios.delete(`${BaseUrl}/notes/${id}`,id);
    }
    return (
        <div>
        {!show?(
            <div className="page">
            <Button variant="contained" color="primary" onClick={()=>setShow(true)}>Add Notes</Button> 
            <div className="notes-container">
            {notes.map(note =>
                <div className="note">
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1a-content"id="panel1a-header">
                <Typography>{note.name}</Typography>
                <DeleteIcon color="secondary" onClick={()=>deleteNotes(note._id)}/>
                </AccordionSummary>
                <AccordionDetails><Typography className="notes">{note.notes}</Typography></AccordionDetails>
                </Accordion>
                </div>
            )}
            </div><Link onClick={()=>navigate('/faculty/home')}>Go Back</Link></div>
        ):(
            <div>
            <div className="form-grp"> 
            <div className="frm"><TextField name="name" value={input.name} label="Title" required onChange={handlechange}/></div>
            <div className="frm"><TextareaAutosize className="text" name="notes" value={input.notes} label="Notes" required onChange={handlechange}/></div>
            <Button color="primary" variant="contained" onClick={addNotes}>Add</Button>
            </div>
            </div>
        )}
        </div>
    )
}

export default FacultyNotes
