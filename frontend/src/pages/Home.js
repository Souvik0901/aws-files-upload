import { useEffect } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from "../hooks/useAuthContext"


//Components
import ProfileForm from "../components/ProfileForm"
import ProfileDetails from "../components/ProfileDetails"





const Home = () => {
 

 
  const {profiles, dispatch} = useProfilesContext()
  const {user} = useAuthContext()

  // for fetching the Profile details
  useEffect(()=> {
      const fetchProfiles = async () => {
        const response = await fetch('/api/profiles',{
          headers: {'Authorization': `Bearer ${user.token}`},

        })
        const json = await response.json()
        

        if(response.ok){
          dispatch({type: 'SET_PROFILES', payload: json})
        }
      } 

      if(user){
         
        fetchProfiles()  
      }
 
     }, [dispatch, user])
  



  return (
    <div className="home">
      <div className="profiles">
        {profiles && profiles.map(profile =>(
           <ProfileDetails profile={profile} key= {profile._id}/>
        ))}
      </div>
      <ProfileForm/>
    </div>
  )
}

export default Home