import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editRoutine, deleteRoutine } from '../api';
import Swal from 'sweetalert2'

const EditRoutine = ({ routines }) => {
    let navigate = useNavigate()

    let {routineId} = useParams()
    routineId = parseInt(routineId)

    const [routineToEdit] = routines.filter(routine => routine.id === routineId)
    const [name, setName] = useState(routineToEdit?.name)
    const [goal, setGoal] = useState(routineToEdit?.goal)
    const [isPublic, setIsPublic] = useState(routineToEdit?.isPublic)

    const newRoutine = {
        name,
        goal,
        isPublic
    }

    return (

        <div>
            <h1>Edit Routine</h1>
            <form>
                <label>Routine Name: </label>
                <input
                    type='text'
                    placeholder={routineToEdit?.name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Routine Goal: </label>
                <input
                    type='text'
                    placeholder={routineToEdit?.goal}
                    onChange={(e) => setGoal(e.target.value)}
                />

                <label>Private: </label>
                <input
                    type='checkbox'
                    value={routineToEdit?.isPublic}
                    onChange={(e) => setIsPublic(e.target.value)}
                />
            </form>

            <span>
                <button
                    onClick={async (e) => {
                        e.preventDefault()
                        Swal.fire({
                            title: 'Are you sure you want to delete this routine?',
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
                                'Your routine has been deleted.',
                                'success'
                            )
                            deleteRoutine(routineId)
                            navigate('../MyRoutines')
                            }
                        })
                    }}> Delete Routine
                </button>
                
                <button
                    onClick={async (e) => {
                        e.preventDefault()
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
                                'Your routine has been updated!',
                                'success'
                            )
                            editRoutine(routineId, newRoutine)
                            navigate('../MyRoutines')
                            }
                        })
                    }}>Submit Edit
                </button>
            </span>

            <div>
                <h3>{`Routine: ${routineToEdit?.name}`}</h3>
                <p>{`Goal: ${routineToEdit?.goal}`}</p>
                <p>{`Creator: ${routineToEdit?.creatorName}`}</p>
                <h4>Activities:</h4>
                {routineToEdit?.activities ?
                    routineToEdit?.activities.map(activity =>
                        <div key={activity.id}>
                            <p>{`Name: ${activity.name}`}</p>
                            <p>{`Description: ${activity.description}`}</p>
                            <p>{`Duration: ${activity.duration}`}</p>
                            <p>{`Count: ${activity.count}`}</p>
                        </div>
                    )
                    : null
                }
            </div>
        </div>
    )
}
export default EditRoutine;