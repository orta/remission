import * as React from "react"

import Icon from "./icon"

import styled from "styled-components"
import colors from "../assets/colors"
import { secondary } from "../assets/fonts"

interface Props extends React.HTMLProps<BorderedPulldown> {
  options: any
  defaultValue: string
  onChange?: any
}

interface State {
  selected: any
  isHovered: boolean
}

export class BorderedPulldown extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      isHovered: false,
    }
  }

  toggleHover(value) {
    this.setState({
      isHovered: value,
    })
  }

  onChange(option) {
    this.setState({
      selected: option,
      isHovered: false,
    })
    this.props.onChange(option)
  }

  render() {
    const { options, defaultValue } = this.props

    const optionEls = options.map(option => {
      return (
        <a key={option.val} onClick={() => this.onChange(option)}>
          {option.name}
        </a>
      )
    })

    const displayValue = (this.state.selected && this.state.selected.name) || defaultValue
    let pulldownStyles = {}

    if (this.state.isHovered) {
      pulldownStyles = {
        display: "block",
      }
    }

    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <Toggle>
          <span>
            {displayValue}
          </span>
          <CaretHolder>
            <Icon name="arrow-down" fontSize="9px" color={colors.grayMedium} />
          </CaretHolder>
        </Toggle>
        <PulldownOptions style={pulldownStyles}>
          {optionEls}
        </PulldownOptions>
      </div>
    )
  }
}

const StyledBorderedPulldown = styled(BorderedPulldown)`
  ${secondary.style}
  display: inline-block;
  width: 200px;
  position :relative;
  border: 2px solid ${colors.grayMedium};
  text-align: left;
  font-size: 17px;
  &.is-disabled {
    .bordered-pulldown-toggle {
      cursor: default;
      color: ${colors.grayBold};
    }
  }
`

const Toggle = styled.div`
  display: block;
  padding: 8px 10px 6px;
  text-decoration: none;
`

const CaretHolder = styled.div`
  float: right;
  padding-left: 5px;
  border-left: 1px solid ${colors.grayMedium};
`

const PulldownOptions = styled.div`
  display: none;
  position: absolute;
  background: white;
  border: 2px solid ${colors.grayMedium};
  top: -2px;
  left: -2px;
  right: -2px;
  z-index: 2;
  > a {
    text-decoration: none;
    overflow: ellipsis;
    display: block;
    padding: 8px 10px 6px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: ${colors.gray};
    } 
  } 
`

export default StyledBorderedPulldown
