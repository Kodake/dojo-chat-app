import { useState } from 'react';
import Select from 'react-select';

// Styles
import './Create.css';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(name, details, dueDate, category);
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name: </span>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                <label>
                    <span>Project Details: </span>
                    <textarea
                        required
                        rows={5}
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>

                <label>
                    <span>Set Due Date: </span>
                    <input
                        required
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>

                <label>
                    <span>Project Category: </span>
                    <Select
                        onChange={(option: any) => setCategory(option)}
                        options={categories}
                        isMulti
                    />
                </label>

                <label>
                    <span>Assign To: </span>
                    {/* TODO: */}
                </label>

                <button className="btn">Add Project</button>
            </form>
        </div>
    )
}

export default Create;