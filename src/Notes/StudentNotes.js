import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useNavigate } from 'react-router-dom';

function StudentNotes() {
    const BaseUrl = "https://eduversity-backend.herokuapp.com";
    const navigate = useNavigate();
    const [notes, setNotes]=useState([{
        name:'',
        notes:'',
    }]) 
    useEffect(()=>{
        axios.get(`${BaseUrl}/notes`).then((jsonRes)=>{setNotes(jsonRes.data)})
    },[])
    return (
        <div className="page">
        <h1>NOTES</h1>
        {notes.length ?(        
        <div className="notes-container">
            {notes.map(note =>
                <div className="note">
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}aria-controls="panel1a-content"id="panel1a-header">
                <Typography>{note.name}</Typography>
                </AccordionSummary>
                <AccordionDetails><Typography className="notes">{note.notes}</Typography></AccordionDetails>
                </Accordion>
                </div>
            )}
        </div>):(
            <h3>No Notes Availaible</h3>
        )}
        <div className="link"><Link onClick={()=>navigate("/student/home")}>Go Back</Link></div>  
        </div>
    )
}

export default StudentNotes
