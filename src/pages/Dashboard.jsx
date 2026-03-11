import { useState, useEffect } from "react";

const initialForm = {
    company: "",
    role: "",
    status: "Applied",
    dateApplied: "",
    notes: "",
};

export default function Dashboard() {
    const [formData, setFormData] = useState(initialForm);
    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem("applications");
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState("All");

    const filteredApplications = 
        filter === "All"
        ? applications
        : applications.filter((app) => app.status === filter);

    useEffect(() => {
         localStorage.setItem("applications", JSON.stringify(applications));
    }, [applications]);

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

    function deleteApplication(id) {
        setApplications((prev) => 
            prev.filter((app) => app.id !== id)
        );
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

               <div className="filter-row">
                <button
                    type="button"
                    className={filter === "All" ? "active-filter" : ""}
                    onClick={() => setFilter("All")}
                >
                    All
                </button>

                <button
                    type="button"
                    className={filter === "Applied" ? "active-filter" : ""}
                    onClick={() => setFilter("Applied")}
                >
                    Applied
                </button>

                <button
                    type="button"
                    className={filter === "Interviewing" ? "active-filter" : ""}
                    onClick={() => setFilter("Interviewing")}
                >
                    Interviewing
                </button>

                <button
                    type="button"
                    className={filter === "Offer" ? "active-filter" : ""}
                    onClick={() => setFilter("Offer")}
                >
                    Offer
                </button>

                <button
                    type="button"
                    className={filter === "Rejected" ? "active-filter" : ""}
                    onClick={() => setFilter("Rejected")}
                >
                    Rejected
                </button>

                <button
                    type="button"
                    className={filter === "Ghosted" ? "active-filter" : ""}
                    onClick={() => setFilter("Ghosted")}
                >
                     Ghosted
                    </button>    
                </div>

                {filteredApplications.length === 0 ? (
                    <p>
                        {filter === "All"
                            ? "No applications yet."
                            : `No ${filter.toLowerCase()} applications.`}
                    </p>
                ) : (
                    <div className="applications-list">
                        {filteredApplications.map((app) => (
                            <div key={app.id} className="application-card">
                                <h3>{app.company}</h3>
                                <p><strong>Role:</strong> {app.role}</p>
                                <p><strong>Status:</strong>{app.status}</p>
                                <p><strong>Date Applied:</strong>{app.dateApplied || "N/A"}</p>
                                <p><strong>Notes:</strong>{app.notes || "no notes"}</p>

                                <button onClick={() => deleteApplication(app.id)}>
                                    Delete
                                </button>
                            </div>
                         ))}
                    </div>    
                )}
            </section>
        </div>
    );
}