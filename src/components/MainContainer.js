import React from 'react'
import ImageContainer from './ImageContainer.js'
import QuickSearchContainer from './QuickSearchContainer.js'
import FooterContainer from './FooterContainer.js'
import { Container } from 'react-bootstrap'

export default function MainContainer() {
  return (
    <Container fluid>
    <ImageContainer/>
    <Container>
      <QuickSearchContainer/>
      <FooterContainer/>
      </Container>
    </Container>
  )
}
