import * as Yup from 'yup';

export const registerValidation = Yup.object({
  first_name: Yup.string()
    // .required("What's your First name ?")
    .min(2, 'Fisrt name must be between 2 and 16 characters.')
    .max(16, 'Fisrt name must be between 2 and 16 characters.'),
  // .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  last_name: Yup.string()
    .required("What's your Last name ?")
    .min(2, 'Last name must be between 2 and 16 characters.')
    .max(16, 'Last name must be between 2 and 16 characters.'),
  // .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  email: Yup.string()
    .required("You'll need this when you log in and if you ever need to reset your password.")
    .email('Enter a valid email address.'),
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &).'
    )
    .min(6, 'Password must be atleast 6 characters.')
    .max(36, "Password can't be more than 36 characters"),
});
