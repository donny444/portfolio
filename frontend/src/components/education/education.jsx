import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HomeIcon } from "../icons/icons";

export default function EducationPage() {
    return (
        <>
            <h3 className="education-header">My education profile</h3>
            <CollegesBoxes />
            <HomeIcon />
        </>
    )
}

function CollegesBoxes() {
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
                <div className="colleges-boxes">
                    {data.map((college, index) => (
                        <CollegeBox key={index} fileName={college.file_name} name={college.name} degree={college.degree} startYear={college.start_year} endYear={college.end_year} field={college.field} />
                    ))}
                </div>
            }
        </>
    )
}

function CollegeBox({ fileName, name, degree, startYear, endYear, field }) {
    return (
        <div className="college-box">
            <img className="college-image" src={`src/assets/education/${fileName}`} alt={fileName} />
            <div className="college-text">
                <p className="college-name">{name}</p>
                {field ? <p className="college-field">{field}</p> : <></>}
                <p className="college-degree">{degree}</p>
                <p className="college-years">{startYear} - {endYear}</p>
            </div>
        </div>
    )
}

CollegeBox.propTypes = {
    fileName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    startYear: PropTypes.number.isRequired,
    endYear: PropTypes.number.isRequired,
    field: PropTypes.string
}