
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from "./components/Home.jsx"
import Jobs from "./components/Jobs.jsx";
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs.jsx"
import PostJob from "./components/admin/postJob.jsx"
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/protectedRoute.jsx'
const appRouter=createBrowserRouter([
{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/signup',
  element:<Signup/>
},{
  path:"/jobs",
 element:<Jobs/>
},
{
  path:"/description/:id",
 element:<JobDescription/>
},
{
  path:"/browse",
 element:<Browse/>
},
{
  path:"/profile",
 element:<Profile/>
},
//admin ka liye
{
  path:"/admin/companies",
  element: <ProtectedRoute><Companies/></ProtectedRoute>
},
{
  path:"/admin/companies/create",
  element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>   
},
{
  path:"/admin/companies/:id",
  element:  <ProtectedRoute><CompanySetup/></ProtectedRoute>  
},

{
  path:"/admin/jobs",
  element:<ProtectedRoute><AdminJobs/></ProtectedRoute>   
},
{
  path:"/admin/jobs/create",
element: <ProtectedRoute><PostJob/></ProtectedRoute>  
},
{
  path:"/admin/jobs/:id/applicants",
element: <ProtectedRoute><Applicants/></ProtectedRoute> 
},


])
function App() {
  

  return (
    <>
<RouterProvider router={appRouter}/>
  
    </>
  )
}

export default App
