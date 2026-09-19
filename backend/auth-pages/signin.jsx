import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:5000/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);

            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            setMessage("Login successful!");

            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);

            setMessage(
                "Cannot connect to server. Make sure backend is running."
            );
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">

                <div className="amazon-logo">
                    amazon
                </div>

                <h1>Sign in</h1>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit">
                        Sign in
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <p>
                    New to Amazon?
                </p>

                <Link to="/signup">
                    <button
                        type="button"
                        className="create-account"
                    >
                        Create your Amazon account
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default SignIn;