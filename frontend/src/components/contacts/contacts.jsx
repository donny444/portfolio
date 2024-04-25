import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, PhoneIcon, EmailIcon } from "../icons/icons";

export default function ContactsPage() {
    return (
        <>
            <h3 className="contacts-header">Contact me</h3>
            <ContactForm />
            <PlatformBox />
            <HomeIcon />
        </>
    )
}

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:5174/submissions";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                description: description
            })
        }
        try {
            const response = await fetch(apiUrl, options)
            if(!response.ok) {
                const errMsg= await response.text();
                throw new Error(errMsg || "Failed to perform form submit");
            }
            const data = await response.json();
            setData(data.message);
            setName("");
            setEmail("");
            setDescription("");
        } catch(err) {
            setError(err.message)
        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-label">Your name:
                <input
                    className="contact-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={50}
                    required
                />
            </label>
            <label className="contact-label">Your email:
                <input
                    className="contact-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                />
            </label>
            <label className="contact-label">Description:
                <textarea
                    className="description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={300}
                    required
                ></textarea>
            </label>
            <div className="contact-submission">
                <p className="contact-status">{data || error}</p>
                <input className="contact-submit" type="submit" value="Submit" />
            </div>
        </form>
    )
}

function PlatformBox() {
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
                <div className="platforms-box">
                    <h3 className="platforms-header">Find me on</h3>
                    <div className="platforms-images">
                        {data.map((platform, index) => (
                            <Link className="platform-link" key={index} to={platform.url}><img className="platform-image" src={`src/assets/contacts/${platform.file_name}`} alt={platform.file_name} /></Link>
                        ))}
                    </div>
                    <p className="platform-text"><PhoneIcon />{import.meta.env.VITE_PHONE_NUMBER}</p>
                    <p className="platform-text"><EmailIcon />{import.meta.env.VITE_EMAIL}</p>
                </div>
            }
        </>
    )
}