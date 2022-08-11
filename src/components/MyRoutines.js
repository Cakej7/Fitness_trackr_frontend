import React, { useState, useEffect } from 'react';
import { getRoutinesByUser } from "../api";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Routines } from '.';



const AllMyRoutines = ({ setRoutines, setActivities, myRoutines, setMyRoutines }) => {

    // get routines by user
    useEffect(() => {
        async function fetchData() {
            const myRoutines = await getRoutinesByUser();
            console.log(myRoutines)
            setMyRoutines(myRoutines)
        }
        fetchData()
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
            <Button >Add New Routine</Button>
            </Link>
            {myRoutines.length ? 
            <div className='cardStyle'>
            {myRoutines.map(routine =>
                <Card key={routine.id} className='cardStyle'>
                    <Card.Header as="h1">{routine.name}</Card.Header>
                    <Card.Body>
                        <Link to={`/EditRoutine/${routine.id}`}>
                            <Button >Edit Routine</Button>
                        </Link>
                        <Link to={`/AddActivityToRoutine/${routine.id}`}>
                            <Button className='nudge' >Add Activity To Routine</Button>
                        </Link>
                        <Card.Title style={{fontSize: '1.5em', fontWeight: 'bold'}}>Goal: </Card.Title>
                        <Card.Text>
                            {routine.goal}
                        </Card.Text>

                        <Card.Title style={{fontSize: '1.5em', fontWeight: 'bold'}}>Creator: </Card.Title>
                        <Card.Text>
                            {routine.creatorName}
                        </Card.Text>

                        <Card.Title style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Attached Activities: </Card.Title>
                        {routine.activities.map(activity =>
                        <div key={activity.id} >
                            <p style={{fontWeight: 'bold'}}>{activity.name}</p>
                            <p>{`Description: ${activity.description}`}</p>
                            <p>{`Count: ${activity.count}`}</p>
                            <Link to={`/EditRoutineActivity/${routine.id}/${activity.id}`}>
                                <Button style={{marginBottom: '40px'}}>Edit Activity</Button>
                            </Link>
                        </div>
                    )}
                        
                    </Card.Body>
                </Card>
            )}
        </div>
        :
        <h4 style={{margin: '10px'}}>You don't have any routines! Try adding a new routine above.</h4>
            }
            
        </div>
    )
}

export default AllMyRoutines;