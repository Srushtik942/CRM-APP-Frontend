import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem('user')) || {};
  } catch {
    user = {};
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-lime-50 px-4 py-8 text-green-900 md:px-6 lg:px-10">
      <section className="mx-auto max-w-4xl rounded-2xl border border-lime-100 bg-white p-6 shadow-sm md:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">Profile</p>
          <h1 className="mt-1 text-2xl font-bold text-green-950">{user.name || user.username || 'Your profile'}</h1>
          <p className="mt-2 text-sm text-green-800">{user.email || 'Email unavailable'}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          Log out
        </button>
      </section>
    </main>
  );
};

export default Profile;
