import { useQuery } from '@tanstack/react-query';
import DeleteCard from '../components/DeleteCard';
import { allStats } from '../apiFunctions';
import LoadingPage from '../components/Loading';
import ErrorPage from '../components/ErrorPage';


const AdminPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['allusers'],
        queryFn: allStats,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <LoadingPage />;
    }
    if (isError) {
        return <ErrorPage />;

    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-purple-400 to-pink-500">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((user) => (
                    <DeleteCard key={user.userName} u={user} />
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
