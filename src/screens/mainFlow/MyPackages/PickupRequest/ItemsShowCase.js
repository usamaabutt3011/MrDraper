import React, { Component } from 'react';
import { View, ScrollView, Image, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Header, Button, NormalText, SmallText, Loader } from '../../../../components';
import { WP, data, colors, appImages, family } from '../../../../services';
import { styles } from './styles';
import { DifferentSize, Alternative, Return } from './Components';

class ItemsShowCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isKeep: false,
            isDifferent: false,
            isAlter: false,
            isReturn: false,
            counter: 1,
            item: null,
            sizeNote: "",
            alterNote: "",
            returnNote: "",
            productFeedback: [],
        }
    }
    componentWillMount = async () => {
        const { packageDetail } = this.props;
        const { item } = this.state;
        await this.setState({
            item: packageDetail.packageDetailRes.result.products[0]
        })
    }
    _keptToggle = () => {
        this.setState({ isKeep: !this.state.isKeep })
    }
    _differentSizeToggle = () => {
        this.setState({ isDifferent: !this.state.isDifferent })
    }
    _alterToggle = () => {
        this.setState({ isAlter: !this.state.isAlter })
    }
    _returnToggle = () => {
        this.setState({ isReturn: !this.state.isReturn })
    }
    selectItem = async () => {
        const { packageDetail } = this.props;
        const { productFeedback } = this.state;
        const { counter } = this.state;
        if (counter < packageDetail.packageDetailRes.result.products.length) {
            this.setState({ 
                item: packageDetail.packageDetailRes.result.products[counter],
                counter: counter + 1,
             })
        } else {
            this.props.navigation.push('Summary',{ productFeedback })
        }
    }
    keeping = async() => {
        const { counter, productFeedback, item } = this.state;
        productFeedback.push([counter-1,{
            product_id: item.id,
            returning: "no"
        }])
        await this.selectItem()
        // console.log('[ItemsShowCase.js] differentSizes', productFeedback);
    }
    differentSizes = async(label) => {
        const { productFeedback, counter, sizeNote, item } = this.state;
        productFeedback.push([counter-1,{
			product_id: item.id,
            returning: "yes",
            reason: label ? label : 'Other',
            feedback: sizeNote
        }])
        if (label == null && sizeNote == '') {
            Toast.show('Please select an option or write a note.')
        } else {
            await this.selectItem()
            this._differentSizeToggle()     
        }      
        // console.log('[ItemsShowCase.js] differentSizes', productFeedback);
    }
    alterItem = async() => {
        const { productFeedback, counter, alterNote, item } = this.state;
        productFeedback.push([counter-1,{
			product_id: item.id,
            returning: "no",
            reason: 'Need alteration',
            feedback: alterNote
        }])
        if (alterNote == '') {
            Toast.show('Please tell us what you needs alterations.')
        } else {
            await this.selectItem()
            this._alterToggle()   
        }        
        // console.log('[ItemsShowCase.js] alterItem', productFeedback);
    }
    returnItem = async(label) => {
        const { productFeedback, counter, returnNote, item } = this.state;
        productFeedback.push([counter-1,{
			product_id: item.id,
            returning: "yes",
            reason: label ? label : 'Other',
            feedback: returnNote
        }])
        if (label == null && returnNote == '') {
            Toast.show('Please select an option or write a note.')
        } else {
            await this.selectItem()
            this._returnToggle()  
        }      
        // console.log('[ItemsShowCase.js] returnItem', productFeedback);
    }
    render() {
        const { packageDetail } = this.props;
        const { counter, item } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{ height: WP('5') }} />
                    {
                        item ?
                            <View style={styles.subContainer}>
                                <Image
                                    // loadingIndicatorSource={<Loader />}
                                    source={{ uri: `https://mrdraper-inventory.s3.eu-central-1.amazonaws.com${item.image}`}}
                                    style={{ height: WP('90'), width: WP('90'), resizeMode: 'cover' }}
                                />
                                <NormalText
                                    text={`${item.brand} ${item.category}`}
                                    style={{ marginHorizontal: WP('5'), fontFamily: family.boldText, marginBottom: WP('2'), marginTop: WP('3') }}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: WP('5'), marginHorizontal: WP('5') }}>
                                    <SmallText
                                        text={`${item.brand}`}
                                    />
                                    <View style={{ flexDirection: 'row' }}>
                                        <SmallText
                                            text={`AED ${item.retail_price}`}
                                            style={{ marginRight: WP('1'), color: colors.orange, textDecorationLine: 'line-through', fontSize: WP('3.3') }}
                                        />
                                        <SmallText
                                            text={`AED ${item.sale_price}`}
                                        />
                                    </View>
                                </View>
                            </View>
                            :
                            <Loader />
                    }
                    <SmallText
                        text={`Showing ${counter} of ${packageDetail.packageDetailRes.result.products.length} items`}
                        style={{ marginVertical: WP('7'), alignSelf: 'center' }}
                    />
                    <Button
                        title={`I’m keeping this!`}
                        onPress={() => this.keeping()}
                        style={[styles.selectedButton,{ backgroundColor: colors.buttonColor }]}
                    />
                    <Button
                        title={`I need a different size`}
                        onPress={() => this._differentSizeToggle()}
                        style={styles.selectedButton}
                    />
                    <Button
                        title={`I need this altered`}
                        onPress={() => this._alterToggle()}
                        style={styles.selectedButton}
                    />
                    <Button
                        title={`I’ll return this`}
                        onPress={() => this._returnToggle()}
                        style={[styles.selectedButton, { marginBottom: WP('10') }]}
                    />
                    <DifferentSize
                        isDifferent={this.state.isDifferent}
                        _differentSizeToggle={() => this._differentSizeToggle}
                        onPress={(label)=> this.differentSizes(label)}
                        onChangeText={(text)=> this.setState({ sizeNote: text })}
                    />
                    <Alternative
                        isAlter={this.state.isAlter}
                        _alterToggle={() => this._alterToggle}
                        onPress={()=> this.alterItem()}
                        onChangeText={(text)=> this.setState({ alterNote: text })}
                    />
                    <Return
                        isReturn={this.state.isReturn}
                        onPress={(label)=> this.returnItem(label)}
                        _returnToggle={() => this._returnToggle}
                        onChangeText={(text)=> this.setState({ returnNote: text })}
                    />
                </ScrollView>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        packageDetail: state.packageDetailReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        // login: (params) => dispatch(TASKS.login(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsShowCase);
