import { createStackNavigator } from 'react-navigation-stack'

import Shops from './shops';
import Style from './StyleScreens/StyleScreen';
import EditDetail from './EditDetail/EditDetail';
import ByOccasion from './OccasionScreens/occasion';
import SelectItem from './SelectedItems/SelectItem';
import SurpriseMe from './SurpriseScreen/surpriseMe';
import FavoritItem from './FavoritItems/FavroiteItem';
import DetailCorrection from './DetailsCorrection/Details';
import Confirmation from './ConfirmationScreen/Confirmation';
import OccasionDetail from './OccasionScreens/occasionDetails';
import SchedulePackage from './SchedulingScreen/SchedulePackage';
import DeliveryAddress from './DeliveryAddressScreen/DeliveryAddress';
import ConfirmationMessage from './ConfirmationScreen/ConfirmationMessage';
import PaymentDetail from './PaymentDetail';
import DeliveryDetailsConfirmation from './ConfirmationScreen/ConfirmDeliveryDetails';

export const PackageRequestStack = createStackNavigator({
    Style: Style,
    Shops: Shops,
    EditDetail: EditDetail,
    SelectItem: SelectItem,
    SurpriseMe: SurpriseMe,
    ByOccasion: ByOccasion,
    FavoritItem: FavoritItem,
    Confirmation: Confirmation,
    PaymentDetail: PaymentDetail,
    OccasionDetail: OccasionDetail,
    DeliveryAddress: DeliveryAddress,
    SchedulePackage: SchedulePackage,
    DetailCorrection: DetailCorrection,
    ConfirmationMessage: ConfirmationMessage,
    DeliveryDetails: DeliveryDetailsConfirmation
},{
    headerMode: 'none',
    initialRouteName: 'Shops'
});

export default PackageRequestStack;
