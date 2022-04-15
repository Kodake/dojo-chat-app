import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// Styles
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailError, setThumbnailError] = useState<string | null>(null);
    const { signUp, error, isPending } = useSignup();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signUp(email, password, displayName, thumbnail as File);
    }

    const handleFileChange = (e: any) => {
        setThumbnail(null);
        let fileSelected = e.target.files[0];

        if (!fileSelected) {
            setThumbnailError('Please select a file');
            return;
        }

        if (!fileSelected.type.includes('image')) {
            setThumbnailError('Selected file must be an image');
            return;
        }

        if (fileSelected.size > 100000) {
            setThumbnailError('Imagee file size must be less than 100kb');
            return;
        }

        setThumbnailError(null);
        setThumbnail(fileSelected);
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>Password:</span>
                <input
                    required
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            <label>
                <span>Display Name:</span>
                <input
                    required
                    type='text'
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>

            <label>
                <span>Profile Thumbnail:</span>
                <input
                    required
                    type='file'
                    onChange={handleFileChange}
                />
            </label>

            {thumbnailError && <div className='error'>{thumbnailError}</div>}

            {!isPending && <button className="btn">Sign Up</button>}
            {isPending && <p>Loading...</p>}

            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup;