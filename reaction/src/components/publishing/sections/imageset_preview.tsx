import PropTypes from "prop-types"
import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"
import { resize } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"
import IconImageSet from "../icon/image_set"

type Layout = "mini" | "full"

interface DivLayoutProps {
  layout?: Layout
}
const div: StyledFunction<DivLayoutProps & React.HTMLProps<HTMLDivElement>> = styled.div

const FullWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  min-height: 50px;
  width: auto;
  max-width: calc(100% - 80px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  padding: 20px;
  cursor: pointer;
`
const TitleWrapper = div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props => (props.layout === "full" ? "50px" : "100%")};
`
const MiniWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px 10px 10px;
  border: 1px solid #e5e5e5;
  cursor: pointer;
`
const MiniInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: auto;
  margin-left: 20px;
`
const Title = styled.div`
  ${Fonts.unica("s19", "medium")}
  margin-bottom: 8px;
  line-height: 1.1em;
  ${pMedia.xs`
    ${Fonts.unica("s16", "medium")}
  `}
`
const SubTitle = styled.div`
  display: flex;
`
const SubTitlePrompt = styled.div`
  ${Fonts.unica("s14", "medium")}
  ${pMedia.xs`
    ${Fonts.unica("s12", "medium")}
  `}
`
const SubTitleCount = styled.div`
  ${Fonts.unica("s14")}
  margin-left: 20px;
  ${pMedia.xs`
    ${Fonts.unica("s12")}
  `}
`
const IconContainer = styled.div`
  height: 45px;
  position: relative;
  margin-left: 40px;
  text-align: right;
  > svg {
    height: 98%;
  }
  ${pMedia.xs`
    display: none;
  `}
`
export interface Props {
  section: {
    type: string
    images: Array<{
      url?: string
      image?: string
      index?: any
    }>
    layout?: Layout
    title?: string
  }
}

class ImageSetPreview extends Component<Props, null> {
  static contextTypes = {
    onViewFullscreen: PropTypes.func,
  }
  getImageUrl() {
    const image = this.props.section.images[0]
    const src = image.url ? image.url : image.image
    return resize(src, { width: 1200 })
  }
  image() {
    const src = this.getImageUrl()
    const width = this.props.section.layout === "full" ? "100%" : "auto"
    const height = this.props.section.layout === "full" ? "auto" : "100%"
    return <img src={src} width={width} height={height} alt={this.props.section.title || "Open Slideshow"} />
  }
  onClick = () => {
    if (this.context.onViewFullscreen) {
      this.context.onViewFullscreen(this.props.section.images[0].index)
    }
  }
  wrapper() {
    if (this.props.section.layout === "full") {
      return (
        <FullWrapper onClick={this.onClick}>
          {this.textSection()}
          {this.icon()}
        </FullWrapper>
      )
    } else {
      return (
        <MiniWrapper onClick={this.onClick}>
          {this.image()}
          <MiniInner>
            {this.textSection()}
            {this.icon()}
          </MiniInner>
        </MiniWrapper>
      )
    }
  }
  textSection() {
    return (
      <TitleWrapper layout={this.props.section.layout}>
        {this.title()}
        <SubTitle>
          <SubTitlePrompt>View Slideshow</SubTitlePrompt>
          {this.subTitleCount()}
        </SubTitle>
      </TitleWrapper>
    )
  }
  title() {
    let title = this.props.section.images.length + " Images"
    if (this.props.section.title) {
      title = this.props.section.title
    }
    return <Title>{title}</Title>
  }
  subTitleCount() {
    if (this.props.section.title) {
      return <SubTitleCount>{this.props.section.images.length} Images</SubTitleCount>
    }
  }
  icon() {
    return (
      <IconContainer>
        <IconImageSet />
      </IconContainer>
    )
  }
  render() {
    const image = this.props.section.layout === "full" ? this.image() : null
    return (
      <div style={{ position: "relative", width: "100%" }}>
        {this.wrapper()}
        {image}
      </div>
    )
  }
}
export default ImageSetPreview
