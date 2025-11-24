// 角色配置和策略数据
const roleData = {
    h1: {
        config: "角色h1的配置内容：推荐使用高输出装备，优先点满伤害技能。",
        strategies: {
            boss1: "老一策略：优先攻击弱点，注意躲避范围技能。",
            boss2: "老二策略：保持中距离输出，及时支援队友。",
            boss3: "老三策略：切换至防御姿态，吸引boss仇恨。",
            boss4: "尾王策略：输出最大化，关键时刻使用大招。"
        }
    },
    h2: {
        config: "角色h2的配置内容：平衡型装备，注重生存能力。",
        strategies: {
            boss1: "老一策略：辅助队友，提供增益buff。",
            boss2: "老二策略：控制敌人，减少团队压力。",
            boss3: "老三策略：持续输出，注意自身位置。",
            boss4: "尾王策略：优先处理小怪，保护团队输出。"
        }
    },
    h3: {
        config: "角色h3的配置内容：防御型装备，提升生命值和抗性。",
        strategies: {
            boss1: "老一策略：承担主坦克职责，稳定boss位置。",
            boss2: "老二策略：打断boss技能，减少团队伤害。",
            boss3: "老三策略：分阶段切换防御技能。",
            boss4: "尾王策略：关键时刻使用减伤技能保护团队。"
        }
    },
    h4: {
        config: "角色h4的配置内容：治疗型装备，最大化治疗效果。",
        strategies: {
            boss1: "老一策略：保持团队血量健康，注意群疗。",
            boss2: "老二策略：优先治疗坦克，预留爆发治疗。",
            boss3: "老三策略：分散站位，避免群体减员。",
            boss4: "尾王策略：根据boss阶段调整治疗策略。"
        }
    },
    h12: {
        config: "角色h12的配置内容：混合型装备，兼顾输出和生存。",
        strategies: {
            boss1: "老一策略：灵活切换姿态，适应战斗需求。",
            boss2: "老二策略：利用位移技能躲避伤害。",
            boss3: "老三策略：集中输出关键部位。",
            boss4: "尾王策略：根据团队配置调整定位。"
        }
    },
    w34: {
        config: "角色w34的配置内容：控制型装备，强化控制技能效果。",
        strategies: {
            boss1: "老一策略：频繁控制敌人，打断技能。",
            boss2: "老二策略：利用控制链限制boss行动。",
            boss3: "老三策略：配合队友输出，提供控制支持。",
            boss4: "尾王策略：在关键时刻使用群体控制。"
        }
    }
};

// DOM元素引用
let gardenBookButton, gardenBookPage, backButton, configArea, selectedRoleInfo;
let strategyArea, boss1Strategy, boss2Strategy, boss3Strategy, boss4Strategy;
let characterButtons;

// 初始化函数
function init() {
    // 获取DOM元素
    gardenBookButton = document.getElementById('garden-book-button');
    gardenBookPage = document.getElementById('garden-book-page');
    backButton = document.getElementById('back-button');
    configArea = document.getElementById('config-area');
    selectedRoleInfo = document.getElementById('selected-role-info');
    strategyArea = document.getElementById('strategy-area');
    boss1Strategy = document.getElementById('boss1-strategy');
    boss2Strategy = document.getElementById('boss2-strategy');
    boss3Strategy = document.getElementById('boss3-strategy');
    boss4Strategy = document.getElementById('boss4-strategy');
    characterButtons = document.querySelectorAll('.character-button');
    
    // 添加事件监听器
    gardenBookButton.addEventListener('click', goToGardenBook);
    backButton.addEventListener('click', goBackToMain);
    
    // 为角色按钮添加点击事件
    characterButtons.forEach(button => {
        button.addEventListener('click', handleRoleSelection);
    });
    
    // 按ESC键返回主界面
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !gardenBookPage.classList.contains('hidden')) {
            goBackToMain();
        }
    });
}

// 切换到花园之书页面
function goToGardenBook() {
    gardenBookPage.classList.remove('hidden');
    // 重置状态
    resetSelectionState();
}

// 返回主界面
function goBackToMain() {
    gardenBookPage.classList.add('hidden');
    resetSelectionState();
}

// 重置选择状态
function resetSelectionState() {
    // 移除所有选中状态
    characterButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // 重置显示内容
    selectedRoleInfo.textContent = '请选择一个角色查看配置';
    strategyArea.classList.add('hidden');
}

// 处理角色选择
function handleRoleSelection(event) {
    const role = event.target.dataset.role;
    const roleInfo = roleData[role];
    
    // 更新选中状态
    characterButtons.forEach(button => {
        if (button.dataset.role === role) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
    
    // 显示角色配置
    if (roleInfo) {
        selectedRoleInfo.textContent = roleInfo.config;
        
        // 更新策略内容
        boss1Strategy.textContent = roleInfo.strategies.boss1;
        boss2Strategy.textContent = roleInfo.strategies.boss2;
        boss3Strategy.textContent = roleInfo.strategies.boss3;
        boss4Strategy.textContent = roleInfo.strategies.boss4;
        
        // 显示策略区域
        strategyArea.classList.remove('hidden');
    }
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);