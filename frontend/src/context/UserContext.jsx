import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
export const UserDataContext = createContext();



const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

// Add PropTypes validation for children
UserContext.propTypes = {
    children: PropTypes.node.isRequired
  };

export default UserContext