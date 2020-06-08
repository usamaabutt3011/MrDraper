import React, { Component } from 'react';
import { colors, WP, appSvgs } from '../../services';
import { withNavigation } from 'react-navigation';
import { View, Dimensions, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import PackageIcon from 'react-native-vector-icons/AntDesign';
import { Header, LargeTitle, MediumText } from '../../components';
import { TabView, TabBar, SceneMap, PagerPan } from 'react-native-tab-view';
import MyPackages from '../mainFlow/MyPackages';

export const PackageRequest = createStackNavigator({
  MyPackages: MyPackages
}, {
  headerMode: 'none'
});

class TabStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      controlTab: true,
      dis: 'Discription',
      write: 'Write a Review',
      routes: [],
      index: 0
    }
  }
  label() {
    return 'Discription', 'new'
  }

  componentWillMount = () => {
    alert('Tabs')
    this.props.jumpTo('stylist')
  }
  _renderLabel = ({ route }) => (
    <Text style={{ fontSize: 13, color: 'black' }}>{route.title}</Text>
  );

  render() {
    return (
      <TabView
        navigationState={{
          index: this.state.index,
          routes: [
            { key: 'package', title: 'My Packages', icon: 'user' },
            { key: 'stylist', title: 'My Stylist', icon: 'user' },
            { key: 'referral', title: 'Referrals', icon: 'user' },
            { key: 'blog', title: 'Blogs', icon: 'user' },
          ]
        }}
        renderScene={
          SceneMap({
            package: MyPackages,
            stylist: MyPackages,
            referral: MyPackages,
            blog: MyPackages,
          })
        }
        swipeEnabled={false}
        animationEnabled={false}
        onIndexChange={index => this.setState({ index: index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        // canJumpToTab={true}
        tabBarPosition='bottom'
        renderTabBar={props =>
          <TabBar
            {...props}
            renderIcon={({ route, focused, color }) => (
              <PackageIcon name={route.icon} color='black' size={18} />
            )}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ fontSize: 11, color: 'black' }}>
                {route.title}
              </Text>
            )}
            // renderBadge={({ }) => (
            //   <View style={{ height: WP('5'), width: WP('25'), alignItems: 'center' }}>
            //     <Text style={{ fontSize: 11, color: 'black', right: -7, bottom: -2 }}>0</Text>
            //   </View>
            // )}
            scrollEnabled={true}
            bounces={true}
            useNativeDriver={true}
            pressColor={'red'}
            style={{ height: WP('15'), justifyContent: 'center', width: WP('100'), backgroundColor: colors.white, borderTopWidth: 0.2, borderColor: 'grey', shadowColor: 'grey' }}
            labelStyle={{ color: 'black' }}
            tabStyle={{ width: WP('25'), justifyContent: 'center' }}
            indicatorStyle={{ backgroundColor: colors.black, height: 1 }}
            activeLabelStyle={{ color: 'black' }}
          />

        }
      />
    );
  }
}

export default withNavigation(TabStack)