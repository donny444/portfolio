const connection = require("../mysql.js");

async function Submissions(req, res) {
    const { name, email, description } = req.body;

    try {
        if (!name || !email || !description) {
            return res.status(404).json({ message: "All inputs are required" });
        }
        if(name.length > 50) {
            return res.status(404).json({ message: "Name is limited to 50 characters" });
        }
        if(email.length > 255) {
            return res.status(404).json({ message: "Email is limited to 255 characters" });
        }
        if(description.length > 300) {
            return res.status(404).json({ message: "Description is limited to 300 characters" });
        }
        connection.query(
            "INSERT INTO submissions VALUES (submit_id, ?, ?, ?)",
            [name, email, description],
            (err, results) => {
                if (err) {
                    return res.status(404).json({ message: "Invalid form input"});
                }

                return res.status(201).json({ message: "Form submit successful"});
            }
        )
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error"});
    }
}

module.exports = Submissions;