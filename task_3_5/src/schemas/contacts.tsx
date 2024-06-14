import * as yup from 'yup';

export const contactsSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  firstName: yup.string().min(3).required('Required'),
  lastName: yup.string().min(3).required('Required'),
  phone: yup.number().required('Required'),
});
