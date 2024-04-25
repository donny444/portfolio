import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HomeIcon } from "../icons/icons";

export default function SkillsPage() {
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
            <h3 className="skills-header">Skills detail</h3>
            <LanguagesBox error={error} data={data} />
            <FrameworksBox error={error} data={data} />
            <DatabasesBox error={error} data={data} />
            <ToolsBox error={error} data={data} />
            <HomeIcon />
        </>
    )
}

function LanguagesBox({ error, data }) {
    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="skill-box">
                    <h3 className="skill-header">Languages:</h3>
                    <div className="skill-images">
                        {data.map((skill, index) => {
                            if(skill.type === "language") {
                                return (
                                    <img className="skill-image" key={index} src={`src/assets/skills/${skill.file_name}`} alt={skill.file_name} />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            }
        </>
    )
}

function FrameworksBox({ error, data }) {
    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="skill-box">
                    <h3 className="skill-header">Frameworks:</h3>
                    <div className="skill-images">
                        {data.map((skill, index) => {
                            if(skill.type === "framework") {
                                return (
                                    <img className="skill-image" key={index} src={`src/assets/skills/${skill.file_name}`} alt={skill.file_name} />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            }
        </>
    )
}

function DatabasesBox({ error, data }) {
    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="skill-box">
                    <h3 className="skill-header">Databases:</h3>
                    <div className="skill-images">
                        {data.map((skill, index) => {
                            if(skill.type === "database") {
                                return (
                                    <img className="skill-image" key={index} src={`src/assets/skills/${skill.file_name}`} alt={skill.file_name} />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            }
        </>
    )
}

function ToolsBox({ error, data }) {
    return (
        <>
            {error && <p>Error: {error}</p>}
            {data &&
                <div className="skill-box">
                    <h3 className="skill-header">Tools:</h3>
                    <div className="skill-images">
                        {data.map((skill, index) => {
                            if(skill.type === "tool") {
                                return (
                                    <img className="skill-image" key={index} src={`src/assets/skills/${skill.file_name}`} alt={skill.file_name} />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            }
        </>
    )
}

LanguagesBox.propTypes = {
    error: PropTypes.string,
    data: PropTypes.array
}

FrameworksBox.propTypes = {
    error: PropTypes.string,
    data: PropTypes.array
}

DatabasesBox.propTypes = {
    error: PropTypes.string,
    data: PropTypes.array
}

ToolsBox.propTypes = {
    error: PropTypes.string,
    data: PropTypes.array
}