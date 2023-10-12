/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part props = {props.props[0]}/>
      <Part props = {props.props[1]}/>
      <Part props = {props.props[2]}/>
    </div>
  )
}

const Part = (props) => { 
  return (
    <div>
      <p>{props.props.name} {props.props.exercises}</p>
    </div>
  )
}

const Total = (props) => {

  return (
    <div>
      <p>Number of exercises {props.props[0].exercises + props.props[1].exercises + props.props[2].exercises}</p>
    </div>
  )
}

const Course = (props) => {
   return (
     <div>
       <Header course = {props.course.name}/>
       <Content props = {props.course.parts}/>
       <Total props = {props.course.parts} />
     </div>
   )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App