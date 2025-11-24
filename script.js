// 角色配置数据 - 从book目录文件中提取的实际内容
const roleData = {
    h1: {
        config: "老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 狙 波形 机炮/混乱无序 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 冰猎 速射狙 火箭手枪 救赎之握/急切/推推 \n\n尾王 火猎 继承 黄金狙 榴弹"
    },
    h2: {
        config: "老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 狙 波形 机炮 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 火猎 速射狙 金枪狙 急切\n\n尾王 火猎 金枪狙 榴弹"
    },
    h3: {
        config: "老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 狙 波形 机炮 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 火猎 速射狙 金枪狙 急切\n\n尾王 火猎 粪坑框架榴弹（开线） 金枪狙 榴弹"
    },
    h4: {
        config: "老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 火猎 劲弩/狙 波形 机炮/混乱无序 tips：推荐腿上插一个火枪套，在连线期间缓慢自填可做到整个老二流程中机炮不用手动换弹。\n\n老三 火猎 速射狙 金枪狙 急切\n\n尾王 火猎 金枪狙 榴弹"
    },
    h12: {
        config: "老一 冰猎 粪坑框架榴弹（开线）山巅急切\n\n老二 冰猎/棱镜猎 劲弩 波形 急切/混乱无序 \n\n老三 冰猎 速射狙 急切/推推\n\n尾王 火猎 金枪狙 榴弹"
    },
    w34: {
        config: "老一 火中 山巅急切 辐径晚星（头部插3个充沛mod）\n\n老二 火中 粪坑框架（开线）/劲弩 波形 急切\n\n老三 火中 无 \n\n尾王 火中 继承 火箭手枪 急切/推推"
    }
};

// DOM元素引用
let gardenBookButton, gardenBookPage, backButton, configArea, selectedRoleInfo;
let strategyArea, roleStrategyContents;
let characterButtons;

// 初始化函数
function init() {
    try {
        console.log('开始初始化花园之书...');
        
        // 获取DOM元素 - 优先使用ID选择器
        gardenBookButton = document.getElementById('garden-book-button');
        gardenBookPage = document.getElementById('garden-book-page');
        backButton = document.getElementById('back-button');
        configArea = document.getElementById('config-area');
        selectedRoleInfo = document.getElementById('selected-role-info');
        strategyArea = document.getElementById('strategy-area');
        
        // 获取集合元素
        characterButtons = document.querySelectorAll('.character-button');
        roleStrategyContents = document.querySelectorAll('.role-strategy-content');
        
        // 验证关键DOM元素是否存在
        if (!gardenBookButton) console.error('未找到花园之书按钮');
        if (!gardenBookPage) console.error('未找到花园之书页面');
        if (!backButton) console.error('未找到返回按钮');
        if (!selectedRoleInfo) console.error('未找到角色信息显示区域');
        
        // 确保gardenBookPage初始状态为隐藏
        if (gardenBookPage) {
            gardenBookPage.style.display = 'none';
            console.log('花园之书页面已初始化为隐藏状态');
        }
        
        // 添加事件监听器
        if (gardenBookButton) {
            gardenBookButton.addEventListener('click', goToGardenBook);
            console.log('花园之书按钮事件已绑定');
        }
        
        if (backButton) {
            backButton.addEventListener('click', goBackToMain);
            console.log('返回按钮事件已绑定');
        }
        
        // 为角色按钮添加点击事件
        if (characterButtons.length > 0) {
            characterButtons.forEach(button => {
                button.addEventListener('click', handleRoleSelection);
            });
            console.log('已绑定', characterButtons.length, '个角色按钮的点击事件');
        } else {
            console.warn('未找到角色按钮');
        }
        
        // 按ESC键返回主界面
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gardenBookPage && gardenBookPage.style.display !== 'none') {
                goBackToMain();
            }
        });
        
        console.log('花园之书初始化完成');
    } catch (error) {
        console.error('初始化过程中出现错误:', error);
    }
}

// 切换到花园之书页面
function goToGardenBook() {
    try {
        console.log('尝试打开花园之书...');
        
        // 验证gardenBookPage是否存在
        if (!gardenBookPage) {
            console.error('花园之书页面元素不存在');
            return;
        }
        
        // 获取主界面元素（使用类选择器，因为main-screen是类而不是ID）
        const mainScreen = document.querySelector('.main-screen');
        if (!mainScreen) {
            console.error('主界面元素不存在');
        }
        
        // 记录原始样式以便恢复
        if (!gardenBookPage._originalStyle) {
            gardenBookPage._originalStyle = { display: gardenBookPage.style.display };
            console.log('已保存花园之书页面原始样式');
        }
        
        // 显示花园之书页面
        gardenBookPage.style.display = 'block';
        console.log('花园之书页面已设为显示');
        
        // 隐藏主界面
        if (mainScreen) {
            if (!mainScreen._originalStyle) {
                mainScreen._originalStyle = { display: mainScreen.style.display };
            }
            mainScreen.style.display = 'none';
            console.log('主界面已隐藏');
        }
        
        // 重置选择状态
        resetSelectionState();
        
        console.log('花园之书打开成功');
    } catch (error) {
        console.error('打开花园之书时出错:', error);
    }
}

// 返回主界面
function goBackToMain() {
    try {
        console.log('返回主界面...');
        
        // 获取主界面元素
        const mainScreen = document.querySelector('.main-screen');
        if (!mainScreen) {
            console.error('未找到主界面元素');
        }
        
        // 隐藏花园之书页面
        if (gardenBookPage) {
            gardenBookPage.style.display = 'none';
            console.log('花园之书页面已隐藏');
        }
        
        // 显示主界面
        if (mainScreen) {
            mainScreen.style.display = 'block';
            console.log('主界面已显示');
        }
        
        // 重置选择状态
        resetSelectionState();
        
        console.log('返回主界面成功');
    } catch (error) {
        console.error('返回主界面时出错:', error);
    }
}

// 重置选择状态
function resetSelectionState() {
    try {
        // 重置角色按钮状态
        if (characterButtons) {
            characterButtons.forEach(button => {
                button.classList.remove('selected');
            });
        } else {
            // 如果characterButtons未定义，直接通过DOM查询
            document.querySelectorAll('.character-button').forEach(button => {
                button.classList.remove('selected');
            });
        }
        
        // 隐藏所有角色策略内容
        document.querySelectorAll('.role-strategy-content').forEach(content => {
            content.classList.add('hidden');
            content.style.display = 'none';
        });
        
        // 重置选中角色信息
        if (selectedRoleInfo) {
            selectedRoleInfo.textContent = '请选择一个角色查看配置';
        }
    } catch (error) {
        console.error('重置选择状态时出错:', error);
    }
}

// 处理角色选择
function handleRoleSelection(event) {
    try {
        // 使用currentTarget确保获取到正确的按钮元素
        const button = event.currentTarget;
        const role = button.dataset.role;
        
        if (!role) {
            console.error('未找到角色数据');
            return;
        }
        
        const roleInfo = roleData[role];
        const roleContentElement = document.getElementById(`role-${role}-content`);
        
        // 重置所有按钮的选中状态
        document.querySelectorAll('.character-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 设置当前按钮为选中状态
        button.classList.add('selected');
        
        // 隐藏所有角色策略内容
        document.querySelectorAll('.role-strategy-content').forEach(content => {
            content.classList.add('hidden');
            content.style.display = 'none';
        });
        
        // 显示角色配置
        if (roleInfo && selectedRoleInfo) {
            // 将换行符转换为HTML换行
            selectedRoleInfo.innerHTML = roleInfo.config.replace(/\n/g, '<br>');
            
            // 显示对应的角色策略内容
            if (roleContentElement) {
                roleContentElement.classList.remove('hidden');
                roleContentElement.style.display = 'block';
            } else {
                console.warn(`未找到 ${role} 角色对应的内容元素`);
            }
        }
    } catch (error) {
        console.error('处理角色选择时出错:', error);
    }
}

// 将文本内容转换为带换行的HTML显示
function formatTextWithNewlines(text) {
    return text ? text.replace(/\n/g, '<br>') : '';
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);