/*
 *Common Tasks carried all over the project
 */
import React from "react";
import Toast from 'react-native-toast-message';

export const Validations = {
  /**
   * desc: Method of all validation
   * @returns boolean
   */

  verifyRequired(text,errorMsg) {
    if (text && text.trim().length > 0) {
      return true;
    } else {
      Toast.show({
        type: 'error',
        text1: errorMsg,
        position: 'top',
        topOffset: Platform.OS == 'ios' ? 55 : 20
      });
      return false;
    }
  },

  verifyEmail(email) {
    if (email) {
      var mailformat =
        /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (email.match(mailformat)) {
        return true;
      } else {
        // ShowToast(STRINGS.EMAIL_ERROR);
        return false;
      }
    } else {
      // ShowToast(STRINGS.EMPTY_EMAIL_ERROR);
      return false;
    }
  },

  verifyPhone(phoneNo){
    if (phoneNo !== "") {
      // var phoneNoFormat = /^\d{10}$/;
      // if (phoneNo.match(phoneNoFormat)) {
      return true;
      // } else {
      //   ShowToast(STRINGS.PHONE_ERROR);
      //   return false;
      // }
    } else {
      //ShowToast(STRINGS.EMPTY_PHONE_ERROR);
      return false;
    }
  },

  verifyPass(text) {
    // if (text && text.length > 0) {
    //     var passFormat = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    //     if (passFormat.test(text)) {
    //         return true;
    //     }else {
    //         showErrorAlert(STRINGS.errPassChecking)
    //     }
    // } else {
    //     showErrorAlert(STRINGS.errEmptyPass)
    //     return false
    // }
    if (text && text.length > 0) {
      return true;
    } else {
      //ShowToast(STRINGS.PASSWORD_ERROR);
      return false;
    }
  },

  VerifySignup(phnNo, cc, name, email) {
    if (
      this.verifyPhone(phnNo) &&
      this.verifyRequired(cc) &&
      this.verifyRequired(name) &&
      this.verifyEmail(email)
    ) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * desc: Method of login validation
   * @returns boolean
   */
  VerifyLogin(cc, phone) {
    if (this.verifyPhone(phone) && this.verifyRequired(cc)) {
      return true;
    } else {
      return false;
    }
  },

  verifyChangePass(oldPass, newPass, confPass) {
    if (
      this.verifyPass(oldPass) &&
      this.verifyPass(newPass) &&
      newPass === confPass
    ) {
      return true;
    } else {
      return false;
    }
  },

  verifyOtp(otp) {
    if (otp && otp.length == 4) {
      return true;
    } else {
      // ShowToast(STRINGS.OTP_VERIFY);
      return false;
    }
  },
};
