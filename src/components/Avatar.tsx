// Styles
import './Avatar.css';

interface Props {
    src: string;
}

const Avatar = ({ src }: Props) => {
    return (
        <div className='avatar'>
            <img src={src} alt='user avatar' />
        </div>
    )
}

export default Avatar