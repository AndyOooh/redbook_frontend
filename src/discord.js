


// // Home/Header/Menu.jsx
// const [logout, { isLoading }] = useLogoutMutation();

// const logoutHandler = async () => {
//   const result = await logout();
//   dispatch(reset());
//   navigate('/login');
// };

// // authApiSlice.js
// const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BACKEND_URL + '/api',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.accessToken;
//       // If we have a token set in state, let's assume that we should be passing it.
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   });
