import { LangConfig } from './en'

function slotLang(str: string) {
  return function (slots: any[]): string {
    let res = str
    slots.forEach(slot => {
      res = res.replace(/\{(\w+)\}/i, slot)
    })
    return res
  }
}

const langCN: LangConfig = {
  Nav_Wallet_Connect: '登录',
  Nav_Wallet_Disconnect: '登出',

  Wallet_Title_MetaMask: 'Meta Mask',
  Wallet_Intro_MetaMask: '连接你的 MetaMask 钱包',

  Wallet_Title_WalletConnect: 'WalletConnect',
  Wallet_Intro_WalletConnect: '连接你的 WalletConnect 钱包',

  UserAction_MyProfile: '查看主页',
  UserAction_Disconnect: '登出',

  Regist_Title: '设定一个独一无二的 Social layer 域名身份吧！',
  Domain_Rule: '只能包含字母数字连字符，并且连字符不能在开头和结尾，不能有空格，6个字符以上。',
  Regist_Input_Placeholder: '你的域名',
  Regist_Input_Validate: slotLang('不能超过 {n} 个字符'),
  Regist_Input_Validate_2: slotLang('不能少于 {n} 个字符'),
  Regist_Input_Validate_3: '域名包含非法字符',
  Regist_Input_Validate_4: slotLang('域名包含非法字符: {n}'),
  Regist_Input_Empty: '此项不能为空',
  Regist_Input_Error_Start: '不能以"-"开始',
  Regist_Input_Error_End: '不能以"-"结尾',
  Regist_Confirm: '确定',
  Regist_Dialog_Title: '确定创建该域名？',
  Regist_Dialog_ModifyIt: '修改一下',
  Regist_Dialog_Create: '使用',
  Regist_InUse: '该域名已被使用',

  Profile_User_NotExist: '该用户不存在',
  Profile_User_MindBadge: '铸造徽章',
  Profile_User_IssueBadge: '颁发徽章',
  Profile_User_Qrcode_download: '保存到相册',
  Profile_Tab_Received: '已收到',
  Profile_Tab_Minted: '已铸造',
  Profile_Tab_Groups: '组织',
  Profile_Tab_Presend: '预发送',
  Profile_Show_Wallet: '你的钱包地址',
  Profile_Show_Email: '你的邮箱',
  Profile_Show_Close: '关闭',
  Profile_Show_Copy: '复制',

  Avatar_Upload_Button: '更改头像',

  BadgeDialog_Btn_Login: '登录以接收',
  BadgeDialog_Btn_Reject: '拒绝',
  BadgeDialog_Btn_Accept: '接收',
  BadgeDialog_Btn_Issue: '再次颁发',
  BadgeDialog_Btn_None_Left: '领取完毕',

  BadgeDialog_Label_Creator: '铸造者',
  BadgeDialog_Label_Token: 'Token 域名',
  BadgeDialog_Label_Issuees: '接收者',
  BadgeDialog_Label_action_hide: '设为隐藏',
  BadgeDialog_Label_action_public: '设为公开',
  BadgeDialog_Label_action_top: '设为置顶',
  BadgeDialog_Label_action_untop: '取消置顶',
  BadgeDialog_Label_hide_tip: '仅本人可见',

  MintBadge_Title: '铸造徽章',
  MintBadge_Upload: '上传图片',
  MintBadge_UploadTip: slotLang('支持JPG, PNG, GIF， 大小不超过 {size}'),
  MintBadge_Name_Label: '徽章名称',
  MintBadge_Name_Placeholder: '徽章名称',
  MintBadge_Domain_Label: '徽章域名',
  MintBadge_Domain_Placeholder: '徽章域名',
  MintBadge_Submit: '铸造',
  MintBadge_Submiting: '铸造中',
  MintBadge_Domain_Rule: '这个域名是徽章的唯一标识符。<br />只能包含字母数字连字符，并且连字符不能在开头和结尾，不能有空格，4个字符以上。',

  MintFinish_Title: '铸造完成！',
  MintFinish_Button_Later: '暂不颁发',
  MintFinish_Button_Issue: '直接颁发',

  IssueBadge_Title: '颁发徽章',
  IssueBadge_Domain: '徽章域名',
  IssueBadge_Reason: '颁发原因',
  IssueBadge_ReasonPlaceholder: '颁发徽章的原因',
  IssueBadge_Issuees: '接收者',
  IssueBadge_Support: '支持： <br />1.钱包地址; <br/>2. \'.dot/.eth\'结尾的域名; <br /> 3.Social Layer 的用户名和用户域名',
  IssueBadge_IssueesPlaceholder: '请输入对方钱包地址、域名、用户名',
  IssueBadge_GoToIssue: '直接颁发',
  IssueBadge_Issuesing: '颁发中',
  IssueBadge_Sendwithlink: '通过链接发送',
  IssueBadge_Sendwithdomain: '通过域名发送',
  IssueBadge_linkbtn: '链接',
  IssueBadge_Eventbtn: '事件',
  IssueBadge_Address_List_Title: '选择接收者',
  IssueBadge_Input_Error: '无效的域名，地址或者用户名',
  IssueBadge_Input_Des: '输入域名/钱包/电子邮件地址，颁发人可以接收徽章。',

  IssueFinish_Title: '颁发成功',
  PresendFinish_Title: '预发送成功',
  IssueFinish_IssuedToOne: slotLang('徽章已经颁发给 <br/> <b>{1}</b> !'),
  IssueFinish_IssuedToMany: slotLang('徽章已经颁发给 <br/> <b>{1}</b> <br/>和其他 <b>{2}</b> 位接收者!'),
  IssueFinish_GoAndInform: '去通知 TA',
  IssueFinish_CopyLink: '复制链接',
  IssueFinish_BackToProfile: '回到主页',
  IssueFinish_success: '你成功颁发了徽章 ！',
  IssueFinish_share: '#1 给你颁发了一枚 NFT 徽章：#2，快去领取吧！\n #3 \n 推荐使用MetaMask或者imToken的浏览器打开。',

  Search_Cancel: '取消',
  Search_Label_Domain: slotLang('Domain for "{keyword}":'),
  Search_Label_Badge: slotLang('Badges for "{keyword}":'),

  Home_SubTitle: 'The social honor of your life your life',
  Home_Content: 'Each POAP is a gift from an issuer to collectors, in celebration of a special shared memory.<br>By minting these memories to the blockchain, collectors build a rich tapestry of tokenized experiences which unlock a world of possibilities.',
  Home_SearchPlaceholder: 'Search for Wallet/Domain',
  Home_ButtonLabel: 'Explore my collection',
  Home_ButtonTip: 'Connect Wallet',

  Copied: '已复制',

  Landing_Title: '欢迎来到<span>Social Layer 🎉</span>',
  Landing_Sub_Tittle_1: 'Social Layer 是什么？',
  Landing_Sub_Tittle_2: '你可以做什么？',
  Landing_Sub_Tittle_3: '如何颁发徽章？',
  Landing_Des_1: '一个任何人可以给任何人发徽章的dApp，基于主观的、不可量化的价值，构建一个人的数字身份。徽章发放不受第三方的审核和批准，多元价值社区中会自然涌现出最具价值的徽章。',
  Landing_Des_2: '通过颁发徽章，表达对他人的感受，发现更多与你志趣相投的人。',
  Landing_Des_3: '点击“马上体验”，创建自己的链上身份，进入profile页即可颁发徽章。作为首批用户，Social Layer将为你支付铸造徽章所产生的gas费。',
  Landing_Des_4: '更多信息请进入：',
  Landing_White_Paper: 'Social Layer 白皮书',
  Landing_Button: '马上体验',
  Landing_Badge_Receive: '登录并领取',

  WhatsApp_Share: slotLang('{domain} 给你颁发了一枚 NFT 徽章：{badge}. 快去领取吧！{url}'),

  Login_Title: '使用邮箱登录',
  Login_alert: '徽章的接收/颁发不会被铸造',
  Login_continue: '下一步',
  Login_Placeholder: '您的邮箱',
  Login_option: '其他方式',
  Login_input_Code_title: '邮箱验证码',
  Login_input_Code_des: slotLang('输入你的邮箱 {email} 接收到的验证码完成登录操作'),

  Page_Back: '返回',

  Picture_Recommend_Title: '示例',
  Picture_Recommend_Create_By_Canva: '通过 Canva 创建',
  Picture_Recommend_Download_A_Template: '下载示例',

  ThanksgivingCard_1: '送你一枚限量感恩节徽章',
  ThanksgivingCard_2: '领取徽章',
  ThanksgivingCard_screenshot: '请截图保存',

  Quantity_input_label: '数量',
  Quantity_Unlimited: '无限制',

  Presend_step: '输入徽章数量，徽章将作为链接发送。',

  presend_share_link: '#1 给你发送了NFT徽章：#2。 赶紧去获取吧！\n #3 \n 推荐使用MetaMask或者imToken的浏览器打开。',

  Activity_Page_type: '活动',
  Activity_State_Registered: '已报名',
  Activity_Online_Event: '线上活动',
  Activity_Max_Participations: '最多 #1 人',
  Activity_State_Created: '我发起的',
  Activity_login_title: '没有已参加的活动',
  Activity_login_des: '通过登录参加活动',
  Activity_login_btn: '登录 / 注册',
  Activity_search_placeholder: '搜索活动…',
  Activity_no_activity: '当前没有活动～',
  Activity_latest: '最新活动',
  Activity_Greeting_Morning: '早上好',
  Activity_Greeting_Afternoon: '下午好',
  Activity_Greeting_Evening: '晚上好',
  Activity_My_Register: '我的报名',
  Activity_All_Activity: '全部活动',
  Activity_Btn_Create: '发布活动',
  Activity_Btn_Modify: '修改活动',
  Activity_Create_title: '发布活动',
  Activity_Setting_title: '修改活动',
  Activity_Create_Done: '完成',
  Activity_Create_Success: '创建成功 🎉',
  Activity_Create_Success_Scan_tips: '扫描二维码 <br> 参加活动',
  Activity_Create_Success_Scan_tips_2: '| 活动',
  Activity_Scan_checkin: '扫描二维码签到',
  Activity_Registered_participants: '已签到参加者',
  Activity_originators: '发起人',
  Activity_Des: '活动描述',
  Activity_Participants: '参与人',
  Activity_Cancel_registration: '取消参与',
  Activity_Form_Cover: '封面/海报',
  Activity_Form_Name: '活动名',
  Activity_Form_Details: '内容',
  Activity_Form_Starttime: '活动时间',
  Activity_Form_Where: '活动地点',
  Activity_Form_participants: '活动参与人数',
  Activity_Form_Duration: '设置活动持续时间',
  Activity_Form_Hoster: '举办人',
  Activity_Form_Label: '标签',
  Activity_Detail_Btn_Modify: '修改',
  Activity_Detail_Btn_Cancel: '取消活动',
  Activity_Detail_Btn_Checkin: '签到',
  Activity_Detail_Btn_Attend: '参加',
  Activity_Detail_Btn_End: '活动已结束',
  Activity_Detail_Btn_Joined: '已参加',
  Activity_Detail_Btn_AttendOnline: '线上参与',
  Activity_quantity_Input: '自定义',

  New_Year_1: '将你的新年祝福铸造成数字徽章',
  New_Year_2: '颁发理由 :',
  New_Year_3: '送你一枚徽章 扫码领取',
  Save_Card: '保存到相册',

  Group_invite_title: '邀请新成员',
  Group_invite_badge_name: slotLang('{groupName} 的成员'),
  Group_invite_message: '邀请信息',
  Group_invite_receiver: '接收人',
  Group_invite_Nondesignated: '非指定接收人',
  Group_invite_Designated: '指定接收人',
  Group_invite_default_reason: slotLang('邀请你成为 {n} 的组织成员'),
  Group_invite_detail_benefits: '权益',
  Group_invite_detail_benefits_des: slotLang('你就自动成为 {n} 的一员。'),
  Group_invite_share: '#1 给你颁发了 NFT 徽章：#2。赶快领取把！\n #3 \n 推荐使用MetaMask或者imToken的浏览器打开。',

  Group_regist_confirm: '创建组织',
  Group_regist_owner: '组织拥有者',
  Group_regist_des: '徽章以组织的名义颁发给成员',

  Group_dissolve_des: '确定解散组织：',

  Group_setting_title: '设置',
  Group_setting_dissolve: '解散组织',

  Group_relation_ship_member: '成员',
  Group_relation_ship_owner: '拥有者',

  Follow_detail_followed: '关注',
  Follow_detail_following: '被关注',
  Follow_detail_groups: '组织',
  Follow_detail_btn_mint: '为组织颁发徽章',

  Group_detail_tabs_member: '成员',
  Group_detail_tabs_Event: '活动',
  Group_detail_tabs_Invite: '邀请',

  Relation_Ship_Action_Follow: '关注',
  Relation_Ship_Action_Followed: '已关注',
  Relation_Ship_Action_Following: '被关注',
  Relation_Ship_Action_Join: '加入',
  Relation_Ship_Action_Joined: '已加入',
  Relation_Ship_Action_Leave: '离开组织',
  Relation_Ship_Action_Unfollow: '取消关注',

  Empty_Text: '没有数据~',
  Empty_No_Badge: '没有徽章~',
  Empty_No_Present: '没有预发送~',
  Empty_No_Group: '没有组织~'
}

export default langCN
