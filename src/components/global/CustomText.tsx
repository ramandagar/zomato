import { Colors } from "@unistyles/Constants";
import { FC } from "react";
import { Platform, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useStyles } from "react-native-unistyles";

type Variants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7";
type PlatformType = "android" | "ios";


interface CustomTextProps {
  variant?: Variants;
  fontFamily?:
  "Okra-Bold" |
  "Okra-Regular" |
  "Okra-Medium" |
  "Okra-Black";
  platform?: PlatformType;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  children: React.ReactNode;
  style:TextStyle | TextStyle[];
  numberOfLines?: number;
  onLayout?: (event: any) => void;
}

const fontSizeMap: Record<Variants, Record<PlatformType, number>> = {
    h1: { android: 24, ios: 22 },
    h2: { android: 22, ios: 20 },
    h3: { android: 20, ios: 18 },
    h4: { android: 18, ios: 16 },
    h5: { android: 16, ios: 14 },
    h6: { android: 14, ios: 12 },
    h7: { android: 12, ios: 10 },
}

const CustomText: FC<CustomTextProps> = ({
    variant,
    fontFamily = "Okra-Regular",
    fontSize,
    color,
    children,
    numberOfLines,
    onLayout,
    style,
    ...props  
}) => {
     let computedFontSize:number = Platform.OS==='android' ? RFValue(fontSize || 12):RFValue(fontSize || 10)

     if(variant && fontSizeMap[variant]){
      const defaultSize = fontSizeMap[variant][Platform.OS as PlatformType]
      computedFontSize = RFValue(fontSize || defaultSize)
     }

     const fontFamilyStyle = {
         fontFamily
     }

     return(
      <Text
      onLayout={onLayout}
      style={[
        styles.text,
        fontFamilyStyle,
        {fontSize: computedFontSize, color:color || Colors.text},
        style
      ]}
      numberOfLines={numberOfLines!==undefined ? numberOfLines : undefined}
      {...props}
      >
        {children}
      </Text>
     )

}

const styles = StyleSheet.create({
  text:{
    textAlign:'left'
  }
});

export default CustomText