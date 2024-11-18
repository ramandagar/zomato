import { FC } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
    name: string;
    size: number;
    color: string;
    iconFamily: "Ionicons" | "MaterialIcons" | "MaterialCommunityIcons";
}

const Icon: FC<IconProps> = ({ name, size, color, iconFamily }) => {
    return (
        <>
            {iconFamily === "Ionicons" && <Ionicons name={name} size={size} color={color} />}
            {iconFamily === "MaterialIcons" && <MaterialIcons name={name} size={size} color={color} />}
            {iconFamily === "MaterialCommunityIcons" && <MaterialCommunityIcons name={name} size={size} color={color} />}
        </>
    )
}

export default Icon;