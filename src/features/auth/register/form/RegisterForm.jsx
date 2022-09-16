import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import DotLoader from 'react-spinners/DotLoader';

import { Modal } from 'components';
import { GenderSelect } from './inputs/GenderSelect';
import { DateOfBirthSelect } from './inputs/DateOfBirthSelect';
import { TextInput } from 'components/ui/inputs/TextInput';
import { registerValidation } from './registerValidation';
import './RegisterForm.scss';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from 'features/auth/authApiSlice';
import { setCredentials } from 'features/auth/authSlice';

export const RegisterForm = ({ visible, setIsVisible }) => {
  console.log('in RegisterForm');
  const initialFormData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birth_year: new Date().getFullYear(),
    birth_month: new Date().getMonth() + 1,
    birth_date: new Date().getDate(),
    gender: '',
  };

  //  State ---------------------------------------------------------------------------
  const [formData, setFormData] = useState(initialFormData);
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const { first_name, last_name, email, password, birth_year, birth_month, birth_date, gender } =
    formData;

  const formIsValid = registerValidation.isValidSync(formData);

  // MOVE? --------------------------------
  const years = Array.from(new Array(108), (val, index) => new Date().getFullYear() - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(birth_year, birth_month, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  // MOVE? --------------------------------

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //  SubmitHandler ------------------------------------------------------------------------------------------------
  const registerSubmitHandler = async e => {
    console.log('in registerSubmitHandler');
    try {
      const userData = await register(formData).unwrap();
      dispatch(setCredentials({ ...userData }));
      setFormData(initialFormData);
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };
  //  SubmitHandler ------------------------------------------------------------------------------------------------

  // JSX ------------------------------------------------------------------------------------------------
  return (
    <>
      {/* <h1>Hello from register </h1> */}
      <Modal className='RegisterForm_wrapper' visible={visible} setIsVisible={setIsVisible}>
        <div className='header'>
          <div className='heading'>
            <h1>Sign Up </h1>
            <i className='exit_icon' onClick={() => setIsVisible(false)}></i>
          </div>

          <span>It’s quick and easy.</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            birth_year,
            birth_month,
            birth_date,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            console.log('onsubmit');
            let current_date = new Date();
            let picked_date = new Date(birth_year, birth_month - 1, birth_date);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (
              current_date - picked_date < atleast14 ||
              current_date - picked_date > noMoreThan70
            ) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === '') {
              setDateError('');
              setGenderError('Please choose a gender. You can change who can see this later.');
            } else {
              setDateError('');
              setGenderError('');
              registerSubmitHandler();
            }
          }}>
          {formik => (
            <Form className='form'>
              <div className='name-group'>
                <TextInput
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleInputChange}
                />
                <TextInput
                  type='text'
                  placeholder='Last name'
                  name='last_name'
                  onChange={handleInputChange}
                />
              </div>
              <TextInput
                type='text'
                placeholder='Mobile number or email address'
                name='email'
                onChange={handleInputChange}
              />
              <TextInput
                type='password'
                placeholder='New password'
                name='password'
                onChange={handleInputChange}
              />
              <div className='grid_group'>
                <div className='grid_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  birth_date={birth_date}
                  birth_month={birth_month}
                  birth_year={birth_year}
                  days={days}
                  months={months}
                  years={years}
                  handleInputChange={handleInputChange}
                  dateError={dateError}
                />
              </div>
              <div className='grid_group'>
                <div className='grid_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect handleInputChange={handleInputChange} genderError={genderError} />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS notifications from us and can
                opt out at any time.
              </div>
              {isError && <div className='error_text'>{error.data.message}</div>}
              {/* {isSuccess && <div className='success_text'>{message}</div>} */}
              <div className='btn_wrapper'>
                {isLoading ? (
                  <DotLoader color='#1876f2' loading={isLoading} size={30} />
                ) : (
                  <button
                    type='submit'
                    className='btn red_btn create_account_btn'
                    disabled={!formIsValid}>
                    Sign Up
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
  // JSX ------------------------------------------------------------------------------------------------
};
