import React, { useState } from 'react';
import { createActivity } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';


const CreateActivityForm = ({ activities, setActivities}) => {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    let navigate = useNavigate()

    let newActivity = {
        name,
        description
    }

// Send an error if the activity name already exists
    return (
        <div className='formStyle'>
            <h1>Add New Activity</h1>
            <form>
                <label className='nudge'>Activity Name: </label>
                <input
                    type='text'
                    required
                    onChange={(e) => { setName(e.target.value) }}
                />

                <label className='nudge'>Activity Description: </label>
                <input
                    type='text'
                    onChange={(e) => { setDescription(e.target.value) }}
                />
                
                <Button
                    className='nudge'
                    onClick={async (e) => {
                        e.preventDefault()
                        const activityToAdd = createActivity(newActivity);
                        setActivities([...activities, activityToAdd]);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Activity created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('../Activities')
                    }}>Create
                </Button>

            </form>
        </div>
    )
}

export default CreateActivityForm;