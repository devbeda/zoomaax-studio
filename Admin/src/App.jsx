import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from'react-router-dom'
import Layout from './Layout'
import AddContent from './pages/AddContent'
import AddNews from './pages/AddNews'
import YourContents from './pages/YourContents'
import YourNews from './pages/YourNews'
import News from './pages/News'
import Content from './pages/Content'
import AddEvent from './pages/AddEvent'
import Events from './pages/Events'
import Event from './pages/Event'
import AddCasting from './pages/Casting/AddCasting'
import Castings from './pages/Casting/Castings'
import Cast from './pages/Casting/Cast'
import AddTeam from './pages/Team/AddTeam'
import GetTeam from './pages/Team/GetTeam'
import UpdateTeam from './pages/Team/UpdateTeam'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route path='' element = {<AddContent/>} />
        <Route path='addnews' element={<AddNews/>}/>
        <Route path='yourcontents' element={<YourContents/>}/>
        <Route path='yournews' element={<YourNews/>}/>
        <Route path='/news/:id' element={<News/> } />
        <Route path='/content/:id' element={<Content/>} />
        <Route path='/addevent' element={<AddEvent />} />
        <Route path='/events' element={<Events />} />
        <Route path='/event/:id' element={<Event />} />
        <Route path='/addcasting' element={<AddCasting/>} />
        <Route path='/getcastings' element={<Castings/>} />
        <Route path='/getcast/:id' element={<Cast />} />
        <Route path='/addteam' element={<AddTeam />} />
        <Route path='/getteams' element={<GetTeam />} />
        <Route path='/getteam/:id' element={<UpdateTeam />} />
      </Route>
    </Routes>
  )
}

export default App
