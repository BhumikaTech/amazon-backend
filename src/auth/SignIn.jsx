import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");

            navigate("/");
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Cannot connect to server");
    }
};

return (
    <div className="auth-page">

        {/* Amazon Logo */}
        <Link to="/">
            <img
                className="logo"
                src="/amazon_logo_dark.png"
                width="100"
                alt="Amazon"
            />
        </Link>

        <div className="signin-container">

            <h1 className="signin-title">Sign In</h1>

            <h5 className="input-lable">
                Email or mobile phone number
            </h5>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <h5 className="input-lable">
                Password
            </h5>

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="button"
                onClick={handleLogin}
            >
                Continue
            </button>

            <p className="signin-condition">
                By continuing, you agree to Amazon's{" "}
                <span>Conditions of Use</span>
                {" "}and{" "}
                <span>Privacy Notice.</span>
            </p>

            <p className="signin-help">
                &#9656; <span>Need help</span>
            </p>

            <hr className="hr" />

            <h4 className="h4">
                Buying for work?
            </h4>

            <p className="signin-bussiness">
                <span>Shop on Amazon Bussiness</span>
            </p>

        </div>

        <div className="signin-bottom">

            <hr className="hr2" />

            <p>New to Amazon?</p>

            <hr className="hr2" />

        </div>

        <Link to="/signup">
            <button className="signin-signup">
                Create Your Amazon account
            </button>
        </Link>

        <footer>

            <div className="footer-links">
                <a href="#">Conditions of Use</a>
                <a href="#">Privacy Notice</a>
                <a href="#">Help</a>
            </div>

            <p className="copyright">
                © 1996-2026, Amazon.com, Inc. or its affiliates
            </p>

        </footer>

    </div>
);

}

export default SignIn;