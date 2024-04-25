import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HomeIcon } from "../icons/icons";

export default function PreferencesPage() {
    return (
        <>
            <h3 className="preferences-header">My preferences</h3>
            <PreferencesBoxes />
            <HomeIcon />
        </>
    )
}

function PreferencesBoxes() {
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
                <div className="preferences-boxes">
                    {data.map((preference, index) => (
                        <PreferenceBox key={index} fileName={preference.file_name} name={preference.name} type={preference.type} description={preference.description} />
                    ))}
                </div>
            }
        </>
    )
}

function PreferenceBox({ fileName, name, type, description }) {
    return (
        <div className="preference-box">
            <img className="preference-image" src={`src/assets/preferences/${fileName}`} alt={fileName} />
            <div className="preference-text">
                <p className="preference-name">{name}</p>
                <p className="preference-type">{type}</p>
                <p className="preference-description">{description}</p>
            </div>
        </div>
    )
}

PreferenceBox.propTypes = {
    fileName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}