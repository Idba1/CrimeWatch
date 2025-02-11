const Teams = () => {
    const columns = [
        {
            title: 'Team Name',
            dataIndex: 'teamName',
            key: 'teamName',
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
        },
        {
            title: 'Application Idea',
            dataIndex: 'idea',
            key: 'idea',
        },
    ];

    const data = [
        {
            key: '1',
            teamName: 'Tech Ninjas',
            members: 4,
            idea: 'Smart Traffic Management',
        },
        {
            key: '2',
            teamName: 'Code Masters',
            members: 3,
            idea: 'Digitalized Education System',
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Teams</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
export default Teams;  