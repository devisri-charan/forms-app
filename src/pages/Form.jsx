import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from "react-icons/io";
import Markdown from 'react-markdown';

function Form() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://stunning-event-48080168b5.strapiapp.com/api/forms/${formId}?populate[sections][populate][0]=form_fields`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching form:', error);
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId, token]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field.attributes.label]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const submissionData = {
      form: formId,
      user: user.id.toString(),
      submitted_data: formData,
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        `https://stunning-event-48080168b5.strapiapp.com/api/submissions`,
        { data: submissionData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Form submitted successfully:', response.data);
      toast.success('Form submitted successfully!', {
        position: 'top-center',
      });

      setTimeout(() => {
        navigate(`/form/${formId}/submitted`, { state: { formData, formTitle: form.attributes.title } });
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the form!', {
        position: 'top-center',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xl'>Loading...</div>;
  }

  if (!form) {
    return <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xl'>Form Data not available</div>;
  }

  const sections = form.attributes.sections?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-8">
      <ToastContainer />
      <div className='flex items-center mb-6'>
        <Link to='/dashboard' className='flex items-center text-white text-lg hover:text-indigo-200 transition duration-300'>
          <IoIosArrowBack className='mr-2' />
          Back to Dashboard
        </Link>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{form.attributes.title}</h1>
        <Markdown className="mb-6 text-gray-600">{form.attributes.description}</Markdown>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Fill all the required details below</h2>
        <form onSubmit={handleSubmit}>
          {sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{section.attributes.title}</h2>
              <p className="text-gray-600 mb-4">{section.attributes.description}</p>
              <div>
                {section.attributes.form_fields.data.map((field) => (
                  <div key={field.id} className="mb-4">
                    <label className="block text-lg font-medium text-gray-700 mb-2 ml-2">{field.attributes.label}</label>
                    <input
                      type={field.attributes.field_type}
                      placeholder={field.attributes.placeholder}
                      className="w-full md:w-[50%] p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required={field.attributes.is_required}
                      value={formData[field.attributes.label] || ''}
                      onChange={(e) => handleInputChange(e, field)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-xl hover:bg-green-600 transition duration-300 shadow-md"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
