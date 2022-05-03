import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { Options, User } from '../../interfaces/appInterfaces';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';

// Styles
import './Create.css';
import { useFirestore } from '../../hooks/useFirestore';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
    const history = useHistory();
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('projects');

    // Form field values
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Handle errors
    const [formError, setFormError] = useState<string | null>(null);

    // Select category
    const [category, setCategory] = useState('');

    // Select user
    const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<Options[]>([]);
    const { documents } = useCollection('users');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFormError(null);

        if (!category) {
            setFormError('Please select a category');
            return;
        }

        if (assignedUsers.length < 1) {
            setFormError('Please assign the project to at least 1 user');
            return;
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u: any) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoUrl,
                id: u.value.id
            }
        });

        const project = {
            name,
            details,
            category: category,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [], // todo: add comments
            createdBy,
            assignedUsersList
        }

        await addDocument(project);
        
        if (!response.error) {
            history.push('/');
        }
    }

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            });

            setUsers(options);
        }
    }, [documents])


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
                    />
                </label>

                <label>
                    <span>Assign To: </span>
                    <Select
                        onChange={(option: any) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>

                <button className="btn">Add Project</button>

                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default Create;