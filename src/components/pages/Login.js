import React from 'react';

export default function Login() {
    const handleSubmit = async e=>{
        e.preventDefault();

        const url = 'http://localhost:3001/users/login';
        await fetch(url,{
            method:"post",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:e.target[0].value.trim(),
                password:e.target[1].value
            })
        }).then(res=>{
            return res.json();
        }).then(data=>{
            localStorage.setItem('securitymap_login_token', data.token);
            localStorage.setItem('securitymap_login_userId', data.user.id);
        }).catch(err => {
            console.log(err);
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