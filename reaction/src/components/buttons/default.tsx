import * as React from "react"
import styled from "styled-components"
import colors from "../../assets/colors"
import * as fonts from "../../assets/fonts"
import { block } from "../helpers"
import { IconProps } from "../icon"

export interface ButtonProps extends React.HTMLProps<Button> {
  state?: ButtonState
  block?: boolean
  icon?: React.ReactElement<IconProps>
}

export enum ButtonState {
  Default,
  Loading,
  Success,
  Failure,
}

class Button extends React.Component<ButtonProps, any> {
  public static defaultProps: ButtonProps

  render(): JSX.Element {
    // TODO Do we really need to pass an opaque object along or do we know which props should be passed along?
    const newProps: any = { ...this.props }
    delete newProps.state
    delete newProps.block
    delete newProps.icon

    return this.props.href
      ? <a className={this.props.className} {...newProps}>
          {this.props.icon}
          <span>{this.props.children}</span>
        </a>
      : <button className={this.props.className} {...newProps}>
          {this.props.icon}
          <span>{this.props.children}</span>
        </button>
  }
}

export const StyledButton = styled(Button)`
  background: ${props => {
    if (props.state === ButtonState.Success) return colors.greenRegular
    if (props.state === ButtonState.Failure) return colors.redRegular

    return colors.grayRegular
  }};
  color: ${props => {
    if (props.disabled) return "rgba(0,0,0,0.5)"
    if (props.state !== ButtonState.Default) return "white"
    return "black"
  }};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  font-size: 13px;
  line-height: 1;
  outline: 0;
  transition: background-color .25s,color .25s;
  margin: 10px;
  border: none;
  box-sizing: border-box;
  text-decoration: none;

  &:hover:not(:disabled) {
    cursor: pointer;
    background: ${props => {
      if (props.state === ButtonState.Success) return colors.greenBold
      if (props.state === ButtonState.Failure) return colors.redBold

      return colors.grayMedium
    }};
  }

  ${fonts.primary.style}
  ${block()}
`

StyledButton.defaultProps = {
  state: ButtonState.Default,
  block: false,
}

export default StyledButton
