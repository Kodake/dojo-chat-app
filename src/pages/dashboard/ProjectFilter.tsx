const filterList = ['All', 'Mine', 'Development', 'Design', 'Marketing', 'Sales'];

interface Props {
    currentFilter: string;
    changeFilter: (newFilter: string) => void;
}

const ProjectFilter = ({ currentFilter, changeFilter }: Props) => {
    const handleClick = (newFilter: string) => {
        changeFilter(newFilter);
    }

    return (
        <div className='project-filter'>
            <nav>
                <p>Filter by:</p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default ProjectFilter;