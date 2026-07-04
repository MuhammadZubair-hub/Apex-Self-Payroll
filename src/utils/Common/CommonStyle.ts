import { StyleSheet } from "react-native";
import { verticalScale } from "../responsive";

export const CommonStyle = StyleSheet.create({

  error: {
    backgroundColor: '#dc2626',
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(80),
    borderRadius: 14,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    fontFamily:'PlusJakartaSans-Regular'
  },
  sucsses: {
    backgroundColor: '#16a34a',
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(80),
    borderRadius: 14,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    fontFamily:'PlusJakartaSans-Regular'
  },
  warning: {
    backgroundColor: '#d97706',
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(80),
    borderRadius: 14,
    paddingHorizontal: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    fontFamily:'PlusJakartaSans-Regular'
  },
})