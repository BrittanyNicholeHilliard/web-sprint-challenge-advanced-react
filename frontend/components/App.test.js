import React from 'react'
import { fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';


import AppFunctional from './AppFunctional.js'



beforeEach(()=> {
  const up = screen.queryByTestId('up')
  const down = screen.queryByTestId('down')
  const left = screen.queryByTestId('left')
  const right = screen.queryByTestId('right')
  const reset = screen.queryByTestId('reset')
  const coordinates = screen.queryByTestId('coordinates')
  const email = screen.queryByTestId('email')
  const submit = screen.queryByTestId('submit')
  const steps = screen.queryByTestId('steps')
})

test('Renders the Functional App without an issue', () => {
  render(<AppFunctional />)
})

test('Each move button works and step count works', async () => {
  render(<AppFunctional />)
  fireEvent.click(up)
  fireEvent.click(down)
  fireEvent.click(left)
  fireEvent.click(right)

  await expect(steps).toHaveTextContent('You moved 4 times')
  await expect(coordinates).toHaveTextContent('Coordinates (2, 2)')
})

test('reset button works', async () => {
  render(<AppFunctional />)
  fireEvent.click(up)
  fireEvent.click(down)
  fireEvent.click(left)
  fireEvent.click(right)
  fireEvent.click(reset)
  await expect(steps).toHaveTextContent('You moved 0 times')
  await expect(coordinates).toHaveTextContent('Coordinates (2, 2)')
})

test('Typing an email changes the value of the field', () => {

  render(<AppFunctional />)
  fireEvent.change(email, {target: {value: 'foo@bar.ba'}} )
  expect(email).toHaveValue('foo@bar.ba')

})

test('Test that you cannot move down more than once from the center', () => {
  render(<AppFunctional />)

  fireEvent.click(down)
  fireEvent.click(down)

  expect(screen.queryByText(`You can't go down`)).toBeInTheDocument()
})