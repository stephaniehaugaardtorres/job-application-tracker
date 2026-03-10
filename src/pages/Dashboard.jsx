import { useState } from "react";

const initialForm = {
    company: "",
    role: "",
    status: "Applied",
    dateApplied: "",
    notes: "",
};

export default function Dashboard() {
    const [formData, setFormData] = useState(initialForm);
    const [applications, setApplications] = useState([]);

    function handleChange(e) {
        const {name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newApplication = {
            id: crypto.randomUUID(),
            ...formData,
        };

        setApplications((prev) => [newApplication, ...prev]);
        setFormData(initialForm);
    }

    return (
        <div className="dashboard">
            <h1>Job Application Tracker</h1>
            <p>Track your job applications, interviews, and offers.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="company">Company</label>
                    <br />
                    <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                    />    
                </div>

                <div>
                    <label htmlFor="role">Role</label>
                    <br />
                    <input
                        id="role"
                        name="role"
                        type="text"
                        value={formData.role}
                        onChange={handleChange}
                    />    
                </div>

                <div>
                    <label htmlFor="status">Status</label>
                    <br />
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Ghosted">Ghosted</option>
                    </select>    
                </div>

                <div>
                    <label htmlFor="dateApplied">Date Applied</label>
                    <br />
                    <input
                        id="dateApplied"
                        name="dateApplied"
                        type="date"
                        value={formData.dateApplied}
                        onChange={handleChange}
                    />    
                </div>

                <div>
                    <label htmlFor="notes">Notes</label>
                    <br />
                    <textarea
                        id="notes"
                        name="notes"
                        rows="5"
                        value={formData.notes}
                        onChange={handleChange}
                    />    
                </div>

                <button type="submit">Add Application</button>
            </form>

            <section className="applications-section">
                <h2>Applications</h2>

                {applications.length === 0 ? (
                    <p>No applications yet.</p>
                ) : (
                    <div className="applications-list">
                        {applications.map((app) => (
                            <div key={app.id} className="application-card">
                                <h3>{app.company}</h3>
                                <p><strong>Role:</strong> {app.role}</p>
                                <p><strong>Status:</strong>{app.status}</p>
                                <p><strong>Date Applied:</strong>{app.dateApplied || "N/A"}</p>
                                <p><strong>Notes:</strong>{app.notes || "no notes"}</p>
                            </div>
                         ))}
                    </div>    
                )}
            </section>
        </div>
    );
}