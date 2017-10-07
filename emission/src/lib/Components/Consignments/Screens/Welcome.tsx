import * as React from "react"

import Circle from "../Components/CircleImage"
import ConsignmentBG from "../Components/ConsignmentBG"
import { Button } from "../Components/FormElements"
import { BodyText as P, LargeHeadline } from "../Typography"
import Overview from "./Overview"

import { NavigatorIOS, Route, ScrollView, View, ViewProperties } from "react-native"

interface Props extends ViewProperties {
  navigator: NavigatorIOS
  route: Route
}

export default class Welcome extends React.Component<Props, null> {
  goTapped = () => this.props.navigator.push({ component: Overview })

  render() {
    return (
      <ConsignmentBG>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingTop: 40, alignItems: "center" }}>
            <LargeHeadline>Sell works from your collection through our partner network</LargeHeadline>

            <View style={{ width: 300, alignItems: "center", marginTop: 20 }}>
              <Circle source={require("../../../../../images/consignments/email.png")} />

              <P>Sell work from your collection through our partner network.</P>
              <Circle source={require("../../../../../images/consignments/hammer.png")} />

              <P>Get your work placed in an upcoming sale.</P>
            </View>

            <Button text="GET STARTED" onPress={this.goTapped} />
          </View>
        </ScrollView>
      </ConsignmentBG>
    )
  }
}
