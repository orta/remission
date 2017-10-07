import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"
import { block } from "./helpers"
import { border, borderedInput } from "./mixins"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean
  block?: boolean
  rightView?: JSX.Element
}

interface InputState {
  borderClasses: string
}

const StyledInput = styled.input`
  ${borderedInput}
  ${block(24)}
`

const BorderlessInput = styled.input`
  border: 0;
  ${fonts.secondary.style}
  font-size: 17px;
  outline: none;
  flex: 1;
`

const StyledDiv = styled.div`
  ${borderedInput}
  border: 0;
  padding: 12px;
  margin-right: 0;
  display: flex;
  position: relative;

  & .border-container {
    z-index: -1;
    ${border}
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    top: 0;
    left: 0;
  }
`

const BorderClassname = "border-container"

class Input extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      borderClasses: BorderClassname,
    }
  }

  onFocus(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      borderClasses: `${BorderClassname} focused`,
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      borderClasses: BorderClassname,
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  render() {
    if (this.props.rightView) {
      const newProps: any = { ...this.props }
      delete newProps.className

      return (
        <StyledDiv>
          <div className={this.state.borderClasses} />
          <BorderlessInput {...newProps} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
          {this.props.rightView}
        </StyledDiv>
      )
    }

    return <StyledInput {...this.props} />
  }
}

export default Input
