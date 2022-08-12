import React from 'react'
import { fireEvent, render, screen, waitFor  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import AppFunctional from './AppFunctional.js'

let up, down, left, right, reset, email, submit


test('Renders the coordinates without an issue', () => {
  render(<AppFunctional />)
  const coordinates = screen.getByText(/Coordinates/i)
  expect(coordinates).toBeInTheDocument()
})

test('Test', () => {
  render(<AppFunctional />)
})

test('Test', () => {
  render(<AppFunctional />)
})

test('Test', () => {
  render(<AppFunctional />)
})

test('Test', () => {
  render(<AppFunctional />)
})