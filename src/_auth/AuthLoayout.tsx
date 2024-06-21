import { Navigate, Outlet } from 'react-router-dom'

function AuthLoayout() {
  const isAuthenticated = false
  return (
    <>
      {isAuthenticated ? (
        <>
          <Navigate to={"/"} />
        </>
      ) : (
        <>
          <section className='flex flex-1 p-10 justify-center items-center flex-col'><Outlet /></section>
          <img className='w-1/2 object-cover hidden xl:block bg-no-repeat h-screen' src="/img/side-img.jpg" alt="banner" />
        </>
      )}
    </>
  )
}

export default AuthLoayout