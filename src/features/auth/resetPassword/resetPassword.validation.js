import * as Yup from 'yup';

export const emailValidation = Yup.object({
  email: Yup.string()
    .required('Email address ir required.')
    .email('Must be a valid email address.')
    .max(50, "Email address can't be more than 50 characters."),
});

export const codeValidation = Yup.object({
  code: Yup.string()
    .required('Code is required')
    .min('5', 'Code must be 5 characters.')
    .max('5', 'Code must be 5 characters.'),
});

export const passwordvalidation = Yup.object({
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &).'
    )
    .min(6, 'Password must be atleast 6 characters.')
    .max(36, "Password can't be more than 36 characters"),

    confPassword: Yup.string()
    .required('Confirm your password.')
    .oneOf([Yup.ref('password')], 'Passwords must match.'),
});
