import './App.css'
import ProjectCard from './ProjectCard/ProjectCard'

const PROJECTS = [
  { name: 'НЦ Россия', color: 'red' },
  { name: 'Премия Служение', color: 'gold' },
  { name: 'Премия Событие', color: 'white' },
  { name: 'РФС', color: 'blue' },
]

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>A5K Projects Metrics</h1>
      <div className='projects'>
      {PROJECTS && PROJECTS.map(project=>(<ProjectCard projectName={project.name} color={project.color}/>))}
      </div>
    </>
  )
}

export default App
