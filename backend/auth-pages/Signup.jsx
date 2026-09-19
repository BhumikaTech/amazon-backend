import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await fetch(
                "https://amazon-clone-react-rz9a.onrender.com/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Account created successfully!");
                navigate("/signin");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
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

                <h1 className="signin-title">
                    Sign Up
                </h1>

                {/* Name */}
                <h5 className="input-lable">
                    Your Name
                </h5>

                <input
                    type="text"
                    value={name}
                    placeholder="First and Last Name"
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                {/* Email */}
                <h5 className="input-lable">
                    Email
                </h5>

                <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                {/* Password */}
                <h5 className="input-lable">
                    Password
                </h5>

                <input
                    type="password"
                    value={password}
                    placeholder="At least 6 characters"
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                {/* Signup Button */}
                <button
                    type="button"
                    onClick={handleSignup}
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
                    <span>
                        Shop on Amazon Bussiness
                    </span>
                </p>

            </div>

            <div className="signin-bottom">

                <hr className="hr2" />

                <p>Have an Account?</p>

                <hr className="hr2" />

            </div>

            <Link to="/signin">
                <button className="signin-signup button">
                    Login with Amazon account
                </button>
            </Link>

            <footer>

                <div className="footer-links">

                    <div className="footer-links">
                        <a href="#">
                            Conditions of Use
                        </a>

                        <a href="#">
                            Privacy Notice
                        </a>

                        <a href="#">
                            Help
                        </a>
                    </div>

                </div>

                <p className="copyright">
                    © 1996-2026, Amazon.com, Inc. or its affiliates
                </p>

            </footer>

        </div>
    );
}

export default SignUp;