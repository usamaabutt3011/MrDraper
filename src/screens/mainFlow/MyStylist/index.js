import React, { Component } from 'react';
import { View, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { Header, Button, StylistCard, MediumTitle, SmallText, Loader } from '../../../components';
import { WP, colors, appImages, data, family } from '../../../services';
import { getStylistInfo } from '../../../store/actions';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

class MyStylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profile_image: '',
            posts: [{}, {}, {}, {}],
            isModel: false,
            scheduleURL: "https://calendly.com/katedee/call?name=Ulugbek%20Makhmudov&email=ulugbek_u@hotmail.com",
            appointmentURL: "https://calendly.com/mrdraper-stylist/styling-session?name=Ulugbek%20Makhmudov&email=ulugbek_u@hotmail.com&a1=+971525551511&a6=180cm%2088kg&a7=6&a8=0&a9=44%20EUR%27",
            webviewURL: ""
        }
    }
    componentWillMount = async () => {
        const { getStylistDetail, userInfo } = this.props;
        console.log('[MyStylist.js] userInfo====:', userInfo);
        try {
            let param = {
                "return_info": "stylist"
            }
            await getStylistDetail(param)
        } catch (error) {
            //error
        }
        // this.phone.getAllCountries()
    }
    componentWillReceiveProps (props) {
        const { stylist } = props;
        console.log('[stylist.js]==============:',stylist);
    }
    makeCall(phoneNum) {
        Linking.canOpenURL(`tel:${phoneNum}`)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + `tel:${phoneNum}`);
                } else {
                    return Linking.openURL(`tel:${phoneNum}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }
    makeEmail(emailAdd) {
        Linking.canOpenURL(`mailto: ${emailAdd}`)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + `mailto: ${emailAdd}`);
                } else {
                    return Linking.openURL(`mailto: ${emailAdd}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }
    makeWhatsppMsg(phoneNum) {
        let url = 'whatsapp://send?text=' + `&phone=${phoneNum.substring(1)}`;
        Linking.openURL(url).then((data) => {
            console.log('WhatsApp Opened');
        }).catch(() => {
            alert('Make sure Whatsapp installed on your device');
        });
    }
    toggleModle = async () => {
        this.setState({
            isModel: !this.state.isModel
        })
    }
    openModal(type) {
        const { scheduleURL, appointmentURL } = this.state;
        if (type === 'schedule') {
            this.setState({ webviewURL: scheduleURL, isModel: true })

        } else {
            this.setState({ webviewURL: appointmentURL, isModel: true })
        }
    }
    render() {
        const { stylist, userInfo } = this.props;
        const { posts } = this.state;
        return (
            <View
                style={{ flexGrow: 1 }}
            >
                <Header
                    // drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />

                <View style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <MediumTitle
                            text={'My Stylist'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={styles.subContainerPersonal}>
                            <SmallText
                                text={`Hi ${userInfo.userProfile.result.name},`}
                                style={{ fontFamily: family.boldText, fontSize: WP('4.5'), marginTop: WP('10') }}
                            />
                            <SmallText
                                text={`I’m ${stylist.isSuccess ? stylist.stylistInfo.result.stylist_name : 'Paola'}, your personal stylist. I’m very excited to help you find clothes you love so you feel confident every day, for every occasion.`}
                                style={{ marginHorizontal: WP('7'), marginVertical: WP('2'), textAlign: 'center', fontSize: WP('4') }}
                            />
                            {
                                stylist.loading ?
                                    <Loader
                                        style={{ marginVertical: WP('10') }}
                                    />
                                    :
                                    <Avatar
                                        rounded
                                        size="large"
                                        containerStyle={{ marginVertical: WP('5') }}
                                        source={stylist.isSuccess ? { uri: stylist.stylistInfo.result.stylist_pic } : appImages.loginBackground}
                                        // onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                    />
                            }
                            <SmallText
                                text={`${stylist.isSuccess ? stylist.stylistInfo.result.stylist_name : 'Paola'}`}
                                style={{ fontFamily: family.boldText, fontSize: WP('4') }}
                            />
                            <View style={{ flexDirection: 'row', marginVertical: WP('5') }}>
                                <Avatar
                                    rounded
                                    overlayContainerStyle={{ backgroundColor: colors.black }}
                                    icon={{ name: 'logo-whatsapp', type: 'ionicon', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                    onPress={() => this.makeWhatsppMsg(stylist.stylistInfo ? stylist.stylistInfo.result.stylist_phone : userInfo.userProfile.result.stylist_phone)}
                                    // onPress={() => this.sendOnWhatsApp()}
                                />
                                <Avatar
                                    rounded
                                    overlayContainerStyle={{ backgroundColor: colors.black }}
                                    containerStyle={{ marginHorizontal: WP('8') }}
                                    icon={{ name: 'envelope', type: 'font-awesome', color: '#fff', underlayColor: 'red', size: WP('4') }}
                                    onPress={() => this.makeEmail(stylist.stylistInfo ? stylist.stylistInfo.result.stylist_email : 'email@gmail.com')}
                                />
                                <Avatar
                                    rounded
                                    overlayContainerStyle={{ backgroundColor: colors.black }}
                                    icon={{ name: 'phone', type: 'font-awesome', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                    onPress={() => this.makeCall(stylist.stylistInfo ? stylist.stylistInfo.result.stylist_phone : userInfo.userProfile.result.stylist_phone)}
                                />
                            </View>
                        </View>
                        <Button
                            title={'SCHEDULE A CALL'}
                            onPress={() => { }}
                            style={{ backgroundColor: colors.black, alignSelf: 'center', width: WP('90'), marginVertical: WP('5') }}
                            onPress={() => this.openModal('schedule')}
                        />
                        <Button
                            title={'MAKE AN APPOINTMENT'}
                            onPress={() => { }}
                            style={{ backgroundColor: colors.black, alignSelf: 'center', width: WP('90'), marginBottom: WP('10') }}
                            onPress={() => this.openModal('appointment')}
                        />
                        {/* <MediumTitle
                            text={'Posts from Paola'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5'), marginBottom: WP('8') }}
                        />
                        {
                            posts.map((item, key)=> {
                                return(
                                    <StylistCard
                                        key={key}
                                        isFeatured={true}
                                        placeholder={true}
                                        title={`4 Must Have Blazers for Any Occasion`}
                                        style={{ alignSelf: 'center' }}
                                    />
                                )
                            })
                        } */}

                        <Modal
                            animationInTiming={500}
                            animationOutTiming={500}
                            animationIn="slideInLeft"
                            animationOut="slideOutRight"
                            avoidKeyboard={true}
                            transparent={true}
                            isVisible={this.state.isModel}
                            // onBackdropPress={() => this.toggleModle()}
                            style={{ flex: 1, justifyContent: 'flex-start' }}
                        >
                            <View style={{ height: WP('165'), width: '95%', alignSelf: 'center', marginTop: WP('3'), borderRadius: 5, backgroundColor: colors.white, overflow: 'hidden' }}>
                                <WebView
                                    ref={(ref) => { this.webview = ref; }}
                                    source={{ uri: this.state.webviewURL }}
                                    renderLoading={() =>(
                                        <View style={{  flex: 1, alignItems: 'center'}}>
                                            <ActivityIndicator size='small' color= {colors.black} animating={true} />
                                        </View>
                                    )}
                                    style={{ }}
                                    scalesPageToFit={true}
                                    startInLoadingState={true}
                                />
                            </View>
                            <View style={{ height: WP('10'), width: WP('10'),left: -12, backgroundColor: colors.lightGrey, position: 'absolute', borderRadius: WP('20'), justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name={'close'} 
                                        color={colors.white}
                                        size={WP(6)}
                                        style={{ marginHorizontal: 5 }}
                                        onPress={() => this.toggleModle()}
                                    />
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        stylist: state.stylistInfo,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStylist);
