import React, { useState, useEffect } from 'react';
import { addActivityToRoutine } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';


const AddActivityToRoutine = ({ activities, setActivities }) => {
    let navigate = useNavigate()

    let { routineId } = useParams();
    routineId = parseInt(routineId);

    const [count, setCount] = useState(null);
    const [duration, setDuration] = useState(null);
    const [activityId, setActivityId] = useState(null);

    const activityToAdd = {
        count,
        duration,
        activityId
    }

    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/activities')
        .then((response) => {
            setActivities(response.data)
            // console.log(response.data)
          })
    }, [])


    return (

        <div className='formStyle'>
            <h1>Add Activity To Routine</h1>
            <form>
                <label className='nudge'>Activity:</label>
                <select
                    onChange={(e) => setActivityId(e.target.value)}
                >
                    <option disabled selected> Select Activity </option>
                    {activities.map(activity => {
                        return (
                            <option key={activity.id} id={`${activity.id}`} value={`${activity.id}`}>
                                {`${activity.name}`}
                            </option>
                        )
                    })}
                </select>

                <label className='nudge'>Count: </label>
                <input
                    type='number'
                    required
                    onChange={(e) => setCount(e.target.value)}
                />

                <Button
                    className='nudge'
                    onClick={(e) => {
                        e.preventDefault();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Activity added to routine!',
                            showConfirmButton: false,
                            timer: 2000
                          })
                        addActivityToRoutine(routineId, activityToAdd);
                        navigate('../MyRoutines')
                    }
                    }
                >Submit</Button>
            </form>
        </div>
    )
}

export default AddActivityToRoutine;