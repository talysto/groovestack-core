import { useGetIdentity } from "react-admin"

export const WelcomeBanner = () => {
  const {
    data: currentUser,
    isLoading: loadingMe
  } = useGetIdentity()
  
  if (loadingMe) return null

  return (
    <>
      {currentUser && !currentUser.roles.includes('admin') ? 
      <div style={{ width: '100%', background: '#cc0000', color: 'white', padding: 10, borderRadius: 5 }}>
        Please Contact your Administrator for access to this application.    
      </div> : null } 
    </>
  )
}
