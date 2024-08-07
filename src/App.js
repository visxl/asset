import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout';
import Dashboard from './components/Main/Dashboard';
import Asset from './components/Main/Asset';
import AddAsset from './components/Create And Edit/AddAsset';
import Asset250 from './components/Main/Asset250';
import AddAsset250 from './components/Create And Edit/AddAsset250';
import Users from './components/Main/Users';
import UserSetting from './components/Main/UserSetting';
import AssetDetail from './components/View/AssetDetail';
import Asset250Detail from './components/View/Asset250Detail';
import AssetReport from './components/Report/AssetReport';
import Asset250Report from './components/Report/Asset250Report';
import Login from './components/SignIn/Login';
import AddUsers from './components/Create And Edit/AddUser';
import Task from './components/Main/Task';
import AddTask from './components/Create And Edit/AddTask';
import UserReport from './components/Report/UserReport';
import Supplier from './components/Main/Supplier';
import AddSupplier from './components/Create And Edit/AddSupplier';
import TaskReport from './components/Report/TaskReport';
import UserProfile from './components/Main/UserProfile';
import SupplierReport from './components/Report/SupplierReport';

function App() {
  return (
    <Router>
      <Routes>

        <Route  path='/login' element={<Login />}/>
        <Route path='asset/report' element={<AssetReport/>}/>
        <Route path='asset250/report' element={<Asset250Report/>}/>
        <Route path='task/report' element={<TaskReport/>}/>
        <Route path='user/report' element={<UserReport/>}/>
        
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />}/>

          <Route path='users' element={<Users/>}/>
          <Route path='add-users' element={<AddUsers/>}/>
          <Route path='users/profile/:id' element={<UserProfile/>}/>
          <Route path='users/setting/:id' element={<UserSetting/>}/>

          <Route path='asset' element={<Asset />}/>
          <Route path='add-asset' element={<AddAsset/>}/>
          <Route path='edit-asset/:id' element={<AddAsset/>}/>
          <Route path='asset/view/:id' element={<AssetDetail/>}/>

          <Route path='supplier' element={<Supplier />}/>
          <Route path='add-supplier' element={<AddSupplier/>}/>
          <Route path='edit-supplier/:id' element={<AddSupplier/>}/>
          <Route path='supplier/report' element={<SupplierReport/>}/>
          

          <Route path='asset250' element={<Asset250 />}/>
          <Route path='add-asset250' element={<AddAsset250 />}/>
          <Route path='edit-asset250/:id' element={<AddAsset250/>}/>
          <Route path='asset250/view/:id' element={<Asset250Detail/>}/>

          <Route path='task' element={<Task />}/>
          <Route path='add-task' element={<AddTask />}/>
          <Route path='edit-task/:id' element={<AddTask/>}/>

        </Route>
        <Route path='login' element={<div>Login</div>}/>
      </Routes>
    </Router>
  );
}

export default App;