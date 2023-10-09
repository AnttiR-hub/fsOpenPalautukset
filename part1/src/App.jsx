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
      <Part partName = {props.part1} partExercises ={props.exercises1}/>
      <Part partName = {props.part2} partExercises ={props.exercises2}/>
      <Part partName = {props.part3} partExercises ={props.exercises3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partName} {props.partExercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const courseData = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {courseData}/>
      <Content part1 = {part1} exercises1 = {exercises1} part2 = {part2} exercises2 = {exercises2} part3 = {part3} exercises3 = {exercises3}/>
      <Total exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} />
    </div>
  )
}

export default App