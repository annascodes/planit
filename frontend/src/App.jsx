import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";
import TaskDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";

import toast, { Toaster } from "react-hot-toast";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import AllUsers from "./pages/AllUsers";
import AddNewUser from "./pages/AddNewUser";
import CreateTeam from "./pages/CreateTeamPage";
import Team from "./pages/Teams";
import BottomBar from "./components/BottomBar";
import AddDesignation from "./pages/Designations";
import Roles from "./pages/Roles";




function App() {
  const { currentUser } = useSelector(state => state.user)
  // console.log(currentUser)
  return (
    <div>
      <BrowserRouter>
        <nav className="fixed top-0 w-full bg-white shadow-md  z-50 p-3">
          {/* Navbar content here */}
        <Navbar />

        </nav>

        <div className="flex flex-row mt-20">
          {currentUser && (
            <div

              // className="hidden md:block  w-2/12"
              className=" hidden md:block   w-2/12"
            >
              <Sidebar />

            </div>
          )}

          <div
            // className={`${currentUser ? ' md:w-10/12' : "w-full"}  border-l-0 border-black p-3 min-h-screen`}
            className={`w-full md:w-10/12   border-black  min-h-screen mb-12`}
          >
            <Routes>
              <Route
                path="/"
                element={currentUser ? <Home /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/login"
                element={currentUser ? <Navigate to={"/"} /> : <Login />}
              />
              <Route
                path="/register"
                element={currentUser ? <Navigate to={"/"} /> : <Register />}
              />
              <Route
                path="/overview"
                element={
                  currentUser ? <Overview /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path="/tasks"
                element={currentUser ? <Tasks /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/taskdetails/:id"
                element={
                  currentUser ? <TaskDetail /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path="/addtask"
                element={(currentUser && currentUser.title === 'admin') ? <AddTask /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/allusers"
                element={currentUser ? <AllUsers /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/profile/:username"
                element={
                  currentUser ? <UserProfile /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path="/addnewuser"
                element={
                  (currentUser && currentUser.title === 'admin') ? <AddNewUser /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path="/createteam"
                element={
                  (currentUser && currentUser.title === 'admin') ? <CreateTeam /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path="/teams"
                element={
                  (currentUser && currentUser.title === 'admin') ? <Team /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path="/roles"
                element={
                  (currentUser && currentUser.title === 'admin') ? <Roles /> : <Navigate to={"/login"} />
                }
              />
            </Routes>
          </div>
        </div>

        {/* ---on small screen ---  */}

        <BottomBar />

        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App
