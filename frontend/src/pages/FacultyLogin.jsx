import React, { useState } from 'react';

const FacultyLogin = () => {
    const [facultyId, setFacultyId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Replace with your actual login logic/API call
        if (facultyId === '' || password === '') {
            setError('Please enter both Faculty ID and Password.');
            return;
        }
        try {
            // Example: await loginFaculty(facultyId, password);
            alert('Login successful (mock)');
        } catch {
            setError('Invalid Faculty ID or Password.');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Faculty Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Faculty ID:
                        <input
                            type="text"
                            value={facultyId}
                            onChange={(e) => setFacultyId(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            autoFocus
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                        />
                    </label>
                </div>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
            </form>
        </div>
    );
};

export default FacultyLogin;