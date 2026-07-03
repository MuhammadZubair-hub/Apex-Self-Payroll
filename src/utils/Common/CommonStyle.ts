import { StyleSheet } from "react-native";
import { verticalScale } from "../responsive";

export const CommonStyle = StyleSheet.create({
    
  error: {
    backgroundColor: 'red',
    //height: 60,
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(80),
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily:'PlusJakartaSans-Regular'
  },
  sucsses: {
    backgroundColor: '#32CD32',
    //height: 60,
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(80),
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily:'PlusJakartaSans-Regular'
  },
})