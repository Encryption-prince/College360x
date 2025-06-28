import { createContext, useState } from 'react';

export const StudentDataContext = createContext();

const StudentContext = ({ children }) => {
    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateStudent = (studentData) => {
        setStudent(studentData);
    };

    const value = {
        student
    };

    return (
        <StudentDataContext.Provider value={value}>
            {children}
        </StudentDataContext.Provider>
    );
};

export default StudentContext;
