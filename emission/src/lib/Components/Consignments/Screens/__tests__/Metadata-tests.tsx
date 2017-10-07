import * as React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import { ConsignmentMetadata } from "../../index"
import Metadata from "../Metadata"

const nav = {} as any
const route = {} as any

const exampleMetadata: ConsignmentMetadata = {
  title: "My Work",
  year: "1983",
  category: "DESIGN",
  categoryName: "Design",
  medium: "Wood",
  width: "100",
  height: "100",
  depth: null,
  unit: "cm",
  displayString: "5/5",
}

describe("state", () => {
  it("is set up with empty consignment metadata", () => {
    const consignmentMetadata = {} as ConsignmentMetadata
    const tree = renderer.create(<Metadata navigator={nav} route={route} metadata={consignmentMetadata} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("is set up with filled consignment metadata", () => {
    const tree = renderer.create(<Metadata navigator={nav} route={route} metadata={exampleMetadata} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("sets state correctly at init", () => {
    const m = new Metadata({ metadata: exampleMetadata })
    expect(m.state).toEqual(exampleMetadata)
  })

  describe("State changes", () => {
    let metadata: Metadata
    let originalState: ConsignmentMetadata

    beforeEach(() => {
      metadata = new Metadata({ metadata: exampleMetadata })
      originalState = metadata.state

      metadata.setState = partial => (metadata.state = Object.assign({}, originalState, partial))
    })

    it("updates the year", () => {
      metadata.updateYear("1985")
      expect(metadata.state).toMatchDiffSnapshot(originalState)
    })

    it("updates the medium", () => {
      metadata.updateMedium("Metal")
      expect(originalState).toMatchDiffSnapshot(metadata.state)
    })

    it("updates the category", () => {
      metadata.updateMedium("VIDEO_FILM_ANIMATION")
      expect(originalState).toMatchDiffSnapshot(metadata.state)
    })

    it("updates the title", () => {
      metadata.updateTitle("New Artwork Name")
      expect(originalState).toMatchDiffSnapshot(metadata.state)
    })

    it("updates the size metrics", () => {
      metadata.updateHeight("200")
      metadata.updateWidth("200")
      metadata.updateDepth("200")

      expect(originalState).toMatchDiffSnapshot(metadata.state)
    })
  })
})
