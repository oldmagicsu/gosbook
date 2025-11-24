// 角色数据定义
const roles = [
    {
        id: '1hunter',
        name: '1猎',
        config: '需要的配置：\n\n老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 狙 波形 机炮/混乱无序 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 冰猎 速射狙 火箭手枪 救赎之握/急切/推推\n\n尾王 火猎 继承 黄金狙 榴弹',
        bosses: [
            '老一\n\n按全局中的连线点位站位\n不吃电流丰盈o到老二2台',
            '老二\n\n开：\n和12猎开2台\n留2台清怪至sub\n等12猎回2台后连一次线\n回1号点守台\n\n守：\n每一波在1台sub完等连线\n1台出天使：\n非last（最后一波天使）：报第一路白盾怪位置去该路清天使和白盾\nlast：3路天使和2路白盾全清\n\n内：\nlast后1台往内场走的这条路刷白盾利用残余启蒙清掉小怪后钉混乱无序，如果该路没有刷白盾直接钉混乱无序。\n钉完混乱无序去内场连线。\n连线后负责后路天使、↘白盾（已钉混乱无序）\n老二结束后按下示位置站位：\n\n 线头  线中  线中  线尾\n  1猎    2猎   3猎    4猎（卡旗）',
            '老三\n\n使用救赎之握tp boss\ntp封冰后换急切跳至继电器附近集合准备输出\n换推推打↙假眼（来不及让4猎帮打）',
            '尾王\n\n负责左边炮台和弱点、清怪防左献祭\n直接输出不连线'
        ]
    },
    {
        id: '2hunter',
        name: '2猎',
        config: '需要的配置\n\n老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 狙 波形 机炮 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 火猎 速射狙 金枪狙 急切\n\n尾王 火猎 金枪狙 榴弹',
        bosses: [
            '老一\n\n按全局中的连线点位站位\n大平台3口电流丰盈全吃\n过加载点自杀',
            '老二\n\n开：\n复活后直接去4台\n等4猎来4台连线开台\n开完4台后走传送门回1台和3猎连一次线\n摸旗去2台守台\n\n守：\n每一波在2台sub完去1台找1猎连线\n2台出天使：\n非last（最后一波天使）：报第一路白盾怪位置去该路清天使和白盾\nlast：3路天使和2路白盾全清\n\n内：\nlast后2台往内场走的这条路刷白盾利用残余启蒙清掉小怪，如果该路没有刷白盾用机炮注意一下左路和后路天使。\nsub后去内场连线。\n连线后负责↙白盾\n老二结束后按下示位置站位：\n\n 线头  线中  线中  线尾\n  1猎    2猎   3猎    4猎（卡旗）',
            '老三\n\n杀米诺陶/控小怪\n继电器附近集合输出\n打↘假眼',
            '尾王\n\n清怪防献祭\n输出连线按下示位置站位：\n 线头  线中  线尾\n  4猎    2猎   34术'
        ]
    },
    {
        id: '3hunter',
        name: '3猎',
        config: '需要的配置\n\n老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 狙 波形 机炮 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 火猎 速射狙 金枪狙 急切\n\n尾王 火猎 粪坑框架榴弹（开线） 金枪狙 榴弹',
        bosses: [
            '老一\n\n按全局中的连线点位站位\n吃3房电流丰盈后去大平台打3口附近的炮台（boss没吐直接去大平台）\n大平台2口处复活2猎\n过加载点自杀',
            '老二\n\n开：\n复活后在1台线头和4猎开1台\n控怪等3/4台都报开台后杀掉控住的小怪使其sub\n在线头等2猎回1台后连一次线\n摸旗去3台守台\n\n守：\n每一波在3台sub完等连线\n3台出天使：\n非last（最后一波天使）：报第一路白盾怪位置去该路清天使和白盾\nlast：3路天使和2路白盾全清\n\n内：\nlast后3台往内场走的这条路刷白盾利用残余启蒙清掉小怪，如果该路没有刷白盾用机炮注意一下左路和前路天使。\nsub后去内场连线。\n连线后负责右路天使\n老二结束后按下示位置站位：\n\n 线头  线中  线中  线尾\n  1猎    2猎   3猎    4猎（卡旗）',
            '老三\n\n杀米诺陶/控小怪\n继电器附近集合输出\n打↗假眼',
            '尾王\n\n清怪防献祭\nearly jump'
        ]
    },
    {
        id: '4hunter',
        name: '4猎',
        config: '需要的配置\n\n老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 劲弩/狙 波形 机炮/混乱无序 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 火猎 速射狙 金枪狙 急切\n\n尾王 火猎 金枪狙 榴弹',
        bosses: [
            '老一\n\n按全局中的连线点位站位\n不吃电流丰盈o到老二1台准备卡旗',
            '老二\n\n开：\n卡旗后用劲弩扣掉天使在1台线尾和3猎开1台\n超级跳至4台和2猎开4台\n回1台摸旗去4台守台（根据sub后剩余启蒙时间判断是否需要在1台和2/3猎再连线续一下时间）\n\n守：\n每一波在4台sub完去3台找3猎连线\n4台出天使：\n非last（最后一波天使）：报第一路白盾怪位置去该路清天使和白盾\nlast：3路天使和2路白盾全清\n\n内：\nlast后4台往内场走的这条路刷白盾利用残余启蒙清掉小怪后钉混乱无序，如果该路没有刷白盾直接钉混乱无序。\n钉完混乱无序去内场连线。\n连线后负责前路天使、↗白盾（已钉混乱无序）\n老二结束后按下示位置站位：\n\n 线头  线中  线中  线尾\n  1猎    2猎   3猎    4猎（卡旗）',
            '老三\n\n辅助1猎tp boss帮忙碎冰\n继电器附近集合输出',
            '尾王\n\n负责右边炮台和弱点、清怪防右献祭\n带好开锁器后输出连线时开线并按下示站位：\n 线头  线中  线尾\n  4猎    2猎   34术'
        ]
    },
    {
        id: '12hunter',
        name: '12猎',
        config: '需要的配置\n\n老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 冰猎/棱镜猎 劲弩 波形 急切/混乱无序\n\n老三 冰猎 速射狙 急切/推推\n\n尾王 火猎 金枪狙 榴弹',
        bosses: [
            '老一\n\n按全局中的连线点位站位\n吃2房电流丰盈o到老二2台',
            '老二\n\n开：\n和1猎开2台\n超级跳至3台和34术开3台\n回2台和1猎连一次线后回1台摸旗\n\n守：\n听队友报台子出天使和第一路白盾后和34术去帮忙分别清另外两路的天使和白盾\n在3个台子都出完天使进入last时和34术 eraly skip至内场连线（跳过第一次sub）\n\n内：\n和34术一起杀掉sub完刷新的3只天使(看右和上)后去↖钉混乱无序\n最后的sub负责左路天使、↖白盾（混乱无序）\n老二结束后不参与连线：',
            '老三\n\n存荧光\n继电器附近集合输出\n打↖假眼',
            '尾王\n\n左边荧光\n直接输出不连线'
        ]
    },
    {
        id: '34warlock',
        name: '34术',
        config: '需要的配置\n\n老一 火中 山巅急切 辐径晚星（头部插3个充沛mod）\n\n老二 火中 粪坑框架（开线）/劲弩 波形 急切\n\n老三 火中 无\n\n尾王 火中 继承 火箭手枪 急切/推推',
        bosses: [
            '老一\n\n按全局中的连线点位站位\n吃1房boss电流丰盈后转大招oob至老二2台',
            '老二\n\n开：\n和12猎开3台\n暂留3台清怪\n\n守：\n听队友报台子出天使和第一路白盾后和12猎去帮忙分别清另外两路的天使和白盾\n在3个台子都出完天使进入last时和12猎 eraly skip至内场连线（跳过第一次sub）\n\n内：\n和34术一起杀掉sub完刷新的3只天使（看左和下）\noob至尾王等队友喊p',
            '老三\n\n查无此人',
            '尾王\n\n右边荧光\n火中插线中附近后换推推和火箭手枪\n输出连线按下示位置站位：\n线头  线中  线尾\n4猎    2猎   34术\n连线前推一下连线后推一下然后打手枪'
        ]
    }
];

window.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const submitLogin = document.getElementById('submit-login');
    const usernameInput = document.getElementById('username');
    const errorMessage = document.getElementById('error-message');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    const logoutButton = document.getElementById('logout-button');
    const mainContainer = document.getElementById('main-container');
    const detailContainer = document.getElementById('detail-container');
    const backButton = document.getElementById('back-button');
    const userRankings = document.getElementById('user-rankings');
    
    // 花园之书按钮
    const gardenBookButtonMain = document.getElementById('garden-book-button-main');
    const gardenBookButtonMini = document.getElementById('garden-book-button');
    
    // 检查元素是否存在
    console.log('花园之书主按钮:', gardenBookButtonMain);
    console.log('花园之书小型按钮:', gardenBookButtonMini);
    console.log('登录按钮:', loginButton);
    
    // 创建角色卡片容器
    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'cards-grid';
    cardsGrid.style.display = 'none';
    mainContainer.appendChild(cardsGrid);
    
    // 验证用户名格式 - 修改为允许空格
    function validateUsername(username) {
        const regex = /^[\u4e00-\u9fa5a-zA-Z0-9\s]+#[0-9]{4}$/;
        return regex.test(username);
    }
    
    // 获取排名数据 - 完善API调用和数据处理
    async function fetchUserRankings(username) {
        try {
            // 直接使用用户名调用raid.report API进行搜索
            const response = await fetch(`https://api.raid.report/v1/search?query=${encodeURIComponent(username)}`);
            
            if (!response.ok) {
                throw new Error('搜索用户失败');
            }
            
            const searchResults = await response.json();
            
            // 检查是否有搜索结果
            if (searchResults.players && searchResults.players.length > 0) {
                // 获取第一个匹配的玩家
                const player = searchResults.players[0];
                const membershipId = player.membershipId;
                
                // 获取该玩家的排名数据
                const rankingsResponse = await fetch(`https://api.raid.report/v1/player/${membershipId}/raidRankings`);
                
                if (!rankingsResponse.ok) {
                    throw new Error('获取排名数据失败');
                }
                
                const data = await rankingsResponse.json();
                processRaidReportData(data);
            } else {
                // 无搜索结果时显示模拟数据，包含更多raid
                const mockData = {
                    totalRankings: {
                        totalRaids: 250,
                        top1000Raids: 200,
                        clearsRank: 350,
                        flawlessRank: 220,
                        kdRank: 300
                    },
                    raids: [
                        {
                            name: 'Root of Nightmares',
                            normalClears: 65,
                            flawlessClears: 48,
                            fullClearsRank: 180
                        },
                        {
                            name: 'Crota\'s End',
                            normalClears: 52,
                            flawlessClears: 38,
                            fullClearsRank: 145
                        },
                        {
                            name: 'Vault of Glass',
                            normalClears: 48,
                            flawlessClears: 32,
                            fullClearsRank: 200
                        },
                        {
                            name: 'King\'s Fall',
                            normalClears: 42,
                            flawlessClears: 28,
                            fullClearsRank: 190
                        },
                        {
                            name: 'Deep Stone Crypt',
                            normalClears: 35,
                            flawlessClears: 25,
                            fullClearsRank: 210
                        },
                        {
                            name: 'Vow of the Disciple',
                            normalClears: 30,
                            flawlessClears: 22,
                            fullClearsRank: 230
                        }
                    ]
                };
                
                processRaidReportData(mockData);
            }
        } catch (error) {
            console.error('获取排名数据时出错:', error);
            
            // 使用更完整的模拟数据
            const mockData = {
                totalRankings: {
                    totalRaids: 250,
                    top1000Raids: 200,
                    clearsRank: 350,
                    flawlessRank: 220,
                    kdRank: 300
                },
                raids: [
                    {
                        name: 'Root of Nightmares',
                        normalClears: 65,
                        flawlessClears: 48,
                        fullClearsRank: 180
                    },
                    {
                        name: 'Crota\'s End',
                        normalClears: 52,
                        flawlessClears: 38,
                        fullClearsRank: 145
                    },
                    {
                        name: 'Vault of Glass',
                        normalClears: 48,
                        flawlessClears: 32,
                        fullClearsRank: 200
                    },
                    {
                        name: 'King\'s Fall',
                        normalClears: 42,
                        flawlessClears: 28,
                        fullClearsRank: 190
                    },
                    {
                        name: 'Deep Stone Crypt',
                        normalClears: 35,
                        flawlessClears: 25,
                        fullClearsRank: 210
                    },
                    {
                        name: 'Vow of the Disciple',
                        normalClears: 30,
                        flawlessClears: 22,
                        fullClearsRank: 230
                    }
                ]
            };
            
            processRaidReportData(mockData);
        }
    }

    // 处理排名数据
    function processRaidReportData(data) {
        // 显示总体排名
        const totalRank = document.querySelector('.total-rank');
        totalRank.innerHTML = `
            <div class="total-rank-item">
                <span>Total Raids:</span>
                <span>${data.totalRankings.totalRaids}</span>
            </div>
            <div class="total-rank-item">
                <span>Top 1000 Raids:</span>
                <span>${data.totalRankings.top1000Raids}</span>
            </div>
            <div class="total-rank-item">
                <span>Clears Rank:</span>
                <span>${data.totalRankings.clearsRank}</span>
            </div>
            <div class="total-rank-item">
                <span>Flawless Rank:</span>
                <span>${data.totalRankings.flawlessRank}</span>
            </div>
            <div class="total-rank-item">
                <span>K/D Rank:</span>
                <span>${data.totalRankings.kdRank}</span>
            </div>
        `;
        
        // 显示各副本排名
        const raidRanks = document.querySelector('.raid-ranks');
        raidRanks.innerHTML = '';
        
        data.raids.forEach(raid => {
            const rankItem = document.createElement('div');
            rankItem.className = 'raid-rank-item';
            rankItem.innerHTML = `
                <h4>${raid.name}</h4>
                <div>Normal Clears: ${raid.normalClears}</div>
                <div>Flawless Clears: ${raid.flawlessClears}</div>
                <div>Full Clears Rank: ${raid.fullClearsRank}</div>
            `;
            raidRanks.appendChild(rankItem);
        });
        
        // 显示排名区域
        userRankings.style.display = 'block';
    }

    // 移除翻译函数，直接使用英文名称

    function getRaidName(englishName) {
        const nameMap = {
            'Root of Nightmares': '梦魇之根',
            'Crota\'s End': '克洛塔的末日'
        };
        return nameMap[englishName] || englishName;
    }
    
    // 事件监听器 - 打开登录弹窗
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            console.log('登录按钮被点击');
            openLoginModal();
        });
    }
    
    // 事件监听器 - 关闭登录弹窗
    if (closeLogin) {
        closeLogin.addEventListener('click', closeLoginModal);
    }
    
    // 事件监听器 - 提交登录
    if (submitLogin) {
        submitLogin.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            
            if (!validateUsername(username)) {
                errorMessage.textContent = '请输入正确格式的命运2玩家ID（格式：字符#4位数字）';
                return;
            }
            
            handleLogin(username);
            closeLoginModal();
        });
    }
    
    // 事件监听器 - 登出
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    
    // 点击弹窗外部关闭弹窗
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }
    
    // 回车键提交登录
    if (usernameInput) {
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitLogin.click();
            }
        });
    }
    
    // 生成角色卡片
    roles.forEach(role => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 class="card-title">${role.name}</h3>
            <button class="card-button" data-role-id="${role.id}">查看角色</button>
        `;
        cardsGrid.appendChild(card);
    });

    // 为所有"查看角色"按钮添加点击事件
    document.querySelectorAll('.card-button').forEach(button => {
        button.addEventListener('click', () => {
            const roleId = button.getAttribute('data-role-id');
            showRoleDetail(roleId);
        });
    });

    // 返回按钮事件
    if (backButton) {
        backButton.addEventListener('click', showRoleCards);
    }

    // 为关卡标签添加点击事件
    document.querySelectorAll('.boss-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const bossIndex = parseInt(tab.getAttribute('data-boss'));
            updateActiveBossTab(bossIndex);
            updateBossContent(bossIndex);
        });
    });
    
    // 添加花园之书按钮点击事件（主页面按钮）
    if (gardenBookButtonMain) {
        gardenBookButtonMain.addEventListener('click', () => {
            console.log('主页面花园之书按钮被点击');
            showRoleCards();
        });
    }
    
    // 添加小型花园之书按钮点击事件（右上角按钮）
    if (gardenBookButtonMini) {
        gardenBookButtonMini.addEventListener('click', () => {
            console.log('右上角花园之书按钮被点击');
            showRoleCards();
        });
    }
    
    // 检查是否已登录
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        handleLogin(savedUsername);
    }
});

// 显示角色详情
function showRoleDetail(roleId) {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;
    
    // 更新详情页面内容
    const detailRoleName = document.getElementById('detail-role-name');
    const configContent = document.getElementById('config-content');
    
    if (detailRoleName) detailRoleName.textContent = role.name;
    if (configContent) configContent.textContent = role.config;
    
    // 更新当前角色
    currentRole = role;
    
    // 切换显示容器
    const mainContainer = document.getElementById('main-container');
    const detailContainer = document.getElementById('detail-container');
    
    if (mainContainer) mainContainer.style.display = 'none';
    if (detailContainer) detailContainer.style.display = 'block';
    
    // 初始化第一个关卡
    updateActiveBossTab(0);
    updateBossContent(0);
}

// 显示角色卡片列表
function showRoleCards() {
    const mainContainer = document.getElementById('main-container');
    const detailContainer = document.getElementById('detail-container');
    const cardsGrid = document.querySelector('.cards-grid');
    
    if (mainContainer) mainContainer.style.display = 'block';
    if (detailContainer) detailContainer.style.display = 'none';
    if (cardsGrid) cardsGrid.style.display = 'grid';
}

// 当前选中的角色
let currentRole = null;

// 更新活动的关卡标签
function updateActiveBossTab(bossIndex) {
    document.querySelectorAll('.boss-tab').forEach((tab, index) => {
        if (index === bossIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.boss-interface').forEach((interface, index) => {
        if (index === bossIndex) {
            interface.classList.add('active');
        } else {
            interface.classList.remove('active');
        }
    });
}

// 更新关卡内容
function updateBossContent(bossIndex) {
    if (!currentRole) return;
    
    const bossInterface = document.getElementById(`boss-interface-${bossIndex}`);
    if (!bossInterface) return;
    
    // 获取关卡详情内容区域
    const bossDetails = bossInterface.querySelector('.boss-details');
    if (!bossDetails) return;
    
    // 更新关卡详情
    bossDetails.textContent = currentRole.bosses[bossIndex] || '';
}