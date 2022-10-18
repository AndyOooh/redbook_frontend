
// export const TopButtons = ({visitor, profileUser, handleRequest, loading}) => {
//     // let visitorButtonsJsx;
//   return (
   
//   visitor && profileUser {
//     visitorButtonsJsx = (
//     <>
//       {profileUser.friendship.friends ? (
//         <button className='btn gray_btn'>
//           <FaUserCheck />
//           Friends
//         </button>
//       ) : profileUser?.friendship?.requestSent ? (
//         <button className='btn red_btn'>
//           <FaUserTimes /> Requested
//         </button>
//       ) : profileUser?.friendship.requestReceived ? (
//         <button className='btn red_btn' onClick={() => handleFriendRequest('accept')}>
//           {friendRequestLoading ? (
//             <>
//               <DotLoader color='#ffe0e0' size={10} loading={friendRequestLoading} /> Loading...
//             </>
//           ) : (
//             <>
//               <FaUserTimes /> Accept request
//             </>
//           )}
//         </button>
//       ) : (
//         <button className='btn red_btn' onClick={() => handleFriendRequest('add')}>
//           {friendRequestLoading ? (
//             <>
//               <DotLoader color='#ffe0e0' size={10} loading={true} /> Loading...
//             </>
//           ) : (
//             <>
//               <FaUserPlus /> Add Friend
//             </>
//           )}
//         </button>
//       )}
//       <button
//         className={profileUser.friendship.friends ? 'btn red_btn' : 'btn gray_btn'}>
//         <FaFacebookMessenger />
//         Message
//       </button>
//     </>
//   )} 
//   )
// }
