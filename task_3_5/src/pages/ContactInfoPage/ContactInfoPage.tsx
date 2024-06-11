import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { contactsSchema } from '../../schemas/contacts';

import { setContactInfo } from 'src/redux/slices/contactInfoSlice';
import InputField from 'src/components/InputField/InputField';

const ContactInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToShipmentInfo = () => {
    navigate('shipment_information');
  };

  return (
    <>
      <h1 className='text-4xl text-dark-blue mb-8'>Contact Information</h1>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', phone: '' }}
        validationSchema={contactsSchema}
        onSubmit={(values) => {
          dispatch(setContactInfo(values));
          navigateToShipmentInfo();
        }}
      >
        {({ errors, touched }) => (
          <Form className='w-9/12 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 p-16 bg-white rounded-xl'>
            <InputField
              name='firstName'
              label='First Name*'
              type='text'
              placeholder='Enter your first name'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='lastName'
              label='Last Name*'
              type='text'
              placeholder='Enter your last name'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='email'
              type='email'
              label='Email*'
              placeholder='Enter your email'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='phone'
              type='number'
              label='Phone*'
              placeholder='Enter your phone number'
              errors={errors}
              touched={touched}
            />
            <button
              className='w-28 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
              type='submit'
            >
              Next step
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactInfoPage;
