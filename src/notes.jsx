import React, { createContext, useState, useEffect } from 'react';
function Notes() {
    const [notes, setNotes] = useState([]);
    const [id, setId] = useState()

    const fetchNotes = async () => {
        const response = await fetch('http://localhost:5000/notes')
        const data = await response.json();
        setNotes(data)
        setId((data[data.length - 1].id) + 1)
    }
    useEffect(() => {
        fetchNotes()
    }, [])

    const addNotes = async () => {
        const request = await fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "content": document.getElementById("notes").value,
                "category": document.getElementById("category").value
            })
        })
        setId(id + 1)
        fetchNotes()
        clearInputs()
    }
    const clearInputs = () => {
        document.getElementById("notes").value = ''
        document.getElementById("category").value = ''
    }
    const deleteNote = async(id)=>{
        const deleteNotes = await fetch("http://localhost:5000/notes" + "/" + id, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            }
        })
        fetchNotes()

    }
    return (
        <div>
            <p>{notes.length === 0 ? 'Shkruani komanden "json-server -p 5000 --watch db.json" ne terminal per te aktivizuar databazen' : ''} </p>

            <ul>
                {notes.map((note) => {
                    return (
                        <div>
                            <li key={note.id}>{note.content}</li>
                            <span><button onClick={()=>{
                                deleteNote(note.id)
                            }}>deleteNote</button></span>
                            <span>{note.category}</span>
                        </div>
                    )
                })}
            </ul>

            <input type="text" name="" id="notes" placeholder='Type notes here' />
            <input type="text" name="" id="category" placeholder='Type your catgeory here' />
            <button onClick={() => {
                addNotes()
            }}>Add Note</button>
        </div>
    );
}

export default Notes;