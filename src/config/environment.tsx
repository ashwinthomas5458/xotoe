/* CONFIG */
import COLORS from "./colors";

const AVATAR_CONFIG = {
    "white":{"background": COLORS.__x_purple,"face":COLORS.__x_white},
    "yellow":{"background": COLORS.__x_purple,"face":COLORS.__x_yellow},
    "blue":{"background": COLORS.__x_orange,"face":COLORS.__x_blue},
    "green":{"background": COLORS.__x_orange,"face":COLORS.__x_green},
    "orange":{"background": COLORS.__x_yellow,"face":COLORS.__x_orange},
    "red":{"background": COLORS.__x_yellow,"face":COLORS.__x_red},
    "grey":{"background": COLORS.__x_green,"face":COLORS.__x_grey},
    "purple":{"background": COLORS.__x_green,"face":COLORS.__x_purple},
}
const AVATAR_LIST = ["white","yellow","blue","green","orange","red","grey","purple"]

const CONFIG = {
    appName: "Xotoe",
    avatarConfig: AVATAR_CONFIG,
    avatarList: AVATAR_LIST
}

export default CONFIG;