
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage';
//****************** Auth Reducers **********************//
import emailValidateReducer from './reducers/auth-reducers/email-validate-reducer';
import loginReducer from './reducers/auth-reducers/login-reducer';
import megicLoginReducer from './reducers/auth-reducers/megic-login-reducer';
import resetPasswordReducer from './reducers/auth-reducers/reset-password-reducer';
import getStylistInfo from './reducers/auth-reducers/get-stylist-info-reducer';
import signUpReducer from './reducers/auth-reducers/signup-reducer';
import socialLinkReducer from './reducers/auth-reducers/social-link-reducer';
import selectPackageReducer from './reducers/auth-reducers/select-package-reducer';
//****************** StyleQuiz Reducers ******************//
import styleQuiz from './reducers/quiz-reducers/style-quiz-reducers';
import scheduleQuiz from './reducers/quiz-reducers/schedule-quiz-reducer';
import addressesList from './reducers/quiz-reducers/address-reducers';
//****************** address Reducers ******************//
import areaListReducer from './reducers/quiz-reducers/get-areas-reducer';
import editAddressReducer from './reducers/address-reducers/edit-address-reducer';
import addAddressReducer from './reducers/address-reducers/add-address-reducer';
import removeAddressReducer from './reducers/address-reducers/remove-address-reducer';
//****************** Package Request Reducers ******************//
import packageRequestReducer from './reducers/package-reducers/package-request-reducer';
import updateRequestReducer from './reducers/package-reducers/update-sizes-fits-reducer';
//****************** Update Sizes Reducers ******************//
import updateSizesReducer from './reducers/profile-reducers/my-sizes-reducer';
//****************** Update Styles Reducers ******************//
import updateStylesReducer from './reducers/profile-reducers/my-styles-reducer';
//****************** Update updatePreferencesReducer Reducers ******************//
import updatePreferencesReducer from './reducers/profile-reducers/my-preferences-reducer';
//****************** Submit FeedBack Reducers ******************//
import feedbackReducer from './reducers/feedback-reducers/feedback-reducer';
//****************** Update Profile Reducers ******************//
import updateProfileReducer from './reducers/profile-reducers/update-user-details-reducer';
import updateProfilePicReducer from './reducers/profile-reducers/update-profile-pic-reducer';
//****************** Change Password Reducers ******************//
import changePasswordReducer from './reducers/profile-reducers/change-password-reducer';
//****************** Invitation History Reducers ******************//
import invitationHistoryReducer from './reducers/refferal-reducers/invitation-history-reducer';
//****************** Invitation Send Reducers ******************//
import invitationReducer from './reducers/refferal-reducers/invitation-send-reducer';
//****************** Wallet Reducers ******************//
import walletDetailReducer from './reducers/wallect-reducers/wallet-detail-reducer';
import getVoucherCodeReducer from './reducers/wallect-reducers/get-voucher.code-reducer';
import getMembershipVoucherReducer from './reducers/wallect-reducers/get-membership-code-reducer';
//****************** My Packages Request Reducers ******************//
import myPackagesReducer from './reducers/package-reducers/my-packages-reducer';
import packageDetailReducer from './reducers/package-reducers/package-detail-reducer';
//****************** Pick Up Request Reducers ******************//
import pickUpRequestReducer from './reducers/package-reducers/pick-up-request-reducer';
//****************** Gift Card Reducers ******************//
import giftCardReducer from './reducers/gift-card-reducers/gift-card-reducers';
import getBarCodeReducer from './reducers/gift-card-reducers/get-barcode-reducer';
//****************** App Settings Reducers ******************//
import settingReducer from './reducers/setting-reducer/setting-reducer';
//****************** Add Payment Cards in Billing ******************//
import billingReducer from './reducers/billing-reducers/billing-reducers';
import billingDetailReducer from './reducers/billing-reducers/billing-detail-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    styleQuiz: styleQuiz,
    signup: signUpReducer,
    giftCard: giftCardReducer,
    getBarCode: getBarCodeReducer,
    scheduleQuiz: scheduleQuiz,
    stylistInfo: getStylistInfo,
    addressesList: addressesList,
    megicLogin: megicLoginReducer,
    settingReducer: settingReducer,
    socialLinks: socialLinkReducer,
    areaListReducer: areaListReducer,
    feedbackReducer: feedbackReducer,
    billingDetail: billingDetailReducer,
    resetPassword: resetPasswordReducer,
    emailValidate: emailValidateReducer,
    selectPackage: selectPackageReducer,
    invitationReducer: invitationReducer,
    addAddressReducer: addAddressReducer,
    myPackagesReducer: myPackagesReducer,
    editAddressReducer: editAddressReducer,
    updateSizesReducer: updateSizesReducer,
    walletDetailReducer: walletDetailReducer,
    updateStylesReducer: updateStylesReducer,
    pickUpRequestReducer: pickUpRequestReducer,
    packageDetailReducer: packageDetailReducer,
    updateProfileReducer: updateProfileReducer,
    updateRequestReducer: updateRequestReducer,
    removeAddressReducer: removeAddressReducer,
    getVoucherCodeReducer: getVoucherCodeReducer,
    getMembershipVoucherReducer: getMembershipVoucherReducer,
    changePasswordReducer: changePasswordReducer,
    packageRequestReducer: packageRequestReducer,
    updateProfilePicReducer: updateProfilePicReducer,
    invitationHistoryReducer: invitationHistoryReducer,
    updatePreferencesReducer: updatePreferencesReducer,
    billing: billingReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [
        // 'login',
        // 'signup',
        'billing',
        'styleQuiz',
        'megicLogin',
        'getBarCode',
        'stylistInfo',
        'socialLinks',
        'scheduleQuiz',
        'resetPassword',
        'selectPackage',
        'emailValidate',
        'addressesList',
        'billingDetail',
        // 'settingReducer',
        'feedbackReducer',
        'areaListReducer',
        'invitationReducer',
        'myPackagesReducer',
        'addAddressReducer',
        'editAddressReducer',
        'updateSizesReducer',
        'walletDetailReducer',
        'updateStylesReducer',
        'updateProfileReducer',
        'packageDetailReducer',
        'pickUpRequestReducer',
        'updateRequestReducer',
        'removeAddressReducer',
        'getVoucherCodeReducer',
        'changePasswordReducer',
        'packageRequestReducer',
        'updateProfilePicReducer',
        'invitationHistoryReducer',
        'updatePreferencesReducer',
    ]
}

const middleware = applyMiddleware(thunk);


let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const STORE = createStore(persistedReducer, composeEnhancers(middleware));
export const PERSISTOR = persistStore(STORE);
