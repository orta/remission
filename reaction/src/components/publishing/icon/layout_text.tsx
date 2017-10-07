import React, { Component } from "react"

class IconLayoutText extends Component<any, null> {
  render() {
    return (
      <svg className="layout-text" width="45px" height="30px" viewBox="0 0 45 30" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g className="layout-text-group" fill={this.props.fill ? this.props.fill : "#000"}>
            <polyline points="0 2 34 2 34 0 0 0" />
            <polyline points="0 7 26 7 26 5 0 5" />
            <rect x="0" y="10" width="45" height="20" />
          </g>
        </g>
      </svg>
    )
  }
}
export default IconLayoutText
