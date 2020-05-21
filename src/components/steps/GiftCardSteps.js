import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { WP, colors } from '../../services'
import TickIcon from 'react-native-vector-icons/AntDesign';

export const GiftCardSteps = props => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.subContainter}>
        <View style={styles.styleContainer}>
          <View style={styles.stepContainer}>
            <View style={[styles.stylesTextContainer, props.stepOneColored ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }]}>
              {
                props.stepOneChecked ?
                  <TickIcon name='check' color={colors.white} size={16} />
                  :
                  <Text style={[styles.stepCount, props.stepOneColored ? { color: '#fff' } : { color: '#000' }]}>1</Text>
              }
            </View>
            <Text style={[styles.stepLabel, { color: props.stepOneColored ? '#000' : colors.mediumGrey }]}>{props.stepOneText}</Text>
          </View>
        </View>
        <View style={styles.styleContainer}>
          <View style={styles.stepContainer}>
            <View style={[styles.perferenceTextContainer, props.stepTwoColored ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }]}>
              {
                props.stepTwoChecked ?
                  <TickIcon name='check' color={colors.white} size={16} />
                  :
                  <Text style={[styles.stepCount, props.stepTwoColored ? { color: '#fff' } : { color: '#000' }]}>2</Text>
              }
            </View>
            <Text style={[styles.stepLabel, { color: props.stepTwoColored ? '#000' : colors.mediumGrey }]}>{props.stepTwoText}</Text>
          </View>
        </View>
        <View style={styles.styleContainer}>
          <View style={styles.stepContainer}>
            <View style={[styles.stylistTextContainer, props.stepThreeColored ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }]}>
              {
                props.stepThreeChecked ?
                  <TickIcon name='check' color={colors.white} size={16} />
                  :
                  <Text style={[styles.stepCount, props.stepThreeColored ? { color: '#fff' } : { color: '#000' }]}>3</Text>
              }
            </View>
            <Text style={[styles.stepLabel, { color: props.stepThreeColored ? '#000' : colors.mediumGrey }]}>{props.stepThreeText}</Text>
          </View>
        </View>
        <View style={styles.styleContainer}>
          <View style={styles.stepContainer}>
            <View style={[styles.stylistTextContainer, props.stepFourColored ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }]}>
              {
                props.stepFourChecked ?
                  <TickIcon name='check' color={colors.white} size={16} />
                  :
                  <Text style={[styles.stepCount, props.stepFourColored ? { color: '#fff' } : { color: '#000' }]}>4</Text>
              }
            </View>
            <Text style={[styles.stepLabel, { color: props.stepFourColored ? '#000' : colors.mediumGrey }]}>{props.stepFourText}</Text>
          </View>
        </View>
        <View style={styles.backgroundLine}></View>
        <View style={{ position: 'absolute', height: 4, flex: 1, backgroundColor: colors.black, zIndex: 0, left: WP('10'), width: props.progress, top: 15 }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: WP('15'),
    width: WP('100'),
    alignSelf: 'center',
    marginTop: WP('5'),
    marginBottom: WP('4'),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.lightGrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1
      },
    }),
  },
  subContainter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 4,
  },
  styleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5,
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stylesTextContainer: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    marginBottom: 8,
    borderRadius: 4,
    position: 'relative',
    left: 0,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepCount: {
    color: '#8e8e8a',
    fontSize: 16,
    fontWeight: '500'
  },
  stepLabel: {
    fontSize: WP('3.7'),
  },
  perferenceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5
  },
  perferenceTextContainer: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    marginBottom: 8,
    borderRadius: 4,
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stylistContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 5
  },
  stylistTextContainer: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    marginBottom: 8,
    borderRadius: 4,
    position: 'relative',
    right: -2,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundLine: {
    position: 'absolute',
    height: 4,
    // flex: 1,
    width: WP('80'),
    backgroundColor: colors.white,
    left: WP('10'),
    right: 0,
    top: 15,
    alignSelf: 'center',
    zIndex: 0
  }

})

