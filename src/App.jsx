import './App.css'
import ProjectCard from './components/ProjectCard/ProjectCard'
import InlineButton from './components/InlineButton/InlineButton'

const PROJECTS = [
  { name: 'НЦ Россия', color: 'red' },
  { name: 'Премия Служение', color: 'gold' },
  { name: 'Премия Событие', color: 'white' },
  { name: 'РФС', color: 'blue' },
]

function App() {

  const handleResetAll = () => {
    PROJECTS.forEach(project => {
      localStorage.removeItem('metrics_' + project.name);
    });
    window.location.reload();
  };

  return (
    <>
      <h1>A5K Projects Metrics</h1>
      <p><InlineButton handleClick={handleResetAll} color='grey' hoverColor='red'>reset all</InlineButton></p>
      <div className='projects'>
      {PROJECTS && PROJECTS.map(project=>(<ProjectCard projectName={project.name} color={project.color}/>))}
      </div>
    </>
  )
}

export default App
