import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme'
import ArrowLeft from './ArrowLeft';
import ThreeDotsCircle from './ThreeDotsCircle';
import ThreeDotsHorizontal from './ThreeDotsHorizontal';
import Home from './Home';
import Mail from './Mail';
import Lock from './Lock';
import User from './User';
import Heart from './Heart';
import Plus from './Plus';
import Search from './Search';
import Call from './Call';
import Camera from './Camera';
import Edit from './Edit';
import Comment from './Comment';
import Share from './Share';
import Send from './Send';
import Delete from './Delete';
import Logout from './logout';
import Video from './Video';
import Image from './Image';
import Location from './Location';


const icons = {
    home: Home,
    mail: Mail,
    lock: Lock,
    user: User,
    heart: Heart,
    plus: Plus,
    search: Search,
    call: Call,
    camera: Camera,
    edit: Edit,
    arrowLeft: ArrowLeft, // Fixed typo which caused error. Change: Arrowleft to arrowLeft
    ThreeDotsCircle: ThreeDotsCircle,
    ThreeDotsHorizontal: ThreeDotsHorizontal,
    comment: Comment,
    share: Share,
    send: Send,
    delete: Delete,
    logout: Logout,
    image: Image,
    video: Video,
    location: Location,
}

// I added this export beacuse I was getting an error
const Icon = ({name, ...props}) => {
    const IconComponent = icons[name]
  return (
    <IconComponent 
        height={props.size || 24}
        width={props.size || 24}
        strokeWidth={props.strokeWidth || 1.9}
        color={theme.colors.textLight}
        {...props}

    />
  )
}

export default Icon

const styles = StyleSheet.create({})