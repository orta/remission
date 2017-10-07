import * as React from "react"
import styled from "styled-components"
import colors from "../../assets/colors"
import { Artwork, ArtworkProps, OverlayProps } from "../artwork"
import ArtworkMetadata, { ArtworkMetadataProps } from "../artwork/metadata"
import createContainer from "../artwork/relay"
import Icon from "../icon"

const OverlayBackground = styled.div`
  background-color: ${colors.purpleRegular};
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0.8;
  text-align: center;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 5px solid ${props => (props.selected ? "white" : "transparent")};
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: border-color 0.3s;
`

const Overlay: React.SFC<OverlayProps> = props =>
  <OverlayBackground>
    <Circle selected={props.selected}>
      <Icon name="check" color="white" />
    </Circle>
  </OverlayBackground>

export const InquiryArtwork: React.SFC<ArtworkProps> = props => {
  return <Artwork {...props} extended={false} Overlay={Overlay} showOverlayOnHover />
}

export default createContainer<ArtworkProps, ArtworkMetadataProps>(InquiryArtwork, ArtworkMetadata)
