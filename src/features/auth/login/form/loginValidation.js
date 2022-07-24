import * as Yup from 'yup';

export const loginvalidation = Yup.object({
  email: Yup.string()
    .required('Email address is required.')
    .email('Must be a valid email.')
    .max(100),
  password: Yup.string().min(6).required('Password is minimum 6 characters.'),
});
