/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "Employees": "员工",
    "Idle Consulting": "咨询放置",
    "Buy +": "购买 +",
    "Savegame": "游戏存档",
    "Tutorials": "教程",
    "Version": "版本",
    "You unlocked:": "你解锁了：",
    "Close": "关闭",
    "Delete": "删除",
    "Money": "金钱",
    "Okay": "好的",
    "Its always good to have more...": "拥有更多总是好的...",
    "Costs": "成本",
    "Is 1 Million enough?": "100万够吗？",
    "Produce": "产出",
    "More experience in something...": "更多的经验...",
    "Profit": "利润",
    "A typical consulting company, management first!": "典型的咨询公司，管理至上！",
    "Costs almost nothing and brings hardly anything...": "几乎没有成本，几乎没有带来任何东西......",
    "Hire more is better, right?": "雇佣越多越好，对吧？",
    "With more training comes nothing more...": "随着更多的培训，没有更多...",
    "You should always hire more!": "你应该经常雇佣更多人！",
    "Multiplier": "乘数",
    "Is this paperclip universal?": "这个回形针是通用的吗？",
    "A better office results in more profit!": "更好的办公室带来更多的利润！",
    "Contracts": "合同",
    "Get 2 Prestige!": "声望 2 次！",
    "Even more experience...": "还有更多的经验……",
    "Attract the upper class to your company.": "吸引上流社会到您的公司。",
    "Score": "分数",
    "Timer": "计时器",
    "Clicks": "点击次数",
    "Do you want to start with a new company?": "你想从一家新公司开始吗？",
    "No not yet!": "还没准备好！",
    "Save created": "存档已创建",
    "Yes, restart the game!": "是的，重新开始游戏！",
    "You earn prestige points and profit bonus!": "您可以获得声望点数和利润奖励！",
    "1st Prestige": "第一次声望",
    "Daily Routine": "日常工作",
    "Secrets": "秘密",
    "Is this loop infinite?": "这个循环是无限的吗？",
    "Prestige Points": "声望点数",
    "Get as much money as you can and if you feel your progress slowing down, get the prestige points and restart the game with a bonus. The money you earn is stored in your savings. Prestige points are usefull in many ways and speed up your game.": "尽可能多地获得金钱，如果您觉得进度变慢，请获得声望点并以奖金重新开始游戏。 您赚到的钱会存储在您的储蓄中。 声望点在很多方面都很有用，可以加快你的游戏速度。",
    "Another company wants clipboards, buy clipboards and finish this contract.": "另一家公司想要剪贴板，购买剪贴板并完成这份合同。",
    "Build the departments of your company with your management points.": "用你的管理点建立你公司的部门。",
    "Build your departments to unlock more stuff.": "建立你的部门来解锁更多的东西。",
    "Click on the icons for more information.": "单击图标了解更多信息。",
    "Discount": "折扣",
    "Everyone needs a solid foundation!": "每个人都需要一个坚实的基础！",
    "Go to the menu to cash in the prestige.": "去菜单兑现声望。",
    "How many clicks do you really need?": "您真正需要多少次点击？",
    "If you buy stuff, you unlock more stuff!": "如果你买东西，你会解锁更多的东西！",
    "If you want to buy multiple things at once, use the buymore button!": "如果您想一次购买多件商品，请使用购买更多按钮！",
    "Prestige and get a new company, this one feels old.": "声望和获得一家新公司，这家感觉老了。",
    "Take a break if you want, you gain money even if you have closed the game!": "如果你想休息一下，即使你关闭了游戏，你也能赚钱！",
    "Upgrade your management to unlock more departments!": "升级您的管理以解锁更多部门！",
    "Upgrade, hire or buy stuff to make money!": "升级、租用或购买东西来赚钱！",
    "Working hard for 20 hours will grant you with money.": "努力工作20个小时会给你钱。",
    "You can restart your game to progress even further!": "您可以重新开始游戏以进一步进步！",
    "You prestiged for the first time.": "你第一次声望。",
    "You're available working time, spend it wise.": "你有空闲的工作时间，明智地度过。",
    "Prestige Clicks": "声望内  点击数",
    "Prestige Run": "声望次数",
    "Prestige Timer": "声望计时器",
    "Calendar": "日历",
    "Fair enough, make an appointment!": "够公平的，约个时间吧！",
    "Welcome Back": "欢迎回来",
    "Your old company needs seniors, hire some with the business department.": "你的老公司需要前辈，在业务部招一些。",
    "To get our monkeywork done, we need more intern. The HR department should hire some!": "为了完成我们的猴子工作，我们需要更多的实习生。人力资源部门应该雇用一些人！",
    "Import savegame...": "导入存档...",
    "Perks": "特权",
    "Better process results in faster recruitment.": "更好的流程导致更快的招聘。",
    "Don't buy if the price is too high!": "如果价格太高，请不要购买！",
    "Even better recruitment process.": "更好的招聘流程。",
    "Gain": "获得",
    "Hint: You need to by a lot.": "提示：你需要很多。",
    "Invest your management in a better future.": "将您的管理投资于更美好的未来。",
    "Investment: -1": "投资：-1",
    "It's touchy...": "很触动...",
    "Its over 9000!!!111!1!1": "它超过 9000!!!111!1!1",
    "Lets save the savings!": "让我们节省储蓄！",
    "Long call, short call, shit call...": "长呼，短呼，狗屎呼……",
    "Long put, short put, shit put...": "长线，短线，狗屎……",
    "More of the same...": "更多相同...",
    "Pineapple Phone?!": "菠萝手机？！",
    "The best recruitment process.": "最好的招聘流程。",
    "The business department will hire a ceo.": "业务部将聘请一位CEO。",
    "The business department will hire a manager.": "业务部将聘请一名经理。",
    "The business department will hire a senior.": "业务部将聘用一名高级人员。",
    "The HR department will hire a consultant.": "人力资源部将聘请一名顾问。",
    "The HR department will hire a junior.": "人力资源部将聘请一名初级人员。",
    "The HR department will hire an intern.": "人力资源部将聘请一名实习生。",
    "The rich get richer and the poor get poorer.": "富人越富，穷人越穷。",
    "Tired of hiring on your own?": "厌倦了自己招聘？",
    "Trade away your goodies.": "把你的好东西换掉。",
    "With a laptop they can search for the correct result!": "使用笔记本电脑，他们可以搜索正确的结果！",
    "Coffee": "咖啡",
    "Credit": "信用",
    "Have 6 of HR, Office and Business.": "有人力资源、办公室和 商业 各6个。",
    "How much is too much?": "多少是太多了？",
    "HTML42 is the new meta-tag": "HTML42 是新的元标记",
    "I use this credit for my other credit.": "我将此信用用于我的其他信用。",
    "It's the number of the devil.": "这是魔鬼的数字。",
    "Lounge": "休息室",
    "Make the office cozy...": "让办公室变得温馨...",
    "Management+": "管理+",
    "Management++": "管理++",
    "Profit Multiplier": "利润乘数",
    "Website": "网站",
    "Wifi+": "无线网络+",
    "You are more productive with better wifi.": "使用更好的 wifi，您的工作效率会更高。",
    "You are one of the best, twice!": "你是最好的之一，两次！",
    "You are one of the best!": "你是最好的之一！",
    "A good company need one good CEO or more, hire some.": "一家好公司需要一位或多位优秀的 CEO，请聘用一些。",
    "Ascend!": "转生！",
    "Break": "休息",
    "Buy enough paperclips, I think we did this in another game?!": "买足够的回形针，我想我们在另一场比赛中这样做了？！",
    "Coupon": "优惠券",
    "Customer": "客户",
    "Do you understand the finance department? Buying a low stock to change the other.": "你了解财务部吗？ 买入低价股来换取另一股。",
    "Feats": "专长",
    "Gift": "礼物",
    "Now you understand finance do you? The stock market is random.": "现在你懂金融了吗？ 股市是随机的。",
    "Our employees demand mobile phones.": "我们的员工需要手机。",
    "Our sister company needs managers, hire some.": "我们的姊妹公司需要经理，请一些。",
    "Project": "项目",
    "Reputation": "声誉",
    "Someone said its a good idea to sell calendar!": "有人说卖日历是个好主意！",
    "Sometimes you need a break to feel refreshed.": "有时你需要休息一下才能感到神清气爽。",
    "To ascend to another level you need to sell your management.": "要提升到另一个级别，您需要出售您的管理人员。",
    "Train every day to learn new skills.": "每天训练以学习新技能。",
    "We need some junior to check the work that our intern did before.": "我们需要一些初级来检查我们的实习生之前所做的工作。",
    "We need to expand our company, the HR department should hire more consultants.": "我们需要扩大我们的公司，人力资源部门应该聘请更多的顾问。",
    "You earned reputation during a event. Good!": "您在活动中赢得了声誉。 好的！",
    "You finished a project in a event. Good job!": "您在活动中完成了一个项目。 好工作！",
    "You got a gift during a event!": "您在活动期间收到了一份礼物！",
    "You got a new customer during a event. Nice done!": "您在活动期间获得了一位新客户。 干得好！",
    "You received a coupon in the shop!": "您在商店收到了优惠券！",
    "Ascension": "转生",
    "Do you want to ascend your company?": "你想转生你的公司吗？",
    "This will restart some of your progress!": "这将重新开始你的一些进度！",
    "Yes, ascend the game!": "是的，转生游戏！",
    "Ascension Clicks": "本次转生点击数",
    "Ascension Timer": "转生计时器",
    "You ascend for the first time.": "你进行了第一次转生。",
    "By completing certain tasks during a event you get a bonus that will stay after the event is closed.": "通过在活动期间完成某些任务，您将获得奖励，该奖励将在活动结束后保留。",
    "Earn acension level to unlock more features.": "获得提升等级以解锁更多功能。",
    "Events": "活动",
    "Events are gamplay features that are only available during a specific period of time.": "活动是仅在特定时间段内可用的游戏功能。",
    "Go to the menu to ascend...": "转到菜单以提升...",
    "The best of the best!": "最好的最好的！",
    "The event timer is showing the hours left until the event is closed.": "活动计时器显示距离活动结束还剩多少小时。",
    "You can restart your game and reset your prestige points to progress even further!": "您可以重新开始游戏并重置您的声望点以进一步进步！",
    "Click Exchange": "点击交换",
    "Event": "活动",
    "Money Exchange": "货币兑换",
    "Shop": "商店",
    "The event timer is showing the time left until the event is over.": "事件计时器显示事件结束前的剩余时间。",
    "Time left": "剩余时间",
    "You will gain 1000 clicks.": "您将获得 1000 次点击。",
    "You will gain 110% of your current money!": "您将获得当前资金的 110%！",
    "Earn experience over time by traning, your experience can be investet in different skills.": "通过培训随着时间的推移获得经验，您的经验可以投资于不同的技能。",
    "Improve your efficiency to gain perks. Remeber perks are resetet after prestige.": "提高您的效率以获得额外津贴。 记住特权会在声望后重置。",
    "Interpretation and making sense of some stupid shit.": "解释和理解一些愚蠢的东西。",
    "Softskills": "软技能",
    "You need to understand those graphs.": "您需要了解这些图表。",
    "You will gain prestige without loosing your progress!": "您将获得声望而不会失去进度！",
    "Be clear, be prepared and dont overrun your time.": "要清楚，做好准备，不要浪费时间。",
    "The best skill you can have.": "你能拥有的最好的技能。",
    "Does everybody need a laptop?": "每个人都需要笔记本电脑吗？",
    "Hey write a book about analytics.": "嘿，写一本关于分析的书。",
    "Tablets are cheap but some.": "平板电脑很便宜，但有些。",
    "There is a conference ahead get better in management.": "前面有一个会议，在管理方面会变得更好。",
    "Understanding and solving problems is the key.": "理解和解决问题是关键。",
    "Write another book about communication.": "再写一本关于沟通的书。",
    "You need to upgrade your finance department.": "你需要升级你的财务部门。",
    "First-level support is the first point of contact for problems.": "一级支持是问题的第一联络点。",
    "Prevent those issues to earn reputation.": "防止这些问题赢得声誉。",
    "Review": "审查",
    "Second-level support is provided by the IT specialists.": "二级支持由 IT 专家提供。",
    "Support": "支持",
    "Third-level support includes hardware and software manufacturers as well as external specialists.": "三级支持包括硬件和软件制造商以及外部专家。",
    "Closed": "关闭",
    "Priority very high, damage to business critical.": "优先级非常高，对业务的损害至关重要。",
    "To solve the other issues you need to prestige.": "要解决其他问题，您需要声望。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "Bought: ": "已购买：",
    "Base Gain: ": "基础增益：",
    "Owned: ": "拥有：",
    "Money: ": "金钱：",
    "Junior: ": "初级人员：",
    "Savings: ": "储蓄：",
    "Management: ": "管理：",
    "Profit: ": "利润：",
    "Hotkey: ": "快捷键：",
    "Clipboard: ": "剪贴板：",
    "CEO: ": "CEO：",
    "Workload: ": "工作量：",
    "Cost Discount: ": "成本折扣：",
    "Intern: ": "实习生：",
    "Consultant: ": "顾问：",
    "Senior: ": "高级人员：",
    "Intern+: ": "实习生+：",
    "Buy Option: ": "购买期权：",
    "Consultant+: ": "顾问+：",
    "Stock #": "股票 #",
    "Produce Multiplier: ": "产出乘数：",
    "Prestige Points: ": "声望点：",
    "Office: ": "办公室：",
    "Finance: ": "金融：",
    "HR: ": "人力资源：",
    "Bank: ": "银行：",
    "Analytics: ": "分析: ",
    "Communication: ": "沟通: ",
    "Laptop: ": "笔记本电脑：",
    "Phone: ": "电话：",
    "Tablet: ": "平板电脑：",
    "Paperclip: ": "回形针：",
    "Calendar: ": "日历：",
    "Working: ": "工作：",
    "Experience: ": "经验：",
    "Business: ": "业务：",
    "Substantial: ": "重要: ",
    "Moderate: ": "一般: ",
    "Severe: ": "严重: ",
    "Coupon: ": "优惠券：",
    "Customer: ": "客户：",
    "Project: ": "项目：",
    "Reputation: ": "声誉：",
    "Manager: ": "经理：",
    "Junior+: ": "初级人员+：",
    "Senior+: ": "高级人员+：",
    "Issue S": "问题 S",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Junior": " 初级人员",
    "Intern": " 实习生",
    "Consultant": "顾问",
    "Management": "管理",
    "Clipboard": "剪贴板",
    "Office": "办公室",
    "Paperclip": "回形针",
    "Business": "业务",
    "Senior": "高级人员",
    "Contract": "合同",
    "Break?": "休息？",
    "Buy +1": "购买 +1",
    "Departments": "部门",
    "Prestige": "声望",
    "Help? Click here!": "帮助？ 点击这里！",
    "Workload": "工作量",
    "Working": "工作",
    "Calendar": "日历",
    "Bank": "银行",
    "Buy Option": "购买期权",
    "CEO": "CEO",
    "CEO+": "CEO+",
    "Consultant+": "顾问+",
    "Consulting^": "咨询^",
    "Finance": "金融",
    "HR": "人力资源",
    "Intern^": "实习生^",
    "Intern+": "实习生+",
    "Investment": "投资",
    "Junior^": "初级人员^",
    "Junior+": "初级人员+",
    "Laptop": "笔记本电脑",
    "Manager": "经理",
    "Manager+": "经理+",
    "Phone": "电话",
    "Senior+": "高级人员+",
    "Tablet": "平板电脑",
    "Trade": "贸易",
    "5k Clicks": "5k 点击",
    "Coffee": "咖啡",
    "Credit": "信用",
    "Lounge": "休息室",
    "Management+": "管理+",
    "Management++": "管理++",
    "Website": "网站",
    "Wifi+": "无线网络+",
    "Break": "休息",
    "Coupon": "优惠券",
    "Customer": "客户",
    "Gift": "礼物",
    "Project": "项目",
    "Reputation": "声誉",
    "Ascension Level": "转生等级",
    "Events": "活动",
    "Ascension": "转生",
    "Click Exchange": "点击兑换",
    "Money Exchange": "货币兑换",
    "Time left": "剩余时间",
    "Analytics": "分析",
    "Communication": "沟通",
    "Exp Exchange": "经验交流",
    "Experience": "经验",
    "Improvements": "改进",
    "Prestige Exchange": "声望交换",
    "Experienced": "经验丰富",
    "Fast Learning": "快速学习",
    "Presentation": "演示",
    "Problem Solving": "解决问题",
    "1st Level": "一级",
    "2nd Level": "二级",
    "3rd Level": "三级",
    "Severe": "严重",
    "Issue S1": "问题 S1",
    "Issue S2": "问题 S2",
    "Issue S3": "问题 S3",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Prevention": "预防",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^\#(.+)$/,
    /^雇佣(.+)$/,
    /^购买(.+)$/,
    /^成本(.+)$/,
    /^(.+)电脑$/,
    /^(.+)实习生$/,
    /^(.+)声望$/,
    /^(.+)合同$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\% \| 学习 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 存储 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 交换 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 建造 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 签署 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 执行 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 购买 \+([\d\.]+)$/,
    /^([\d\.]+)\% \| 雇佣 \+([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+) $/,
    /^([\d\.,]+)\% \| $/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^Gain (.+) experience at the start of a new acension.$/, '在新的转生开始时获得 $1 经验。'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Need (.+) Prestige!$/, '需要 $1 声望！'],
    [/^Get (.+) Prestige!$/, '获得 $1 声望！'],
    [/^You own (.+) bank.$/, '你拥有 $1 银行。'],
    [/^You will gain (.+) experience.$/, '你将获得 $1 经验。'],
    [/^You clicked (.+) times...$/, '你点击了 $1 次...'],
    [/^You bought (.+) management in one game.$/, '您在一场游戏中购买了 $1 管理。'],
    [/^You bought (.+) calendars.$/, '你购买了 $1 日历。'],
    [/^You bought (.+) laptops.$/, '你购买了 $1 笔记本电脑。'],
    [/^You bought (.+) tablets.$/, '你购买了 $1 平板电脑。'],
    [/^You bought (.+) paperclips.$/, '你购买了 $1 回形针。'],
    [/^You bought (.+) phones.$/, '你购买了 $1 电话。'],
    [/^You were away for ([\d\.]+)s!$/, '你离开了 $1 秒！'],
    [/^You were away for ([\d\.]+)d ([\d\.]+)h !$/, '你离开了 $1天 $2小时！'],
    [/^You were away for ([\d\.]+)m ([\d\.]+)s!$/, '你离开了 $1分 $2秒！'],
    [/^You were away for ([\d\.]+)h ([\d\.]+)m !$/, '你离开了 $1小时 $2分！'],
    [/^You were away for ([\d\.]+)h ([\d\.]+)m ([\d\.]+)s!$/, '你离开了 $1小时 $2分 $3秒！'],
    [/^You hired (.+) Intern on your own.$/, '你自己雇佣了 $1 名实习生。'],
    [/^You hired (.+) Junior on your own.$/, '你自己雇佣了 $1 名初级人员。'],
    [/^You hired (.+) Consultant on your own.$/, '你自己雇佣了 $1 名顾问。'],
    [/^Hint: This set Stock \#(.+) to a random number.$/, '提示：这会将 股票 \#$1 设置为随机数。'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+)\% \| Buy \+([\d\.]+)$/, '$1\% \| 购买 \+$2'],
    [/^([\d\.]+)\% \| Store \+([\d\.]+)$/, '$1\% \| 存储 \+$2'],
    [/^([\d\.]+)\% \| Do \+([\d\.]+)$/, '$1\% \| 执行 \+$2'],
    [/^([\d\.]+)\% \| Learn \+([\d\.]+)$/, '$1\% \| 学习 \+$2'],
    [/^([\d\.]+)\% \| Sign \+([\d\.]+)$/, '$1\% \| 签署 \+$2'],
    [/^([\d\.]+)\% \| Exchange \+([\d\.]+)$/, '$1\% \| 交换 \+$2'],
    [/^([\d\.]+)\% \| Build \+([\d\.]+)$/, '$1\% \| 建造 \+$2'],
    [/^([\d\.]+)\% \| Hire \+([\d\.]+)$/, '$1\% \| 雇佣 \+$2'],
    [/^([\d\.]+) Prestige$/, '$1 声望'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^Buy \+([\d\.,]+)$/, '购买 \+$1'],
    [/^Buy ([\d\.,]+)(.+)$/, '购买 $1 '],
    [/^(.+) Days$/, ' $1 天'],
    [/^(.+) Breaks$/, ' $1 休息'],
    [/^(.+)1st Ascension$/, ' 第一次转生'],
    [/^(.+)Buy ([\d\.,]+)(.+)$/, ' 购买 $2 '],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^([\d\.,]+)(.+)$/, '$1$2'],
    [/^(.+)Hire ([\d\.,]+)(.+)$/, '雇佣 $2 '],
    [/^(.+)Stock \#([\d\.,]+)$/, '股票 \#$2'],
    [/^Hire ([\d\.,]+) $/, '雇佣 $2 '],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);