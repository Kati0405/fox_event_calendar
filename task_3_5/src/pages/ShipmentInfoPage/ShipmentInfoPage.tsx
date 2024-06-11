import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { shipmentSchema } from 'src/schemas/shipment';
import { setShipmentInfo } from 'src/redux/slices/shipmentInfoSlice';
import InputField from 'src/components/InputField/InputField';

const ShipmentInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <h1 className='text-4xl text-dark-blue mb-8'>Shipment Information</h1>
      <Formik
        initialValues={{
          address: '',
          appartment: '',
          city: '',
          country: '',
          state: '',
          zipcode: '',
        }}
        validationSchema={shipmentSchema}
        onSubmit={(values) => {
          dispatch(setShipmentInfo(values));
          navigateToCheckout();
        }}
      >
        {({ errors, touched }) => (
          <Form className='w-9/12 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 p-16 bg-white rounded-xl'>
            <InputField
              name='address'
              label='Address (No P. O. Boxes)*'
              type='text'
              placeholder='Enter your address'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='appartment'
              label='Apartment, suite etc. (optional)'
              type='text'
              placeholder='Enter your apartment information'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='city'
              label='City'
              type='text'
              placeholder='Enter your city'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='country'
              label='Country/Region'
              type='text'
              placeholder='Enter your country/region'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='state'
              label='State'
              type='text'
              placeholder='Enter your state'
              errors={errors}
              touched={touched}
            />
            <InputField
              name='zipcode'
              label='ZIP Code'
              placeholder='Enter your ZIP code'
              type='number'
              errors={errors}
              touched={touched}
            />

            <button
              className='w-32 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
              type='submit'
            >
              Submit order
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ShipmentInfoPage;
