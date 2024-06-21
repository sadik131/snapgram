import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./_auth/forms/SignIn"
import Login from "./_auth/forms/Login"
import { Home } from "./_root/page"
import AuthLoayout from "./_auth/AuthLoayout"
import RootLayout from "./_root/RootLayout"

function App() {

  return (
    <main className="flex h-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          {/* privet  */}
          <Route element={<AuthLoayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/login-in" element={<Login />} />
          </Route>
          {/* public  */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main >
  )
}

export default App
