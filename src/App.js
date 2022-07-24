import Header from './layout/header';
import Main from './layout/main/Main';
import Footer from './layout/footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

let initial = true;

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffetct in App.js');
  //   const getUsers = async () => await dispatch(fetchUsers());

  //   if (initial) {
  //     console.log('in if');
  //     initial = false;
  //     getUsers();
  //   } else {
  //     console.log('in else');
  //     return;
  //   }
  //   console.log('after if-block');
  // }, []);

  return (
    <>
      {/* <Header></Header> */}
      <Main></Main>
      {/* <Footer></Footer> */}
    </>
  );
};

export default App;
