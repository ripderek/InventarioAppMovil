import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";

export const HomeIcon = (props) => (
  <Entypo name="home" size={24} color="white" {...props} />
);
export const EyeIcon = ({ sizeIcon, colorIcon }) => (
  <Entypo name="eye" size={sizeIcon} color={colorIcon} />
);
export const EyeWithLineIcon = ({ sizeIcon, colorIcon }) => (
  <Entypo name="eye-with-line" size={sizeIcon} color={colorIcon} />
);

export const CheclMarkIcon = ({ sizeIcon, colorIcon }) => (
  <Ionicons name="checkmark" size={sizeIcon} color={colorIcon} />
);
export const InfoIcon = (props) => (
  <AntDesign name="infocirlce" size={24} color="black" {...props} />
);

export const BackIcon = (props) => (
  <AntDesign name="back" size={24} color="black" {...props} />
);

export const CheckIcon = (props) => (
  <AntDesign name="checkcircleo" size={24} color="black" {...props} />
);

export const UserIcon = ({ sizeIcon, colorIcon }) => (
  <AntDesign name="user" size={sizeIcon} color={colorIcon} />
);

export const Phone = ({ sizeIcon, colorIcon }) => (
  <Feather name="smartphone" size={sizeIcon} color={colorIcon} />
);

export const InfoIcon2 = ({ sizeIcon, colorIcon }) => (
  <Feather name="info" size={sizeIcon} color={colorIcon} />
);

export const ErrorIcon = ({ sizeIcon, colorIcon }) => (
  <Feather name="x-circle" size={sizeIcon} color={colorIcon} />
);

export const Shopping_bag = ({ sizeIcon, colorIcon }) => (
  <Feather name="shopping-bag" size={sizeIcon} color={colorIcon} />
);

export const Pocket = ({ sizeIcon, colorIcon }) => (
  <Feather name="pocket" size={sizeIcon} color={colorIcon} />
);
export const Shopify = ({ sizeIcon, colorIcon }) => (
  <FontAwesome5 name="shopify" size={sizeIcon} color={colorIcon} />
);
export const Trash = ({ sizeIcon, colorIcon }) => (
  <FontAwesome5 name="trash" size={sizeIcon} color={colorIcon} />
);

export const Shoppingcartcheckout = ({ sizeIcon, colorIcon }) => (
  <MaterialIcons
    name="shopping-cart-checkout"
    size={sizeIcon}
    color={colorIcon}
  />
);
export const Add_circle = ({ sizeIcon, colorIcon }) => (
  <MaterialIcons name="add-circle" size={sizeIcon} color={colorIcon} />
);

export const AccountICon = ({ sizeIcon, colorIcon }) => (
  <MaterialCommunityIcons
    name="account-box-outline"
    size={sizeIcon}
    color={colorIcon}
  />
);
export const Search = ({ sizeIcon, colorIcon }) => (
  <Fontisto name="search" size={sizeIcon} color={colorIcon} />
);
