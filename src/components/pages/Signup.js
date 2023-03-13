import React from 'react';

export default function Signup() {
    const handleSubmit = e=>{
        e.preventDefault();

        console.log('signup form submitted');

        if(e.target[2].value !== e.target[3].value) {
            alert('Passwords do not match.');
            e.target[2].value = "";
            e.target[3].value = "";
            return;
        }

        const url = 'http://localhost:3001/users';
        fetch(url,{
            method:"POST",
            body:{
                name:e.target[0].value.trim(),
                displayName:e.target[1].value.trim(),
                password:e.target[2].value,
                isAuth:false,
                isAdmin:false,
                organizationId:1
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
        }).catch(err=>{
            console.log(err);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required></input>
                <label htmlFor="displayName">Display Name</label>
                <input id="displayName" name="displayName" required></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required></input>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required></input>
                <button>Sign Up</button>
            </form>
        </div>
    );
}