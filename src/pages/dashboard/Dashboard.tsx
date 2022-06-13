import { useState } from 'react';
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

// Styles
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

const Dashboard = () => {
    const { user } = useAuthContext();
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState<string>('All');

    const changeFilter = (newFilter: string) => {
        setCurrentFilter(newFilter);
    }

    const projects = documents ? documents.filter((document: any) => {
        switch (currentFilter) {
            case 'All':
                return true;
            case 'Mine':
                let assignedToMe = false;
                document.assignedUsersList.foreach((u: any) => {
                    if (u.id === user.uid) {
                        assignedToMe = true;
                    }
                });
                return assignedToMe;
            case 'Development':
            case 'Design':
            case 'Sales':
            case 'Marketing':
                console.log(document.category, currentFilter);
                return document.category === currentFilter;
            default:
                return true;
        }
    }) : null;

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents &&
                <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
            }
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}

export default Dashboard;