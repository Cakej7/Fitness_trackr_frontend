const APIURL = 'https://fitnesstrac-kr.herokuapp.com/api'


// gives a json web token to be passed to the server for requests requiring authentication
// export const registerNewUser = async (userObject) => {
//     try {
//         const response = await fetch (`${APIURL}/users/register`, {
//             method: "POST", 
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: userObject.user,
//                 password: userObject.password
//             }),
//         })
//         const { token } = await response.json()
//         // console.log(result)

//         localStorage.setItem('JWT', token)

//         // return result
//     } catch (err) {
//         console.error(err)
//     }
// }

// On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.
// export const loginUser = async (userObject) => {
//     try {
//         const response = await fetch(`${APIURL}/users/login`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               username: userObject.user,
//               password: userObject.password
//             }),
//           })
//         const result = await response.json()
//         console.log(result)

//         localStorage.setItem('JWT', result.token)
        
//         return result
//     } catch (err) {
//         console.error(err)
//     }
// }

// used to grab an already logged in user's relevant data. It is mostly helpful for verifying the user has a valid token (and is thus logged in). You must pass a valid token with this request, or it will be rejected.
export const isLoggedIn = async (tokenArg) => {
    try {
        const response = await fetch(`${APIURL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenArg}`,
            },
        })
        
        const result = await response.json();
        // console.log(result)
        return result; 
    } catch (err) {
        console.error(err)
    }
}

// Just returns a list of all activities in the database
// export const getAllActivities = async () => {
//     try {
//         const response = await fetch(`${APIURL}/activities`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         const result = await response.json()
//         console.log(result)
//         return result
//     } catch (err) {
//         console.log(err)
//     }
// }

// You must pass a valid token with this request, or it will be rejected.
export const createActivity = async (activity) => {
        try {
            const response = await fetch(`${APIURL}/activities`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('JWT')}`
                },
                body: JSON.stringify(activity)
            })
            const result = await response.json()
            // console.log(result)
            return result
        } catch (err) {
            console.log(err)
        }
}

// Anyone can update an activity
export const editActivity = async (activityId, activityToUpdate) => {
    try {
        const response = await fetch(`${APIURL}/activities/${activityId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(activityToUpdate)
        })
        const result = await response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// returns a list of all public routines
export const getPublicRoutines = async () => {
    try {
        const response = await fetch(`${APIURL}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// There are no request parameters, but if a token is sent in the Authorization header (and if this token's logged in user matches the user for which these routines are being requested), both public and private routines will be sent back for the requested user.
export const getRoutinesByUser = async () => {
    const user = await isLoggedIn(localStorage.getItem('JWT'))
    const username = user.username
    
        const response = await fetch(`${APIURL}/users/${username}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            },
        })

        // const result = await response.json()
        // console.log(result)

        // return result
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(console.error);
        return response;
    
}

// returns a list of public routines which feature that activity
export const getRoutinesByActivityId = async (activityId) => {
    try {
        const response = await fetch(`${APIURL}/activities/${activityId}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// You must pass a valid token with this request, or it will be rejected.
export const createRoutine = async (routine) => {
    try {
        const response = await fetch(`${APIURL}/routines`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(routine)
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// change public/private, the name, or the goal
export const editRoutine = async (routineId, routineToEdit) => {
    try {
        const response = await fetch (`${APIURL}/routines/${routineId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(routineToEdit)
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// This endpoint will hard delete a routine whose id is equal to routineId. Will also delete all the routineActivities whose routine is the one being deleted. The request will be rejected if it is either missing a valid token, or if the user represented by the token is not the user that created the original routine.
export const deleteRoutine = async (routineId) => {
    try {
        const response = await fetch (`${APIURL}/routines/${routineId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            }
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// Attaches a single activity to a routine. Prevents duplication on (routineId, activityId) pair.
export const addActivityToRoutine = async (routineId, activityToAdd) => {
    try {
        const response = await fetch (`${APIURL}/routines/${routineId}/activities`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(activityToAdd)
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// Update the count or duration on the routine activity
export const editRoutineActivity = async (routineActivityId, routineActivityToUpdate) => {
    try {
        const response = await fetch (`${APIURL}/routine_activities/${routineActivityId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(routineActivityToUpdate)
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// Remove an activity from a routine (hard deleting routine_activity), dissociating an activity from a routine.
export const deleteActivityFromRoutine = async (routineActivityId) => {
    try {
        const response = await fetch (`${APIURL}/routine_activities/${routineActivityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            }
        })
        const result = response.json()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}