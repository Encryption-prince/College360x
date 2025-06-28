import React, { useState } from "react";

const FacultySignup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!form.name || !form.email || !form.password || !form.department) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            // Replace with your API endpoint
            // await api.post("/faculty/signup", form);
            setSuccess(true);
            setForm({ name: "", email: "", password: "", department: "" });
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto" }}>
            <h2>Faculty Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        type="text"
                        required
                    />
                </div>
                {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
                {success && (
                    <div style={{ color: "green", marginTop: 8 }}>
                        Signup successful!
                    </div>
                )}
                <button type="submit" style={{ marginTop: 16 }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default FacultySignup;