import { createContext, useState } from 'react';

export const FacultyDataContext = createContext();

const FacultyContext = ({ children }) => {
    const [faculty, setFaculty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateFaculty = (facultyData) => {
        setFaculty(facultyData);
    };

    const value = {
        faculty,
        isLoading,
        error,
        updateFaculty,
        setIsLoading,
        setError
    };

    return (
        <FacultyDataContext.Provider value={value}>
            {children}
        </FacultyDataContext.Provider>
    );
};
export default FacultyContext;