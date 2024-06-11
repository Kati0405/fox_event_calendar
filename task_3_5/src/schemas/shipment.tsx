import * as yup from 'yup';

export const shipmentSchema = yup.object().shape({
  address: yup.string().required('Required'),
  appartment: yup.string(),
  city: yup.string().required('Required'),
  country: yup.string().required('Required'),
  state: yup.string().required('Required'),
  zipcode: yup.number().required('Required'),
});
