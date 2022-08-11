import React, { useState } from 'react';
import { createRoutine } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';

const CreateRoutineForm = ({ routines, setRoutines }) => {
    const [name, setRoutineName] = useState('');
    const [goal, setRoutineGoal] = useState('');
    let navigate = useNavigate()


    let newRoutine = {
        name,
        goal
    }

    const handleCreateRoutine = async (e) => {
            e.preventDefault();
            const routineToAdd = await createRoutine(newRoutine);
            console.log(newRoutine)
            setRoutines([...routines, routineToAdd]);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Routine created successfully',
                showConfirmButton: false,
                timer: 1500
                })
            navigate('../MyRoutines')
    }

    return (

        <div className='formStyle'>
            <h1 >Add New Routine</h1>
            <form onSubmit={handleCreateRoutine}>
                <label className='nudge'>Routine Name: </label>
                <input
                    type="text"
                    required
                    onChange={(e) => { setRoutineName(e.target.value) }}
                />

                <label className='nudge'>Routine Goal: </label>
                <input
                    type="text"
                    required
                    onChange={(e) => { setRoutineGoal(e.target.value) }}
                />
                
                <Button
                    className='nudge'
                    type='submit'
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}
export default CreateRoutineForm;