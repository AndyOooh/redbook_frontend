import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from 'components';
import { codeValidation } from './resetPassword.validation';
import { useValidateResetCodeMutation } from 'features/auth/authApiSlice';

export const CodeVerification = ({ email, setContent }) => {
  const [code, setCode] = useState('');
  const [validateResetCode, { isLoading, error }] = useValidateResetCodeMutation();

  const verifyCode = async () => {
    try {
      await validateResetCode({ email, code }).unwrap();
      setContent('changePassword');
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        code,
      }}
      validationSchema={codeValidation}
      onSubmit={() => {
        verifyCode();
      }}>
      {formik => (
        <Form>
          <TextInput
            type='text'
            name='code'
            onChange={e => setCode(e.target.value)}
            placeholder='Code'
          />
          {error && <div className='error_text'>{error.data.message}</div>}
          <div className='reset_form_btns'>
            <Link to='/login' className='btn gray_btn'>
              Cancel
            </Link>
            <button type='submit' className='btn red_btn'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
