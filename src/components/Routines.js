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
                    // <div key={routine.id}>
                    //     <h2>{`Routine: ${routine.name}`}</h2>
                    //     <p>{`Goal: ${routine.goal}`}</p>
                    //     <p>{`Creator: ${routine.creatorName}`}</p>
                    //     <h4>Activities:</h4>
                    //     {routine.activities.map(activity =>
                    //         <div key={activity.id}>
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
                            <Card.Title>Goal: </Card.Title>
                            <Card.Text>
                            {routine.goal}
                            </Card.Text>

                            <Card.Title>Creator: </Card.Title>
                            <Card.Text>
                            {routine.creatorName}
                            </Card.Text>

                            <Card.Title>Activities: </Card.Title>
                            {routine.activities.map(activity =>
                            <div key={activity.id}>
                                <p style={{fontWeight: 'bold'}}>{`${activity.name}`}</p>
                                <p>{`Description: ${activity.description}`}</p>
                                <p>{`Duration: ${activity.duration}`}</p>
                                <p>{`Count: ${activity.count}`}</p>
                            </div>)}
                            
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default AllRoutines;