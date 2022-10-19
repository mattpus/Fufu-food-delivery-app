import { Auth, DataStore } from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react'
import { User } from '../models';



const AuthContext = createContext<any>({});


const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState<any>(null)
  const [dbUser, setDbUser] = useState<any>(null)
  const sub = authUser?.attributes?.sub

  useEffect(() => {

      Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser)
  },[])
  useEffect(() => {
  DataStore.query(User, (user) => user.sub('eq', sub)).then((users) => setDbUser(users[0]))
  },[sub])

  console.log("AUTHUSER", authUser)
  return (
    <AuthContext.Provider value={ {authUser, dbUser, sub, setDbUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext)