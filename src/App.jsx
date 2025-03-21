import './App.css'
import ProjectCard from './ProjectCard/ProjectCard'

const PROJECTS = [
  'НЦ Россия',
  'Премия Служение',
  'Премия Событие',
  'РФС',
]

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>A5K Projects Metrics</h1>
      <div className='projects'>
      {PROJECTS && PROJECTS.map(project=>(<ProjectCard projectName={project}/>))}
      </div>
    </>
  )
}

export default App
