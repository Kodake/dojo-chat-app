import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

// Styles
import './OnlineUsers.css';

const OnlineUsers = () => {
    const { user } = useAuthContext();
    const { error, documents } = useCollection(
        'users'
    );

    useEffect(() => {
        console.log(documents);

    }, [documents])

    return (

        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id} className='user-list-item'>
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoUrl} />
                </div>
            ))}
        </div>
    )
}

export default OnlineUsers