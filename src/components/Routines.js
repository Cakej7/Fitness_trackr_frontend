import React, { useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


const AllRoutines = ({ routines, setRoutines }) => {

    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/routines')
        .then((response) => {
            setRoutines(response.data)
            // console.log(response.data)
            })
    }, [])


    return (
        <div className='centerDiv'>
            <h1>Public Routines</h1>
            <div className='cardStyle'>
                {routines.map(routine =>
                    <Card key={routine.id} className='cardStyle'>
                        <Card.Header as="h1">{routine.name}</Card.Header>
                        <Card.Body>
                            <Card.Title style={{fontSize: '1.5em', fontWeight: 'bold'}}>Goal: </Card.Title>
                            <Card.Text>
                            {routine.goal}
                            </Card.Text>

                            <Card.Title style={{fontSize: '1.5em', fontWeight: 'bold'}}>Creator: </Card.Title>
                            <Card.Text>
                            {routine.creatorName}
                            </Card.Text>

                            <Card.Title style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>
                                Attached Activities: </Card.Title>
                            {routine.activities.map(activity =>
                            <div key={activity.id}>
                                <p style={{fontWeight: 'bold'}}>{`${activity.name}`}</p>
                                <p>{`Description: ${activity.description}`}</p>
                                <p style={{marginBottom: '40px'}}>{`Count: ${activity.count}`}</p>
                            </div>)}
                            
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default AllRoutines;