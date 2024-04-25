import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PhoneIcon, EmailIcon } from "../icons/icons";

export default function BiographyPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:5174/biography";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            {error && <p>Error: {error}</p> }
            {data &&
                <>
                    <Profile fileName={data.file_name}/>
                    <BiographyBox firstname={data.firstname} lastname={data.lastname} nickname={data.nickname} birthdate={data.birthdate} nationality={data.nationality} />
                    <OtherBoxes />
                </>
            }
            
        </>
    );
}

function Profile({ fileName }) {
    return (
        <div className="profile">
            <img className="profile-image" src={`src/assets/biography/${fileName}`} alt={fileName} />
            <h3 className="profile-text">Welcome to my portfolio website!</h3>
        </div>
    );
}

function BiographyBox({ firstname, lastname, nickname, birthdate, nationality }) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const ageInYears = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

    return (
        <div className="box">
            <h3 className="box-header">Biography</h3>
            <p className="box-label">Name:</p>
            <p className="box-value">{firstname} {lastname} ({nickname})</p>
            <p className="box-label">Birthdate:</p>
            <p className="box-value">0{birthDate.getDate()}/0{(birthDate.getMonth()) + 1}/{birthDate.getFullYear()} ({ageInYears})</p>
            <p className="box-label">Nationality:</p>
            <p className="box-value">{nationality}</p>
        </div>
    );
}

function OtherBoxes() {
    return (
        <>
            <EducationBox />
            <PreferencesBox />
            <SkillsBox />
            <ContactsBox />
        </>
    );
}

function EducationBox() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:5174/education";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="box">
                    <h3 className="box-header">See my education profile</h3>
                    <div className="education-images">
                        {data.map((college, index) => (
                            <img className="education-image" key={index} src={`src/assets/education/${college.file_name}`} alt={college.file_name} />
                        ))}
                    </div>
                    <Link className="box-link" to="/education">Click</Link>
                </div>
            }
        </>
    )
}

function PreferencesBox() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:5174/preferences";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="box">
                    <h3 className="box-header">Know my preferences</h3>
                    <div className="preferences-images">
                        {data.map((preference, index) => (
                            <img className="preferences-image" key={index} src={`src/assets/preferences/${preference.file_name}`} alt={preference.file_name} />
                        ))}
                    </div>
                    <Link className="box-link" to="/preferences">Click</Link>
                </div>
            }
        </>
    )
}

function SkillsBox() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:5174/skills";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="box">
                    <h3 className="box-header">Skills details</h3>
                    <div className="skills-images">
                        {data.map((skill, index) => (
                            <img className="skills-image" key={index} src={`src/assets/skills/${skill.file_name}`} alt={skill.file_name} />
                        ))}
                    </div>
                    <Link className="box-link" to="/skills">Click</Link>
                </div>
            }
        </>
    )
}

export function ContactsBox() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = "http://localhost:5174/contacts";
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            try {
                const response = await fetch(apiUrl, options);
                if(!response.ok) {
                    const errMsg = await response.text();
                    throw new Error(errMsg || "Network response was not ok");
                }
                const data = await response.json();
                setData(data);
            } catch(err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="box">
                    <h3 className="box-header">Contact me</h3>
                    <div className="contacts-images">
                        {data.map((contact, index) => (
                            <Link className="contact-link" key={index} to={contact.url}><img className="contact-image" src={`src/assets/contacts/${contact.file_name}`} alt={contact.file_name} /></Link>
                        ))}
                    </div>
                    <p className="box-text"><PhoneIcon />{import.meta.env.VITE_PHONE_NUMBER}</p>
                    <p className="box-text"><EmailIcon />{import.meta.env.VITE_EMAIL}</p>
                    <Link className="box-link" to="/contacts">Click</Link>
                </div>
            }
        </>
    )
}

Profile.propTypes = {
    fileName: PropTypes.string.isRequired
}

BiographyBox.propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired
}