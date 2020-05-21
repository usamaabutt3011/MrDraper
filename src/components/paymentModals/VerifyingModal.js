import React from 'react'
import { View } from 'react-native'
import { WP, colors } from '../../services';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { MediumTitle, NormalText } from '../text'

export const VerifyingModal = props => {
  return (
    <Modal
      animationInTiming={200}
      animationOutTiming={100}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      avoidKeyboard={true}
      transparent={true}
      isVisible={props.showModal}
      // onBackdropPress={() => this.setState({ resume: false, onBoarding: true })}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      {props.isSuccess ?
        <View style={{ width: WP('90'), backgroundColor: colors.white, alignSelf: 'center', marginTop: WP('14'), borderRadius: 5 }}>
          <View style={{ alignItems: 'center', marginVertical: WP('5') }}>
            <AntIcon
              name={'checkcircle'}
              color={colors.buttonColor}
              size={50}
            />
          </View>
          <MediumTitle
            text={`Payment Verified`}
            style={{ marginHorizontal: WP('5'), textAlign: 'center', }}
          />
          <NormalText
            text={`Thank you for your patience.`}
            style={{ marginHorizontal: WP('5'), textAlign: 'center', marginVertical: WP('4') }}
          />
        </View>
        :
        <View style={{ width: WP('90'), backgroundColor: colors.white, alignSelf: 'center', marginTop: WP('14'), borderRadius: 5 }}>
          <MediumTitle
            text={`Verifying Payment...`}
            style={{ marginHorizontal: WP('5'), textAlign: 'center', marginTop: WP('5') }}
          />
          <NormalText
            text={`This may take a few seconds.`}
            style={{ marginHorizontal: WP('5'), textAlign: 'center', marginVertical: WP('4') }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: WP('10') }}>
            <Icon
              name={'circle'}
              color={colors.lightGrey}
              size={10}
              style={{ marginHorizontal: 4 }}
            />
            <Icon
              name={'circle'}
              color={colors.buttonColor}
              size={10}
              style={{ marginHorizontal: 4 }}
            />
            <Icon
              name={'circle'}
              color={colors.lightGrey}
              size={10}
              style={{ marginHorizontal: 4 }}
            />
            <Icon
              name={'circle'}
              color={colors.lightGrey}
              size={10}
              style={{ marginHorizontal: 4 }}
            />
          </View>

        </View>
      }
    </Modal>
  );
}
