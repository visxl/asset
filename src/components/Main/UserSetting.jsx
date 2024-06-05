import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import { Card, Typography } from '@material-tailwind/react';

const UserSetting = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');

    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [skill4, setSkill4] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [description4, setDescription4] = useState('');
    const [description5, setDescription5] = useState('');
    const [experience1, setExperience1] = useState('');
    const [experience2, setExperience2] = useState('');
    const [experience3, setExperience3] = useState('');
    const [experience4, setExperience4] = useState('');
    const [workplace1, setWorkplace1] = useState('');
    const [workplace2, setWorkplace2] = useState('');
    const [workplace3, setWorkplace3] = useState('');
    const [workplace4, setWorkplace4] = useState('');
    const [year1, setYear1] = useState('');
    const [year2, setYear2] = useState('');
    const [year3, setYear3] = useState('');
    const [year4, setYear4] = useState('');

    const navigate = useNavigate();

    // Fetch the current user ID from localStorage
    const userId = localStorage.getItem('user_id');

    // Handle save and update button
    const saveAndupdateUser = (e) => {
        e.preventDefault();

        const user = { name, role, phoneNo, email, skill1, skill2, skill3, skill4, description1, description2, description3, description4, description5, experience1, experience2, experience3, experience4, workplace1, workplace2, workplace3, workplace4, year1, year2, year3, year4 };

        if (userId) {
            UserService.updateUser(userId, user)
                .then((response) => {
                    console.log(response.data);
                    navigate('/users/profile/' + userId);
                })
                .catch((error) => {
                    console.log('Error updating user by ID:', error);
                });
        } else {
            UserService.createUser(user)
                .then((response) => {
                    console.log(response.data);
                    navigate('/users');
                })
                .catch((error) => {
                    console.log('Error creating user:', error);
                });
        }
    };

    useEffect(() => {
        if (userId) {
            UserService.getUserById(userId)
                .then((response) => {
                    setName(response.data.name);
                    setRole(response.data.role);
                    setPhoneNo(response.data.phoneNo);
                    setEmail(response.data.email);
                    setSkill1(response.data.skill1);
                    setSkill2(response.data.skill2);
                    setSkill3(response.data.skill3);
                    setSkill4(response.data.skill4);
                    setDescription1(response.data.description1);
                    setDescription2(response.data.description2);
                    setDescription3(response.data.description3);
                    setDescription4(response.data.description4);
                    setDescription5(response.data.description5);
                    setExperience1(response.data.experience1);
                    setExperience2(response.data.experience2);
                    setExperience3(response.data.experience3);
                    setExperience4(response.data.experience4);
                    setWorkplace1(response.data.workplace1);
                    setWorkplace2(response.data.workplace2);
                    setWorkplace3(response.data.workplace3);
                    setWorkplace4(response.data.workplace4);
                    setYear1(response.data.year1);
                    setYear2(response.data.year2);
                    setYear3(response.data.year3);
                    setYear4(response.data.year4);
                })
                .catch(error => {
                    console.error('Error fetching user by ID:', error);
                });
        }
    }, [userId]);

    return (
        <Card className='w-full h-full rounded-xl p-5 pb-32 shadow-lg justify-self-center'>
            <Typography className="text-xl font-bold mb-6">
                User Setting
            </Typography>

            <form className="max-w-screen-2xl grid grid-cols-3 sm:grid-cols-8 gap-6 p-5 self-center">
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Name:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Role:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="Assetname"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Email:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="brand"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Phone Number:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="model"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Skill:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="code"
                        value={skill1}
                        onChange={(e) => setSkill1(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Skill:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="code"
                        value={skill2}
                        onChange={(e) => setSkill2(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Skill:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="code"
                        value={skill3}
                        onChange={(e) => setSkill3(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Skill:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="skill4"
                        value={skill4}
                        onChange={(e) => setSkill4(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-8">
                        <Typography className="text-lg mb-1">
                            About me:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full h-40 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description1"
                        value={description1}
                        onChange={(e) => setDescription1(e.target.value)}
                    />
                    </div>
                    
                    {/* ex 1 */}
                    <div className="sm:col-span-3">
                        <Typography className="text-lg mb-1">
                            Experience:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="experience1"
                        value={experience1}
                        onChange={(e) => setExperience1(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Workplace:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="workplace1"
                        value={workplace1}
                        onChange={(e) => setWorkplace1(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Description:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description2"
                        value={description2}
                        onChange={(e) => setDescription2(e.target.value)}
                    />
                    </div><div className="sm:col-span-1">
                        <Typography className="text-lg mb-1">
                            Year:
                        </Typography>
                        <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="year1"
                        value={year1}
                        onChange={(e) => setYear1(e.target.value)}
                    />
                    </div>

                    {/* ex 2 */}
                    <div className="sm:col-span-3">
                        <Typography className="text-lg mb-1">
                            Experience:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="experience2"
                        value={experience2}
                        onChange={(e) => setExperience2(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Workplace:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="office"
                        value={workplace2}
                        onChange={(e) => setWorkplace2(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Description:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description3"
                        value={description3}
                        onChange={(e) => setDescription3(e.target.value)}
                    />
                    </div><div className="sm:col-span-1">
                        <Typography className="text-lg mb-1">
                            Year:
                        </Typography>
                        <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="year2"
                        value={year2}
                        onChange={(e) => setYear2(e.target.value)}
                    />
                    </div>
                    {/* ex 3 */}
                    <div className="sm:col-span-3">
                        <Typography className="text-lg mb-1">
                            Experience:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="experience3"
                        value={experience3}
                        onChange={(e) => setExperience3(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Workplace:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="workplace3"
                        value={workplace3}
                        onChange={(e) => setWorkplace3(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Description:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description4"
                        value={description4}
                        onChange={(e) => setDescription4(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-1">
                        <Typography className="text-lg mb-1">
                            Year:
                        </Typography>
                        <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="year3"
                        value={year3}
                        onChange={(e) => setYear3(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-3">
                        <Typography className="text-lg mb-1">
                            Experience:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="experience4"
                        value={experience4}
                        onChange={(e) => setExperience4(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Workplace:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="workplace4"
                        value={workplace4}
                        onChange={(e) => setWorkplace4(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Description:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description5"
                        value={description5}
                        onChange={(e) => setDescription5(e.target.value)}
                    />
                    </div><div className="sm:col-span-1">
                        <Typography className="text-lg mb-1">
                            Year:
                        </Typography>
                        <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="year4"
                        value={year4}
                        onChange={(e) => setYear4(e.target.value)}
                    />
                    </div>
                    
                    <div className="sm:col-span-2 py-3">
                        <button onClick= {(e) => saveAndupdateUser(e)} className='w-28 mt-6 focus:outline-none text-white bg-blue-700 hover:bg-blue-300 rounded-lg  text-sm px-5 py-2.5 me-2 mb-2 '>
                            Save
                        </button>
                        <Link to={`/users`} className='w-16 mt-5 focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-3'>Cancel</Link>
                    </div>
                </form>
    </Card>
    );
};

export default UserSetting;
