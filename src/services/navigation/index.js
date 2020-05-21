import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function back() {
    _navigator.dispatch(NavigationActions.back());
}

function openDrawer() {
    _navigator.dispatch(
        DrawerActions.toggleDrawer()
    )
}

// add other navigation functions that you need and export them

export {
    navigate,
    openDrawer,
    back,
    setTopLevelNavigator,
};
