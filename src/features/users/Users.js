import { useGetUsersQuery } from '../../app/api/apiSlice';

export const Users = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  console.log('isLoading', isLoading);
  console.log('isSuccess', isSuccess);
  console.log('isError', isError);

  console.log('users', users);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isSuccess) {
    content = users.map(user => (
      <div key={user._id}>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>{user.email}</p>
      </div>
    ));
  }

  //   return usersList;
  return content;
};
