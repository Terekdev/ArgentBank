import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../redux/actions/auth.actions.jsx';
import { isValidEmail, isValidPassword } from '../utils/regex.jsx';
import '../sass/components/_Form.scss';

function Form () {
    // Déclaration des états
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setErrorMessage("Email incorrect");
            return;
        }
        if (!isValidPassword(password)) {
            setErrorMessage("Mot de passe incorrect");
            return;
        }
        if (email === '' || password === '') {
            setErrorMessage('Les champs Email et mot de passe ne doivent pas être vides');
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.body.token;
                dispatch(loginSuccess(token))// Dispatch de l'action loginSuccess pour mettre à jour le store Redux
                window.sessionStorage.setItem("token", token)
                if (rememberMe) { // Si la case "Remember me" est cochée, utilise localStorage
                    window.localStorage.setItem("token", token)
                }
                if (token){ // Si le token est valide, redirige vers la page de profil
                    navigate('/profile');
            } else {
                const error = "Incorrect email/password"
                dispatch(loginFailed(error));
            }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='sign-in-content'>
            <i className="fa-solid fa-circle-user"></i>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        id='username' 
                        type='text'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        id='password' 
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='input-remember'>
                    <input 
                        id='remember-me' 
                        type='checkbox' 
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <label htmlFor='remember-me'>Remember me</label>
                </div>
                <button className="sign-in-button">
                    Sign In
                </button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
        </section>
    )
}

export default Form