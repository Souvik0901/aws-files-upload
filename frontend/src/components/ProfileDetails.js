import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from '../hooks/useAuthContext'


const ProfileDetails = ({ profile }) => {

  const { dispatch } = useProfilesContext()
  const { user } = useAuthContext()

  const handleClick = async()=>{
    if (!user) {
      return
    }


    const response = await fetch('/api/profiles/'+ profile._id,{
      method : 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    if(response.ok){
      dispatch({type: 'DELETE_PROFILE', payload: json})
    }

  }



  return (
    <div className="profile-details">
      <h4>{profile.username}</h4>
      <p><strong>EmailID : </strong>{profile.email}</p>
      <p><strong>About : </strong>{profile.about}</p>
      <p><strong>Designation : </strong>{profile.designation}</p>
      <p><strong>Skills : </strong>{profile.skills}</p>
      <p><strong>Education : </strong>{profile.education}</p>
      <p><strong>Contact No. : </strong>{profile.contact}</p>
      <p><strong>Address : </strong>{profile.address}</p>
      <p><strong>SocialMedia : </strong>{profile.socialmedia}</p>
      <p>{profile.createdAt}</p>
      <span className="material-symbols-outlined" onClick = {handleClick}>delete</span>
    </div>
  )
}

export default ProfileDetails