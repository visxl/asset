import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import { Card, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const UserSetting = () => {
    const [engName, setEngName] = useState('');
    const [khName, setKhName] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [phoneNo, setPhoneNo] = useState('');
    const [natId, setNatId] = useState("")
    const [email, setEmail] = useState('');
    const [aboutMe, setAboutMe] = useState('')
    const [dob, setDob] = useState('')
    const [startDate, setStartDate] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')


    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [skill4, setSkill4] = useState('');
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState('');
    const [workPlace, setWorkPlace] = useState('');
    const [year, setYear] = useState('');


    const navigate = useNavigate();

    // Fetch the current user ID from localStorage
    const userId = localStorage.getItem('user_id');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    // Handle save and update button
    const saveAndupdateUser = (e) => {
        e.preventDefault();

        

        const user = { maritalStatus, startDate, dob, password, engName, khName, gender ,role, phoneNo,natId , email, skill1, skill2, skill3, skill4, aboutMe ,description, experience, workPlace, year};

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
                    setEngName(response.data.engName);
                    setKhName(response.data.khName);
                    setRole(response.data.role);
                    setGender(response.data.gender);
                    setPassword(response.data.password);

                    setPhoneNo(response.data.phoneNo);
                    setNatId(response.data.natId)
                    setEmail(response.data.email);
                    setDob(response.data.dob);
                    setStartDate(response.data.startDate);
                    setMaritalStatus(response.data.maritalStatus);

                    setSkill1(response.data.skill1);
                    setSkill2(response.data.skill2);
                    setSkill3(response.data.skill3);
                    setSkill4(response.data.skill4);
                    setAboutMe(response.data.aboutMe);
                    setDescription(response.data.description);
                    setExperience(response.data.experience);
                    setWorkPlace(response.data.workPlace);
                    setYear(response.data.year);
    
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

            <form className="max-w-screen-2xl xs:block grid grid-cols-8 gap-6 p-5">
                    <div className="sm:col-span-8">
                        <Typography className="text-xl font-bold">
                            User Details:
                        </Typography>
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            English Name:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={engName}
                        onChange={(e) => setEngName(e.target.value)}
                        
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Khmer Name:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={khName}
                        onChange={(e) => setKhName(e.target.value)}
                        
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Gender:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        
                    />
                    </div>
                    <div className="sm:col-span-4">
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
                    {/* <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Password:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div> */}
                    <div className="sm:col-span-4 relative">
                        <Typography className="text-lg mb-1">
                            Password:
                        </Typography>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        </div>
                    
                    <hr className="my-6 border-t border-gray-300 col-span-8" />
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Date of Birth:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        
                    />
                    </div>
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            Join date:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        
                    />
                    </div>
                    
                    <div className="sm:col-span-4">
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
                    <div className="sm:col-span-4">
                        <Typography className="text-lg mb-1">
                            National ID:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="brand"
                        value={natId} 
                        onChange={(e) => setNatId(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-4">
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
                            Marital Status:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="model"
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                    />
                    </div>
                    <hr className="my-6 border-t border-gray-300 col-span-8" />

                    <div className="col-span-8">
                        <Typography className="text-xl font-bold">
                            Skills
                        </Typography>
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
                        <Typography className="text-xl font-bold">
                            About me:
                        </Typography>
                    </div>
                    <div className="sm:col-span-8">
                        <textarea
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full h-40 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description1"
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-8">
                        <Typography className="text-xl font-bold">
                            Work Experience:
                        </Typography>
                    </div>
                    {/* ex 1 */}
                    <div className="sm:col-span-3">
                        <Typography className="text-lg mb-1">
                            Role:
                        </Typography>
                        <input
                        placeholder='Optional'
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="experience1"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-3">
                        <Typography className="text-lg mb-1">
                            Workplace:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="workplace"
                        value={workPlace}
                        onChange={(e) => setWorkPlace(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-2">
                        <Typography className="text-lg mb-1">
                            Year:
                        </Typography>
                        <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="year"
                        placeholder='Ex:2023-2024'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    </div>
                    <div className="sm:col-span-8">
                        <Typography className="text-lg mb-1">
                            Description:
                        </Typography>
                        <textarea
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full h-40 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
