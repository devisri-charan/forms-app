import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setForms } from '../redux/forms/formSlice';

function UserDashboard() {
  const { token } = useSelector((state) => state.auth);
  const { forms } = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('https://stunning-event-48080168b5.strapiapp.com/api/forms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setForms(response.data.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forms:', error);
        setLoading(false);
      }
    };

    fetchForms();
  }, [token, dispatch]);

  if (loading) {
    return <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xl'>Loading...</div>;
  }

  if (!forms.length) {
    return <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xl'>No forms available.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-8 px-16">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Available Forms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {forms.map((form) => (
          <Link
            to={`/forms/${form.id}`}
            key={form.id}
            className="bg-white p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{form.attributes.title}</h2>
            <p className="mt-4 text-gray-600 line-clamp-4">{form.attributes.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
