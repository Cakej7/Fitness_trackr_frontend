import React, { useState, useEffect } from 'react';
import { getRoutinesByUser } from "../api";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const AllMyRoutines = ({ setRoutines, setActivities }) => {
    const [myRoutines, setMyRoutines] = useState([]);

    // get routines by user
    useEffect(() => {
        async function fetchData() {
            const myRoutines = await getRoutinesByUser();
            setMyRoutines(myRoutines)
        }
        fetchData()
    }, [])

    // get routines
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/routines')
        .then((response) => {
            setRoutines(response.data)
            // console.log(response.data)
            })
    }, [])

    // get activities
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/activities')
        .then((response) => {
            setActivities(response.data)
            // console.log(response.data)
          })
    }, [])

    
    return (
        <div className='centerDiv'>
            <h1>My Routines</h1>
            <Link to='/CreateRoutine'>
            <button >Add New Routine</button>
            </Link>
            <div className='cardStyle'>
                {myRoutines.map(routine =>
                    // <div key={routine.id}>
                    //     <Link to={`/EditRoutine/${routine.id}`}>
                    //         <button >Edit Routine</button>
                    //     </Link>
                    //     <Link to={`/AddActivityToRoutine/${routine.id}`}>
                    //         <button >Add Activity To Routine</button>
                    //     </Link>
                        

                    //     <h3>{`Routine: ${routine.name}`}</h3>

                    //     <p>{`Goal: ${routine.goal}`}</p>
                    //     <p>{`Creator: ${routine.creatorName}`}</p>
                    //     <h4>Activities:</h4>

                    //     {routine.activities.map(activity =>
                    //         <div key={activity.id}>
                    //             <Link to={`/EditRoutineActivity/${routine.id}/${activity.id}`}>
                    //                 <button>Edit Activity</button>
                    //             </Link>
                    //             <p>{`Name: ${activity.name}`}</p>
                    //             <p>{`Description: ${activity.description}`}</p>
                    //             <p>{`Duration: ${activity.duration}`}</p>
                    //             <p>{`Count: ${activity.count}`}</p>                                
                    //         </div>
                    //     )}
                    // </div>
                    
                    <Card key={routine.id} className='cardStyle'>
                        <Card.Header as="h5">{routine.name}</Card.Header>
                        <Card.Body>
                            <Link to={`/EditRoutine/${routine.id}`}>
                            <button >Edit Routine</button>
                            </Link>
                            <Link to={`/AddActivityToRoutine/${routine.id}`}>
                            <button >Add Activity To Routine</button>
                            </Link>
                            <Card.Title>Goal: </Card.Title>
                            <Card.Text>
                            {routine.goal}
                            </Card.Text>

                            <Card.Title>Creator: </Card.Title>
                            <Card.Text>
                            {routine.creatorName}
                            </Card.Text>

                            <Card.Title>Attached Activities: </Card.Title>
                            {routine.activities.map(activity =>
                            <div key={activity.id}>
                                <Link to={`/EditRoutineActivity/${routine.id}/${activity.id}`}>
                                    Edit Activity
                                </Link>
                                <p style={{fontWeight: 'bold'}}>{activity.name}</p>
                                <p>{`Description: ${activity.description}`}</p>
                                <p>{`Duration: ${activity.duration}`}</p>
                                <p>{`Count: ${activity.count}`}</p>
                                                        
                            </div>
                        )}
                            
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default AllMyRoutines;