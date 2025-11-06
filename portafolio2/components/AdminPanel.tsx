
import { auth } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import Login from './Login';
import { FadeIn } from './FadeIn';

const AdminPanel = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-10 lg:px-20 mt-10">
      <FadeIn>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
        {/* Add your blog management UI here */}
      </FadeIn>
    </div>
  );
};

export default AdminPanel;
