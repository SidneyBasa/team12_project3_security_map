import React from 'react';

export default function Login() {
    const handleSubmit = async e=>{
        e.preventDefault();

        console.log('login form submitted');

        const url = 'http://localhost:3001/users';
        await fetch(url,{
            method:"post",
            body:{
                name:e.target[0].value.trim(),
                password:e.target[2].value
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data.token, data.user);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required></input>
                <button>Log In</button>
            </form>
        </div>
    );
}