import React, { useEffect } from 'react';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const AllActivities = ({ token, activities, setActivities, setRoutines }) => {
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/activities')
        .then((response) => {
            setActivities(response.data)
            // console.log(response.data)
          })
    }, [])

    // get routines to edit activity
    useEffect(() => {
        axios.get('https://fitnesstrac-kr.herokuapp.com/api/routines')
        .then((response) => {
            setRoutines(response.data)
            // console.log(response.data)
            })
    }, [])

    return (
        <div className='centerDiv'>
            <h1>Activities</h1>
            {token ?
            <Link to='/CreateActivity'>
                <Button>Add New Activity</Button>
            </Link>
            :
            null        
        }
            <div className='cardStyle'>
                {activities.map(activity =>
                    <Card key={activity.id} className='cardStyle'>
                        <Card.Header as="h5">{activity.name}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            {activity.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                )}
            </div>
        </div>
    )
}


export default AllActivities;