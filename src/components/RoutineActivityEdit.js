import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editRoutineActivity, deleteActivityFromRoutine } from '../api';
import axios from 'axios';
import Swal from 'sweetalert2';



const EditRoutineActivityForm = ({ routines, setActivities, setRoutines }) => {
    // get activities
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/activities')
        .then((response) => {
            setActivities(response.data)
            // console.log(response.data)
          })
    }, [])

    // get routines
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/routines')
        .then((response) => {
            setRoutines(response.data)
            // console.log(response.data)
            })
    }, [])

    let navigate = useNavigate()

    let { routineId, activityId } = useParams();
    routineId = parseInt(routineId);
    activityId = parseInt(activityId);

    

    const [duration, setDuration] = useState('');
    const [count, setCount] = useState('');
    const [routineToEdit] = routines.filter(routine => routine.id === routineId);
    // console.log(routines)
    const [routineActivityToEdit] = routineToEdit.activities.filter(activity => activity.id === activityId)
    const routineActivityIdToEdit = routineActivityToEdit.routineActivityId;

    const newRoutineActivityInfo = {
        count,
        duration
    }


    return (

        <div>
            <h1>Edit Activity</h1>
            <p>{`Name: ${routineActivityToEdit.name}`}</p>
            <p>{`Description: ${routineActivityToEdit.description}`}</p>
            <form>
                <label>Duration: </label>
                <input
                    type='number'
                    onChange={(e) => { setDuration(e.target.value) }}
                />
                <label>Count: </label>
                <input
                    type='number'
                    onChange={(e) => { setCount(e.target.value) }}
                />

                <button
                        onClick={(e) => {
                            e.preventDefault();
                            Swal.fire({
                                title: 'Submit these changes?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, looks good!'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire(
                                    'Success!',
                                    'Your routine-activity has been updated!',
                                    'success'
                                  )
                                    editRoutineActivity(routineActivityIdToEdit, newRoutineActivityInfo)
                                    navigate('../MyRoutines')
                                }
                              })
                        }}> Submit Changes
                </button>          
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        Swal.fire({
                            title: 'Are you sure you want to remove this activity from the routine?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                'Deleted!',
                                'Your Routine has been deleted.',
                                'success'
                              )
                                deleteActivityFromRoutine(routineActivityIdToEdit)
                                navigate('../MyRoutines')
                            }
                          })
                    }}>Remove Activity From Routine
                </button> 
            </form>
        </div>
    )
}
export default EditRoutineActivityForm;