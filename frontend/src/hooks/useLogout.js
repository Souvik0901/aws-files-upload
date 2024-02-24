import { useAuthContext } from './useAuthContext'
import { useProfilesContext} from './useProfilesContext'


export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const { dispatch: dispatchProfiles } = useProfilesContext()





  const logout = () => {


    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    dispatchProfiles({ type: 'SET_PROFILES', payload: null })
  }

  return { logout }
}