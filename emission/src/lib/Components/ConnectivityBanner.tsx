import * as React from "react"
import * as Relay from "react-relay"

import styled from "styled-components/native"
import colors from "../../data/colors"
import fonts from "../../data/fonts"

const Container = styled.View`
  height: 30;
  background-color: ${colors["yellow-regular"]};
  justify-content: center;
  align-items: center;
`

const ConnectivityMessage = styled.Text`
  color: ${colors["yellow-bold"]};
  text-align: center;
  font-family: ${fonts["garamond-regular"]};
  font-size: 16;
  padding-top: 5;
`

export default class ConnectivityBanner extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <ConnectivityMessage> No Internet Connection</ConnectivityMessage>
      </Container>
    )
  }
}
