// import './App.css';
// import React, { Component } from 'react';
// import InsertForm from './components/Insert';
// import SearchUser from './components/SearchUser';
// import DeleteUser from './components/Delete';
// import UpdateRecipeRating from './components/Update';
// import SearchRecipe from './components/SearchRecipe';
// import AdvancedQuery1 from './components/adv1';
// import AdvancedQuery2 from './components/adv2';
 
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <InsertForm />
//         <br></br>
//         <hr></hr>
//         <SearchUser />
//         <br></br>
//         <hr></hr>
//         <UpdateRecipeRating />
//         <br></br>
//         <hr></hr>
//         <SearchRecipe />
//         <br></br>
//         <hr></hr>
//         <DeleteUser />
//         <br></br>
//         <hr></hr>
//         <AdvancedQuery1 />
//         <br></br>
//         <hr></hr>
//         <AdvancedQuery2 />
//         <br></br>
//         <hr></hr>
//       </div>
//     );
//   }
// }
 
// export default App;

import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Results from "./pages/Results";
import User from "./pages/User";
import SignUp from "./pages/SignUp";
import RecipeInfo from "./pages/RecipeInfo";
import UserInfo from "./pages/UserInfo";
import Restaurant from "./pages/Restaurants";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />}> */}
          <Route index element={<Search />} />
          <Route path="results" element={<Results />} />
          <Route path="user" element={<User />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="recipeInfo" element={<RecipeInfo />} />
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="restaurantPrice" element={<Restaurant />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

// const root = createRoot(document.getElementById('root'));
// root.render(<App />);