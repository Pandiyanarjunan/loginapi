import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 export const user12 = "https://661554c2b8b8e32ffc7a9dc2.mockapi.io/user";

function Login() {
    const [obj, setObj] = useState({ name: "", password: "", gmail: "", check: false, select: "" });
    const [nmsg, setNmsg] = useState("");
    const [gmsg, setGmsg] = useState("");
    const [Pmsg, setPmsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (obj.name && obj.name.length < 6) {
            setNmsg('Username must be at least 6 characters');
        } else if (obj.name && /[!@#$%^&*()]/.test(obj.name)) {
            setNmsg('Username cannot contain special characters');
        } else {
            setNmsg('');
        }
    }, [obj.name]);

    useEffect(() => {
        if (obj.gmail && !obj.gmail.length<10){
            setGmsg("please enter more than 10 word");
        } else {
            setGmsg('');
        }
    }, [obj.gmail]);

    useEffect(() => {
        if (obj.password && obj.password.length < 7) {
            setPmsg("Please enter a password of at least 7 characters");
        } else {
            setPmsg('');
        }
    }, [obj.password]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setObj(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(user12, obj);
            navigate("/Component/services");
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };

    return (
        <div>
            <div className='form-1'>
                <form className='form-2' onSubmit={handleSubmit}>
                    <label htmlFor="name">USER NAME</label>
                    <input type="text" name="name" id="name" value={obj.name} onChange={handleChange} />
                    {nmsg && <p className='p-1'>{nmsg}</p>}

                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" name="password" id="password" value={obj.password} onChange={handleChange} />
                    {Pmsg && <p className='p-1'>{Pmsg}</p>}

                    <textarea name="gmail" id="gmail" cols="30" rows="10" value={obj.gmail} placeholder='review about us' onChange={handleChange}></textarea>
                    {gmsg && <p className='p-1'>{gmsg}</p>}

                    <label htmlFor="type" className='selectheading'>Type:</label>
                    <select id="type" name="select" className='select' value={obj.select} onChange={handleChange}>
                        <option value="metric alert">Metric Alert</option>
                        <option value="service check">Service Check</option>
                    </select>

                    <div>
                        <input type="checkbox" name="check" id="check" checked={obj.check} onChange={handleChange} />
                        <label htmlFor="check">Accept terms and conditions</label>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Login;