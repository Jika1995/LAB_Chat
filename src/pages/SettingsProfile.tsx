import React, {useEffect} from 'react'
import '../styles/SettingsProfile.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const SettingsProfile = () => {

  const user = auth.currentUser
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user])

  return user? (
    <div className='profile-container'>
    <div className='profile-block'>
    <Card className='profile-main'>
<CardMedia
  sx={{ height: '100px', width: '100px', m: 'auto'}}
  // image={`${user.photoURL}`}
  image='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=740'
  title="profile image"
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div" textAlign='center'>
   {user.displayName}
  </Typography>
  <Typography variant="body2" color="text.secondary" textAlign='center'>
   Email: {user.email} | Phone: {user.phoneNumber}
  </Typography>
</CardContent>
<CardActions className='btn-block'>
  <Button size="small" sx={{color:'#4193FF'}}>
    <EditIcon sx={{m: '0 5px'}} />
    Edit Profile Info
  </Button>
  <Button size="small" sx={{color:'#4193FF'}} onClick={() => navigate('/chat')}>
    <EmailIcon sx={{m: '0 5px'}}/>
    Messages
  </Button>
</CardActions>
</Card>
    </div>
</div>
  ) : (
    <h1>You haven't logged in</h1>
  )
}

export default SettingsProfile

{/* <div className='modalka'>
    <input type="text" placeholder='Username'/>
    <input type="text" placeholder='Phone number'/>
    <input type="text" placeholder='Profile image'/>
    <button>Save changes</button>
</div> */}



// <div className='profile-main'> 
// <div className='profile-info'>
//     <img src="" alt="error :(" width='100px' height='100px'/>
//     <h2>Username</h2>
//     <p>Phone: +996777000555</p>
// </div>
// <div className='btn-block'>
//     <div className='edit-profile'>
//         <i>someicon</i>
//         <button>Edit Profile Information</button>
//     </div>
//     <div className='messages-btn'>
//         <i>someicon</i>
//         <button>Messages</button>
//     </div>
// </div>
// </div>