// This will help to calculate the height and width of the device screen to make app responsive.

import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = percentage => {
    return (percentage * deviceHeight) / 100;
}

export const wp = percentage => {
    return (percentage * deviceWidth) / 100;
}