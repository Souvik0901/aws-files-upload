import { useState } from 'react'
import { useProfilesContext } from '../hooks/useProfilesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ProfileForm = () => {
  const {dispatch} = useProfilesContext()
  const { user } = useAuthContext()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('')
  const [designation, setDesignation] = useState('')
  const [skills, setSkills] = useState('')
  const [education, setEducation] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [socialmedia, setSocialmedia] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  // this is the handle submit fuction which shows the details in browser fetching from db
  const handleSubmit = async (e) => {
    e.preventDefault()


    if (!user) {
      setError('You must be logged in')
      return
    }

    const profile = {username, email, about, designation,skills,education, contact, address, socialmedia}
    
    const response = await fetch('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }

    })
    
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setUsername('')
      setEmail('')
      setAbout('')
      setDesignation('')
      setSkills('')
      setEducation('')
      setContact('')
      setAddress('')
      setSocialmedia('')
      dispatch({type: 'CREATE_PROFILE', payload: json})
      setEmptyFields([])

    }

  }



  
  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add the Profile Details</h3>

      <label>Username :</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
        className= {emptyFields.includes('username')?'error':''}
      />

      <label>Email ID :</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        className= {emptyFields.includes('email')?'error':''}
      />

      <label>About :</label>
      <input 
        type="text" 
        onChange={(e) => setAbout(e.target.value)} 
        value={about}
        className= {emptyFields.includes('about')?'error':''}
      />

      <label>Designation :</label>
      <input 
        type="text" 
        onChange={(e) => setDesignation(e.target.value)} 
        value={designation}
        className= {emptyFields.includes('designation')?'error':''}
      />

      <label>Skills :</label>
      <input 
        type="text" 
        onChange={(e) => setSkills(e.target.value)} 
        value={skills}
        className= {emptyFields.includes('skills')?'error':''}
      />  

      <label>Education :</label>
      <input 
        type="text" 
        onChange={(e) => setEducation(e.target.value)} 
        value={education}
        className= {emptyFields.includes('education')?'error':''}
      />  

      <label>Contact No. :</label>
      <input 
        type="number" 
        onChange={(e) => setContact(e.target.value)} 
        value={contact}
        className= {emptyFields.includes('contact')?'error':''}
      />

      <label>Address :</label>
      <input 
        type="text" 
        onChange={(e) => setAddress(e.target.value)} 
        value={address} 
        className= {emptyFields.includes('address')?'error':''}
      />

      <label>Social Media :</label>
      <input 
        type="text" 
        onChange={(e) => setSocialmedia(e.target.value)} 
        value={socialmedia}
        className= {emptyFields.includes('socialmedia')?'error':''}
      />

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProfileForm