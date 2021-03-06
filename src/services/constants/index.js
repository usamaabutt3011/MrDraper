export const stagingServer = "http://stagingwebsite.mrdraper.com/api/v1/users/"
export const ngrokServer = "http://0733cadf.ngrok.io/api/v1/users/"
const devTesting = false;
export const baseURL = devTesting === false ? ngrokServer : stagingServer
export const endPoints = {
    validateEmail: 'validate_email',
    login: 'validate_password',
    megicLogin: 'request_magic_link',
    resetPassword: 'reset_password',
    getStylistInfo: 'get_stylist_info',
    createSignUp: 'register_user_profile',
    socialLinks: 'submit_social_profile_links',
    selectPackage: 'submit_package_request',
    submitStyleQuiz: 'submit_style_profile_quiz',
    scheduleQuiz: 'schedule_delivery_api',
    getAddresses: 'user_address_list',
    addAddress: 'add_new_address',
    removeAddress: 'delete_address',
    getArea: 'get_areas_by_city_name',
    updateUserSizes: 'update_user_sizes',
    updateSizes: 'update_sizes',
    updateStyles: 'update_styles',
    submitFeedback: 'submit_feedback',
    updatePreferences: 'update_preferences',
    updateProfileInfo: 'update_profile_info',
    changePassword: 'change_password',
    updateProfileImage: 'upload_profile_picture',
    editAddress: 'update_address',
    invitationHistory: 'get_referrals_list',
    invitationSend: 'send_friend_invite',
    walletDetails: 'get_my_wallet_detail',
    claimVoucher: 'claim_voucher',
    packagesList: 'get_packages_list',
    packageDetail: 'get_package_detail',
    pickUpRequest: 'request_pickup_submit_feedback_new',
    initiateGiftCard: 'initiate_gift_card_process',
    updateGiftCard: 'update_gc_details'
}