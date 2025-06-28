import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentSignup = () => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // TODO: Replace with your actual signup logic/API call
        if (studentId === '' || password === '') {
            setError('Please enter both Student ID and Password.');
            return;
        }
        try {
            // Example: await signupStudent(studentId, password);
            login();
            navigate('/');
        } catch (err) {
            setError('Signup failed.');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Student Signup</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Student ID
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            autoFocus
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default StudentSignup;