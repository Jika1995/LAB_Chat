import React from 'react';

const ProfilePage = () => {
  return (
    <div className='profile-container'>
        <div className='profile-block'>
           <div className='profile-main'> 
                <div className='profile-info'>
                    <img src="" alt="error :(" width='100px' height='100px'/>
                    <h2>Username</h2>
                    <p>Phone: +996777000555</p>
                </div>
                <div className='btn-block'>
                    <div className='edit-profile'>
                        <i>someicon</i>
                        <button>Edit Profile Information</button>
                    </div>
                    <div className='messages-btn'>
                        <i>someicon</i>
                        <button>Messages</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage

{/* <div className='modalka'>
    <input type="text" placeholder='Username'/>
    <input type="text" placeholder='Phone number'/>
    <input type="text" placeholder='Profile image'/>
    <button>Save changes</button>
</div> */}
