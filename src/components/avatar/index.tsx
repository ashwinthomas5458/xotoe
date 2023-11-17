import React from "react";
import AvatarBase from "./avatarBase";
import { CONFIG } from "../../config";

type AvatarProps={
    type: "white"|"yellow"|"blue"|"green"|"orange"|"red"|"grey"|"purple"|undefined
}
const Avatar=({type="white"}:AvatarProps)=>{
   return(<AvatarBase background={CONFIG.avatarConfig[type].background} face={CONFIG.avatarConfig[type].face} />)
}

export default Avatar;