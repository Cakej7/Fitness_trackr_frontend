import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editRoutineActivity, deleteActivityFromRoutine } from '../api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { getRoutinesByUser } from "../api";

const EditRoutineActivityForm = ({ setActivities, myRoutines, setMyRoutines }) => {
    // get activities
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/activities')
        .then((response) => {
            setActivities(response.data)
            // console.log(response.data)
          })
    }, [])

    // get routines by user
    useEffect(() => {
      async function fetchData() {
          const mine = await getRoutinesByUser();
          // console.log(mine)
          setMyRoutines(mine)
      }
      fetchData()
  }, [])

    // console.log(editRoutineActivity(count))

    let navigate = useNavigate()

    let { routineId, activityId } = useParams();
    routineId = parseInt(routineId);
    activityId = parseInt(activityId);

    const [routineToEdit] = myRoutines.filter((routine) => {
      return routine.id === routineId
    });
    
    const [routineActivityToEdit] = routineToEdit.activities.filter(activity => activity.id === activityId)
    const routineActivityIdToEdit = routineActivityToEdit.routineActivityId;
    const [count, setCount] = useState('');
    

    const newRoutineActivityInfo = {
        count
    }

    const handleEditSubmit = (e) => {
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
              'The count has been updated!',
              'success'
            )
              editRoutineActivity(routineActivityIdToEdit, newRoutineActivityInfo)
              navigate('../MyRoutines')
          }
        })
    }


    return (

        <div className='formStyle'>
            <h1>Edit Activity</h1>
            <p>{`Name: ${routineActivityToEdit.name}`}</p>
            <p>{`Description: ${routineActivityToEdit.description}`}</p>
            <form onSubmit={handleEditSubmit}>
                <label className='nudge'>Count: </label>
                <input
                    type='number'
                    required
                    placeholder={routineActivityToEdit.count}
                    onChange={(e) => { setCount(e.target.value) }}
                />

                <Button
                        className='nudge'
                        type='submit'
                > Change Count
                </Button>          
                <Button 
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
                </Button> 
            </form>
        </div>
    )
}
export default EditRoutineActivityForm;