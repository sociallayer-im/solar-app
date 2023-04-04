import HomeSloganSvg from '@/assets/svg/home-title-en.svg'

function slotLang(str: string) {
  return function (slots: any[]): string {
    let res = str
    slots.forEach(slot => {
      res = res.replace(/\{(\w+)\}/i, slot)
    })
    return res
  }
}

const langEN = {
  Nav_Wallet_Connect: 'Sign In',
  Nav_Wallet_Disconnect: 'Sign Out',

  Wallet_Title_MetaMask: 'Meta Mask',
  Wallet_Intro_MetaMask: 'Connect to your MetaMask Wallet Or injected explorer wallet',

  Wallet_Title_WalletConnect: 'WalletConnect',
  Wallet_Intro_WalletConnect: 'Connect to your WalletConnect Wallet',

  UserAction_MyProfile: 'My profile',
  UserAction_Disconnect: 'Sign Out',

  Regist_Title: 'Set a unique Social Layer domain identity',
  Domain_Rule: 'Domains can contain the English-language letters a-z, and the digits 0-9. Hyphens can also be used but it can not be used at the beginning and at the end of a domain name. It should be longer than 6 characters.',
  Regist_Input_Placeholder: 'Your domain',
  Regist_Input_Validate: slotLang('Cannot exceed {n} characters'),
  Regist_Input_Validate_2: slotLang('Cannot less then {n} characters'),
  Regist_Input_Validate_3: 'domain contains invalid characters',
  Regist_Input_Validate_4: slotLang('domain contains invalid character: {n}'),
  Regist_Input_Error_Start: 'domain cannot start with "-"',
  Regist_Input_Error_End: 'domain cannot end with "-"',
  Regist_Input_Empty: 'This item cannot be empty',
  Regist_Confirm: 'Confirm',
  Regist_Dialog_Title: 'Are you sure to create this domain?',
  Regist_Dialog_ModifyIt: 'Modify it',
  Regist_Dialog_Create: 'Create',
  Regist_InUse: 'This domain name is already in use',

  Profile_User_NotExist: 'The user does not exist',
  Profile_User_MindBadge: 'Mint a badge',
  Profile_User_IssueBadge: 'Send a badge',
  Profile_User_Qrcode_download: 'Download',
  Profile_Tab_Received: 'Received',
  Profile_Tab_Minted: 'Minted',
  Profile_Tab_Groups: 'Groups',
  Profile_Tab_Presend: 'Presend',
  Profile_Show_Wallet: 'Your address is',
  Profile_Show_Email: 'Your email is',
  Profile_Show_Close: 'Close',
  Profile_Show_Copy: 'Copy',

  Avatar_Upload_Button: 'Upload',

  BadgeDialog_Btn_Login: 'Login to receive',
  BadgeDialog_Btn_Reject: 'Reject',
  BadgeDialog_Btn_Accept: 'Accept',
  BadgeDialog_Btn_Issue: 'Send again',
  BadgeDialog_Btn_None_Left: 'What a pity',

  BadgeDialog_Label_Creator: 'Creator',
  BadgeDialog_Label_Token: 'Token domain',
  BadgeDialog_Label_Issuees: 'receiver(s)',
  BadgeDialog_Label_action_hide: 'Set as private',
  BadgeDialog_Label_action_public: 'Set as public',
  BadgeDialog_Label_action_top: 'Set to Top',
  BadgeDialog_Label_action_untop: 'UnSet to Top',
  BadgeDialog_Label_hide_tip: 'Only visible to yourself',

  MintBadge_Title: 'Send a badge',
  MintBadge_Upload: 'Badge Image',
  MintBadge_UploadTip: slotLang('Support JPG, GIF, PNG. Max size of {size}'),
  MintBadge_Name_Label: 'Badge Name',
  MintBadge_Name_Placeholder: 'Naming your badge',
  MintBadge_Domain_Label: 'Badge Domain',
  MintBadge_Domain_Placeholder: 'Domain',
  MintBadge_Submit: 'Mint',
  MintBadge_Submiting: 'Minting',
  MintBadge_Domain_Rule: 'The domain is the unique identifier for your badge. <br /> Domains can contain the English-language letters a-z, and the digits 0-9. Hyphens can also be used but it can not be used at the beginning and at the end of a domain name. It should be longer than 4 characters.',

  MintFinish_Title: 'Finish Minting!',
  MintFinish_Button_Later: 'Send later',
  MintFinish_Button_Issue: 'Go to Send',

  IssueBadge_Title: 'Send a badge',
  IssueBadge_Domain: 'Badge Domain',
  IssueBadge_Reason: 'Reason (Optional)',
  IssueBadge_Create_time: 'Created',
  IssueBadge_ReasonPlaceholder: 'Reason for issuing',
  IssueBadge_Issuees: 'receiver(s)',
  IssueBadge_Support: 'Support <br />1.wallet address; <br/>2. domain end with \'.dot/.eth\'; <br /> 3.Social Layer username or user domain',
  IssueBadge_IssueesPlaceholder: 'Enter receiver\'s domain or wallet address',
  IssueBadge_GoToIssue: 'Go to Send',
  IssueBadge_Issuesing: 'Minting',
  IssueBadge_Sendwithlink: 'Non-designated',
  IssueBadge_Face_to_Face: 'Face to face',
  IssueBadge_Sendwithdomain: 'Designated',
  IssueBadge_linkbtn: 'Link',
  IssueBadge_Eventbtn: 'Event',
  IssueBadge_Address_List_Title: 'Select receivers',
  IssueBadge_Input_Error: 'Invalid domain, wallet address or username.',
  IssueBadge_Input_Des: 'Input the domain/wallet/email address of the badge that receiver can receive the badge.',

  IssueFinish_Title: 'Sent Successfully',
  IssueFinish_CopyLink: 'Copy link',
  IssueFinish_Screenshot: 'Please take a screenshot for sharing',
  IssueFinish_Screenshot_Or: 'or',
  IssueFinish_share: '#1 has sent you an NFT badge: #2. Go and get it!\n #3 \n It is recommended to use metamask or imToken browser to access the website.',
  IssueFinish_Share_Card_text_1: 'Give you a special badge',
  IssueFinish_Share_Card_text_2: 'Mint by @Social Layer',

  Search_Cancel: 'Cancel',
  Search_Label_Domain: slotLang('Domain for "{keyword}":'),
  Search_Label_Badge: slotLang('Badges for "{keyword}":'),

  Home_SubTitle: 'The social honor of your life your life',
  Home_Content: 'Each POAP is a gift from an issuer to collectors, in celebration of a special shared memory.<br>By minting these memories to the blockchain, collectors build a rich tapestry of tokenized experiences which unlock a world of possibilities.',
  Home_SearchPlaceholder: 'Search for Wallet/Domain',
  Home_ButtonLabel: 'Explore my collection',
  Home_ButtonTip: 'Connect Wallet',

  Copied: 'Copied',

  Landing_Title: 'Welcome to <span>Social Layer 🎉</span>',
  Landing_Sub_Tittle_1: 'What is Social Layer ?',
  Landing_Sub_Tittle_2: 'What can you do?',
  Landing_Sub_Tittle_3: 'How to send a badge?',
  Landing_Des_1: 'A dApp where anyone can send badges to anyone, building a person\'s digital identity based on subjective, unquantifiable value. Badge issuance is not subject to third-party review or approval, and the most valuable badges will naturally spring up in the multivalued community.',
  Landing_Des_2: 'Express your feelings towards others by awarding badges, and discover more like-minded people through badges.',
  Landing_Des_3: 'Click \'Get Start\' to create your own on-chain identity. Go to the profile page and award badges.  As early users, Social Layer will pay gas fees for you.',
  Landing_Des_4: 'For more information: ',
  Landing_White_Paper: 'Social Layer whitepaper',
  Landing_Button: 'Get Start',
  Landing_Badge_Receive: 'Login to receive',

  WhatsApp_Share: slotLang('{domain} send you an NFT badge: {badge}. Go get it! {url}'),

  Login_Title: 'Login with Email',
  Login_alert: 'Badges sent/received will not be minted',
  Login_continue: 'Continue',
  Login_Placeholder: 'Your Email',
  Login_option: 'Or more option',
  Login_input_Code_title: 'Check your inbox',
  Login_input_Code_des: slotLang('Enter the code we sent to {email} to complete your account set-up.'),

  Page_Back: 'Back',

  Picture_Recommend_Title: 'Example',
  Picture_Recommend_Create_By_Canva: 'Create by Canva',
  Picture_Recommend_Download_A_Template: 'Download a template',

  Quantity_input_label: 'Quantity',
  Quantity_Unlimited: 'Unlimited',

  Presend_step: 'Fill in the quantity of badges. <br /> The badges will be sent to the receivers as a link.',

  presend_share_link: '#1 has sent you an NFT badge: #2. Go and get it! \n #3 \n It is recommended to use metamask or imToken browser to access the website.',

  Activity_Page_type: 'Activity',
  Activity_State_Registered: 'Registered',
  Activity_State_Created: 'Created',
  Activity_Online_Event: 'Online Event',
  Activity_Max_Participations: 'Up to #1 participations',
  Activity_login_title: 'No Registered Events Yet!',
  Activity_login_des: 'Log in to participate in a fun event',
  Activity_login_btn: 'Log in / Sign in',
  Activity_search_placeholder: 'Search events…',
  Activity_no_activity: 'No activity yet～',
  Activity_latest: 'Latest Event',
  Activity_Greeting_Morning: 'Good Morning',
  Activity_Greeting_Afternoon: 'Good Afternoon',
  Activity_Greeting_Evening: 'Good Evening',
  Activity_My_Register: 'My register',
  Activity_All_Activity: 'All Event',
  Activity_Btn_Create: 'Create Event',
  Activity_Btn_Modify: 'Modify Event',
  Activity_Create_title: 'Create a Event',
  Activity_Setting_title: 'Event Setting',
  Activity_Create_Done: 'Done',
  Activity_Create_Success: 'Create Successfully 🎉',
  Activity_Create_Success_Scan_tips: 'Scan the code <br> and attend the event',
  Activity_Create_Success_Scan_tips_2: '| Activity',
  Activity_Scan_checkin: 'Scan QR code to Check in',
  Activity_Registered_participants: 'Registered participants',
  Activity_originators: 'Originators',
  Activity_Des: 'Activity content',
  Activity_Participants: 'Participants',
  Activity_Cancel_registration: 'Cancel Registration',
  Activity_Form_Cover: 'Cover/Poster',
  Activity_Form_Name: 'Event Name',
  Activity_Form_Details: 'Details',
  Activity_Form_Starttime: 'When will it happen?',
  Activity_Form_Where: 'Where is the event taking place?',
  Activity_Form_participants: 'What is the maximum number of participants?',
  Activity_Form_Duration: 'Set Duration',
  Activity_Form_Hoster: 'Hoster',
  Activity_Form_Label: 'Label',
  Activity_Detail_Btn_Modify: 'Modify',
  Activity_Detail_Btn_Cancel: 'Cancel Event',
  Activity_Detail_Btn_Checkin: 'Check-in',
  Activity_Detail_Btn_Attend: 'Attend-in',
  Activity_Detail_Btn_Joined: 'Joined',
  Activity_Detail_Btn_End: 'Event has ended',
  Activity_Detail_Btn_AttendOnline: 'Attend online',
  Activity_quantity_Input: 'custom',

  New_Year_1: 'Cast your New Year wishes into a digital badge.',
  New_Year_2: 'Reason for issuing :',
  New_Year_3: 'Send you a badge, scan <br> the code to get',
  Save_Card: 'Save to album',

  Group_invite_title: 'Invite new members',
  Group_invite_badge_name: slotLang('Member of {groupName}'),
  Group_invite_message: 'Invitation Message',
  Group_invite_receiver: 'Receiver(s)',
  Group_invite_Nondesignated: 'Non-designated',
  Group_invite_Designated: 'Designated',
  Group_invite_default_reason: slotLang('Invite you to become a member of {n}'),
  Group_invite_detail_benefits: 'Benefits',
  Group_invite_detail_benefits_des: slotLang('You will automatically become a member of {n} organization.'),
  Group_invite_share: '#1 has sent you an NFT badge: #2. Go and get it! \n #3 \n It is recommended to use metamask or imToken browser to access the website.',

  Group_regist_confirm: 'Create a group',
  Group_regist_owner: 'Group owner',
  Group_regist_des: 'Badges are send to members\nin the name of the organization',
  Group_regist_title: 'Set a unique Social Layer domain for your group!',

  Group_dissolve_des: 'Are you sure to dissolve group:',

  Group_setting_title: 'Settings',
  Group_setting_dissolve: 'Dissolve the Group',

  Group_relation_ship_member: 'Member',
  Group_relation_ship_owner: 'Owner',

  Follow_detail_followed: 'Follower',
  Follow_detail_following: 'Following',
  Follow_detail_groups: 'Groups',
  Follow_detail_btn_mint: 'Send A badge For Your Group',

  Group_detail_tabs_member: 'Members',
  Group_detail_tabs_Event: 'Events',
  Group_detail_tabs_Invite: 'Invited',

  Relation_Ship_Action_Follow: 'Follow',
  Relation_Ship_Action_Followed: 'Followed',
  Relation_Ship_Action_Following: 'Following',
  Relation_Ship_Action_Join: 'Join',
  Relation_Ship_Action_Joined: 'Joined',
  Relation_Ship_Action_Leave: 'Leave group',
  Relation_Ship_Action_Unfollow: 'Cancel Follow',

  Empty_Text: 'No Data yet~',
  Empty_No_Badge: 'No badge yet~',
  Empty_No_Present: 'No presned yet~',
  Empty_No_Group: 'No group yet~',
  Empty_No_Invite: 'No invite yet~',

  Search_Tab_Domain: 'Domain',
  Search_Tab_Badge: 'Badge',
  Search_Tab_Event: 'Event',

  Badgebook_Dialog_Choose_Badgebook: 'Choose from Badge book',
  Badgebook_Dialog_Choose_Badge: 'Choose from Minted',
  Badgebook_Dialog_Choose_Draft: 'Choose from Draft',
  Badgebook_Dialog_Cetate_Badge: 'Create a new badge',

  Dialog_Public_Image_Title: 'Choose a image for badge',
  Dialog_Public_Image_UploadBtn: 'Upload a image',
  Dialog_Public_Image_UploadBtn_Des: 'JPG or PNG. Max size of 800K',
  Dialog_Public_Image_List_Title: 'Public',

  Cropper_Dialog_Title: 'Edit image',
  Cropper_Dialog_Btn: 'Apply',

  Presend_Qrcode_Badge: 'badge:',
  Presend_Qrcode_Des: slotLang('{1} sent you a badge.\n Scan the QR Code to get it.'),
  Presend_Qrcode_Scan: 'Scan the QR Code',
  Presend_Qrcode_Limit: slotLang('Limited to {1} person'),
  Presend_Qrcode_Time: slotLang('Expiry time : {1}')
}

export type LangConfig = typeof langEN
export default langEN
