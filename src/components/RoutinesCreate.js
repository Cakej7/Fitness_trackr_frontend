import React, { useState } from 'react';
import { createRoutine } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateRoutineForm = ({ routines, setRoutines }) => {
    const [name, setRoutineName] = useState('');
    const [goal, setRoutineGoal] = useState('');
    const [isPublic, setRoutineIsPublic] = useState(true);
    let navigate = useNavigate()


    let newRoutine = {
        name,
        goal,
        isPublic
    }

    return (

        <div className='formStyle'>
            <h1 >Add New Routine</h1>
            <form>
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

                <button
                    className='nudge'
                    onClick={async (e) => {
                        e.preventDefault();
                        const routineToAdd = await createRoutine(newRoutine);
                        setRoutines([...routines, routineToAdd]);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Routine created successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        navigate('../MyRoutines')
                    }}>
                    Submit
                </button>
            </form>
        </div>
    )
}
export default CreateRoutineForm;