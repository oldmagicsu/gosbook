// DOM元素引用
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const loginSection = document.getElementById('login-section');
const userInfoSection = document.getElementById('user-info-section');
const clanSection = document.getElementById('clan-section');
const onlineStatusSection = document.getElementById('online-status-section');
const raidDataSection = document.getElementById('raid-data-section');
const loadingIndicator = document.getElementById('loading-indicator');
const loadingText = document.getElementById('loading-text');
const loginError = document.getElementById('login-error');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userMembershipId = document.getElementById('user-membership-id');
const userStatus = document.getElementById('user-status');
const clanName = document.getElementById('clan-name');
const clanMembers = document.getElementById('clan-members');
const clanDescription = document.getElementById('clan-description');
const onlineFriends = document.getElementById('online-friends');
const raidCompletions = document.getElementById('raid-completions');

// 应用配置
const API_KEY = '6d25ddf85f144bdf91f0ad85c78b6243';
const CLIENT_ID = '51061';
const BUNGIE_AUTH_URL = 'https://www.bungie.net/zh-chs/OAuth/Authorize';
const BUNGIE_API_URL = 'https://www.bungie.net/Platform';

// 生成随机的state参数用于CSRF保护
function generateState() {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log('生成的State:', state);
    return state;
}

// 保存state到localStorage
function saveState(state) {
    console.log('保存State到localStorage:', state);
    localStorage.setItem('bungie_auth_state', state);
}

// 从localStorage获取保存的state
function getSavedState() {
    const state = localStorage.getItem('bungie_auth_state');
    console.log('从localStorage获取的State:', state);
    return state;
}

// 清除保存的state
function clearState() {
    console.log('清除localStorage中的State');
    localStorage.removeItem('bungie_auth_state');
}

// 构建授权URL
function buildAuthUrl() {
    const state = generateState();
    saveState(state);
    
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
    const authUrl = `${BUNGIE_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectUri}`;
    console.log('构建的授权URL:', authUrl);
    return authUrl;
}

// 打开授权窗口
function openAuthWindow() {
    const authUrl = buildAuthUrl();
    const width = 600;
    const height = 700;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    // 打开一个居中的弹出窗口
    const authWindow = window.open(authUrl, 'Bungie授权', `width=${width},height=${height},left=${left},top=${top}`);
    
    // 确保窗口正确居中
    if (authWindow && !authWindow.closed) {
        // 尝试再次设置位置，确保跨浏览器兼容性
        setTimeout(() => {
            if (authWindow && !authWindow.closed) {
                authWindow.moveTo(left, top);
            }
        }, 10);
    }
}

// 从URL获取查询参数
function getQueryParams() {
    console.log('当前URL:', window.location.href);
    const params = {};
    const queryString = window.location.search.substring(1);
    console.log('查询字符串:', queryString);
    const pairs = queryString.split('&');
    
    for (let pair of pairs) {
        const [key, value] = pair.split('=');
        if (key) {
            const decodedKey = decodeURIComponent(key);
            const decodedValue = decodeURIComponent(value || '');
            params[decodedKey] = decodedValue;
            console.log(`解析参数: ${decodedKey}=${decodedValue}`);
        }
    }
    
    return params;
}

// 检查URL是否包含授权回调参数
function checkForAuthCallback() {
    console.log('检查授权回调...');
    const params = getQueryParams();
    
    // 如果有code参数，说明是从Bungie授权页面重定向回来的
    if (params.code) {
        console.log('发现授权码，开始处理...');
        try {
            // 验证state参数
            const receivedState = params.state;
            const savedState = getSavedState();
            
            console.log('接收到的State:', receivedState);
            console.log('保存的State:', savedState);
            
            // 检查state参数是否匹配
            if (!receivedState) {
                throw new Error('State参数缺失');
            } else if (!savedState) {
                throw new Error('未找到保存的State');
            } else if (receivedState !== savedState) {
                throw new Error('State值不匹配');
            }
            
            console.log('State验证成功!');
            // 验证成功后清除保存的state
            clearState();
            
            // 从回调中移除参数，避免刷新页面时重复处理
            const urlWithoutParams = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, urlWithoutParams);
            
            // 获取授权码并处理
            const authorizationCode = params.code;
            console.log('处理授权码:', authorizationCode.substring(0, 10) + '...');
            handleAuthCode(authorizationCode);
            
            return true;
        } catch (error) {
            console.error('授权回调处理失败:', error);
            // 显示具体错误，而不是CSRF攻击提示
            showError('授权失败: ' + error.message);
            return false;
        }
    }
    
    return false;
}

// 显示通知消息，支持不同类型的通知（成功、错误、信息）
function showNotification(message, type = 'info') {
    // 检查通知元素是否存在，不存在则创建
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '10000';
        notification.style.fontFamily = 'Arial, sans-serif';
        notification.style.fontSize = '14px';
        notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        notification.style.transition = 'all 0.3s ease';
        document.body.appendChild(notification);
    }
    
    // 设置消息内容和样式
    notification.textContent = message;
    
    // 根据类型设置不同的背景色
    switch (type) {
        case 'success':
            notification.style.background = 'rgba(76, 175, 80, 0.9)'; // 绿色
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.background = 'rgba(244, 67, 54, 0.9)'; // 红色
            notification.style.color = 'white';
            break;
        case 'warning':
            notification.style.background = 'rgba(255, 193, 7, 0.9)'; // 黄色
            notification.style.color = 'black';
            break;
        case 'info':
        default:
            notification.style.background = 'rgba(0, 0, 0, 0.8)'; // 黑色
            notification.style.color = 'white';
            break;
    }
    
    // 显示通知，带淡入效果
    notification.style.opacity = '0';
    notification.style.display = 'block';
    
    // 添加淡入效果
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // 3秒后自动隐藏，带淡出效果
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// 使用授权码获取访问令牌，增强错误处理
async function getAccessToken(code) {
    if (!code) {
        throw new Error('无效的授权码');
    }
    
    showLoading('正在获取访问令牌...');
    
    try {
        // 增加重试机制
        let retries = 2;
        let lastError = null;
        
        while (retries >= 0) {
            try {
                const response = await fetch(`${BUNGIE_API_URL}/App/OAuth/Token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-API-Key': API_KEY
                    },
                    body: new URLSearchParams({
                        'grant_type': 'authorization_code',
                        'code': code,
                        'client_id': CLIENT_ID
                    }),
                    // 添加超时设置
                    signal: AbortSignal.timeout(15000) // 15秒超时
                });
                
                if (!response.ok) {
                    throw new Error(`获取令牌失败: HTTP ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                // 检查API返回的错误码
                if (!data || data.ErrorCode === 0) {
                    throw new Error('服务器返回了无效响应');
                }
                
                if (data.ErrorCode !== 1) {
                    throw new Error(`Bungie API错误: ${data.Message || '未知错误'}`);
                }
                
                // 验证响应结构
                if (!data.Response || !data.Response.access_token) {
                    throw new Error('未在响应中找到访问令牌');
                }
                
                // 保存访问令牌
                const accessToken = data.Response.access_token;
                try {
                    localStorage.setItem('bungie_access_token', accessToken);
                } catch (storageError) {
                    console.error('保存访问令牌失败:', storageError);
                    // 继续执行，即使保存失败
                }
                
                return accessToken;
            } catch (error) {
                lastError = error;
                retries--;
                
                if (retries >= 0) {
                    console.warn(`请求失败，${retries + 1}次重试剩余:`, error.message);
                    // 等待1秒后重试
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
        
        // 所有重试都失败
        throw lastError || new Error('未知错误');
    } catch (error) {
        const errorMessage = error.name === 'AbortError' 
            ? '请求超时，请检查网络连接' 
            : `获取访问令牌失败: ${error.message}`;
        
        showError(errorMessage);
        throw new Error(errorMessage);
    } finally {
        hideLoading();
    }
}

// 处理授权码
async function handleAuthCode(code) {
    try {
        const accessToken = await getAccessToken(code);
        
        // 如果当前是在弹出窗口中，通知父窗口授权成功并关闭
        if (window.opener) {
            window.opener.postMessage({ type: 'AUTH_SUCCESS', accessToken }, window.location.origin);
            window.close();
        } else {
            // 直接在当前页面处理
            await loadUserData(accessToken);
        }
    } catch (error) {
        console.error('处理授权码失败:', error);
    }
}

// 显示加载指示器
function showLoading(text = '加载中...') {
    loadingText.textContent = text;
    loadingIndicator.classList.remove('hidden');
}

// 隐藏加载指示器
function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

// 显示错误消息，增强错误展示
function showError(message) {
    // 检查错误元素是否存在
    if (loginError) {
        loginError.textContent = message;
        loginError.classList.add('show');
        
        // 清除之前的定时器
        if (showError.timeout) {
            clearTimeout(showError.timeout);
        }
        
        // 设置新的定时器
        showError.timeout = setTimeout(() => {
            loginError.classList.remove('show');
        }, 5000);
    }
    
    // 同时显示通知消息
    showNotification(message, 'error');
    
    // 记录到控制台
    console.error('错误:', message);
}

// 处理来自弹出窗口的消息
function setupMessageListener() {
    window.addEventListener('message', async (event) => {
        // 验证消息来源
        if (event.origin !== window.location.origin) return;
        
        if (event.data && event.data.type === 'AUTH_SUCCESS') {
            const accessToken = event.data.accessToken;
            // 显示授权成功提示
            showNotification('授权成功！正在加载您的信息...');
            await loadUserData(accessToken);
        } else if (event.data && event.data.type === 'BUNGIE_AUTH_SUCCESS') {
            const accessToken = event.data.accessToken;
            // 显示授权成功提示
            showNotification('授权成功！正在加载您的信息...');
            await loadUserData(accessToken);
        }
    });
}

// 检查用户是否已登录
function checkAuthStatus() {
    const accessToken = localStorage.getItem('bungie_access_token');
    if (accessToken) {
        loadUserData(accessToken);
    }
}

// 登出功能
function setupLogout() {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('bungie_access_token');
        loginSection.classList.remove('hidden');
        userInfoSection.classList.add('hidden');
        clanSection.classList.add('hidden');
        onlineStatusSection.classList.add('hidden');
        raidDataSection.classList.add('hidden');
    });
}

// 初始化
function init() {
    // 检查是否是授权回调
    const isAuthCallback = checkForAuthCallback();
    
    if (!isAuthCallback) {
        // 设置消息监听器以接收来自弹出窗口的授权成功通知
        setupMessageListener();
        
        // 设置登录按钮点击事件
        loginButton.addEventListener('click', openAuthWindow);
        
        // 设置登出功能
        setupLogout();
        
        // 检查用户是否已登录
        checkAuthStatus();
    }
}

// 通用API请求函数，带加载状态和错误处理
async function fetchBungieApi(endpoint, accessToken, loadingMessage = '') {
    try {
        // 如果提供了加载消息，则显示加载状态
        if (loadingMessage) {
            showLoading(loadingMessage);
        }
        
        const response = await fetch(`${BUNGIE_API_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'X-API-Key': API_KEY,
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.ErrorCode !== 1) {
            throw new Error(`Bungie API错误: ${data.Message || '未知错误'}`);
        }
        
        return data.Response;
    } catch (error) {
        console.error(`API请求错误 (${endpoint}):`, error);
        showError(`请求失败: ${error.message}`);
        throw error;
    } finally {
        // 无论请求成功还是失败，都隐藏加载状态
        if (loadingMessage) {
            hideLoading();
        }
    }
}

// 获取当前用户的会员信息，支持加载消息参数
async function getUserMembership(accessToken, loadingMessage = '') {
    return fetchBungieApi('/User/GetMembershipsForCurrentUser/', accessToken, loadingMessage);
}

// 获取用户详细信息，支持加载消息参数
async function getUserInfo(membershipType, membershipId, accessToken, loadingMessage = '') {
    return fetchBungieApi(`/User/GetPublicUserInfo/${membershipId}/`, accessToken, loadingMessage);
}

// 获取用户在线状态，带加载状态
async function getUserPresence(membershipType, membershipId, accessToken) {
    try {
        const response = await fetchBungieApi(
            `/User/Presence/${membershipType}/${membershipId}/`,
            accessToken,
            '正在获取用户在线状态...'
        );
        return response;
    } catch (error) {
        console.error('获取用户在线状态失败:', error);
        // 只记录错误，不显示加载状态，因为在并行加载中
        return null;
    }
}

// 显示用户在线状态
function displayUserPresence(presenceData) {
    if (!presenceData) {
        userStatus.textContent = '状态: 未知';
        onlineStatusSection.classList.remove('hidden');
        return;
    }
    
    try {
        const isOnline = presenceData.isOnline;
        const statusText = isOnline ? '在线' : '离线';
        
        userStatus.textContent = `状态: ${statusText}`;
        
        // 更新在线好友列表
        if (presenceData.friends && presenceData.friends.length > 0) {
            const onlineFriendsList = presenceData.friends.filter(friend => friend.isOnline);
            onlineFriends.textContent = `在线好友: ${onlineFriendsList.length}`;
        } else {
            onlineFriends.textContent = '在线好友: 0';
        }
        
        onlineStatusSection.classList.remove('hidden');
    } catch (error) {
        console.error('显示用户状态失败:', error);
        userStatus.textContent = '状态: 未知';
        onlineStatusSection.classList.remove('hidden');
    }
}

// 获取用户公会信息，带加载状态
async function getUserGroups(membershipType, membershipId, accessToken) {
    try {
        const response = await fetchBungieApi(
            `/GroupV2/User/${membershipType}/${membershipId}/0/1/`,
            accessToken,
            '正在获取公会信息...'
        );
        return response;
    } catch (error) {
        console.error('获取用户公会信息失败:', error);
        // 只记录错误，不显示加载状态，因为在并行加载中
        return null;
    }
}

// 显示公会信息
function displayGroupInfo(groupData) {
    if (!groupData || !groupData.groups || groupData.groups.length === 0) {
        clanName.textContent = '未加入公会';
        clanMembers.textContent = '';
        clanDescription.textContent = '';
        clanSection.classList.remove('hidden');
        return;
    }
    
    try {
        const primaryGroup = groupData.groups[0];
        clanName.textContent = `公会: ${primaryGroup.name}`;
        clanMembers.textContent = `成员数量: ${primaryGroup.memberCount}`;
        clanDescription.textContent = primaryGroup.about || '无公会描述';
        clanSection.classList.remove('hidden');
    } catch (error) {
        console.error('显示公会信息失败:', error);
        clanName.textContent = '公会信息加载失败';
        clanMembers.textContent = '';
        clanDescription.textContent = '';
        clanSection.classList.remove('hidden');
    }
}

// 获取用户Raid数据，带加载状态
async function getUserRaidData(membershipType, membershipId, accessToken) {
    try {
        // 获取角色信息
        const profileResponse = await fetchBungieApi(
            `/Destiny2/${membershipType}/Profile/${membershipId}/?components=100`,
            accessToken,
            '正在获取角色信息...'
        );
        
        // 检查是否有角色数据
        if (!profileResponse.characters || !profileResponse.characters.data) {
            return { activities: [] };
        }
        
        const characterIds = Object.keys(profileResponse.characters.data);
        const raidActivities = [];
        
        // 如果没有角色，直接返回
        if (characterIds.length === 0) {
            return { activities: [] };
        }
        
        // 遍历角色获取Raid活动数据
        for (const characterId of characterIds) {
            try {
                // 更新加载状态，显示当前处理的角色
                showLoading(`正在获取角色${characterIds.indexOf(characterId) + 1}/${characterIds.length}的Raid数据...`);
                
                const activitiesResponse = await fetchBungieApi(
                    `/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?mode=4&count=25`,
                    accessToken
                );
                
                if (activitiesResponse.activities) {
                    // 筛选Raid活动
                    const completedRaids = activitiesResponse.activities
                        .filter(activity => 
                            activity.values && 
                            activity.values.completed && 
                            activity.values.completed.basic && 
                            activity.values.completed.basic.value === 1
                        );
                    
                    raidActivities.push(...completedRaids);
                }
            } catch (error) {
                console.error(`获取角色${characterId}的Raid数据失败:`, error);
                // 继续处理其他角色
            }
        }
        
        hideLoading(); // 确保隐藏加载状态
        return { activities: raidActivities };
    } catch (error) {
        console.error('获取Raid数据失败:', error);
        hideLoading(); // 确保隐藏加载状态
        return { activities: [] };
    }
}

// 显示Raid数据
function displayRaidData(raidData) {
    if (!raidData || !raidData.activities || raidData.activities.length === 0) {
        raidCompletions.textContent = '暂无Raid完成记录';
        raidDataSection.classList.remove('hidden');
        return;
    }
    
    try {
        // 计算完成次数
        const completionCount = raidData.activities.length;
        raidCompletions.textContent = `Raid完成次数: ${completionCount}`;
        
        // 可以在这里添加更详细的Raid数据显示逻辑
        raidDataSection.classList.remove('hidden');
    } catch (error) {
        console.error('显示Raid数据失败:', error);
        raidCompletions.textContent = 'Raid数据加载失败';
        raidDataSection.classList.remove('hidden');
    }
}

// 加载额外数据，统一管理加载状态
async function loadAdditionalData(membershipType, membershipId, accessToken) {
    try {
        showLoading('正在加载额外数据...');
        
        // 为每个请求创建Promise，添加独立的错误处理
        const presencePromise = getUserPresence(membershipType, membershipId, accessToken)
            .catch(error => {
                console.error('加载在线状态失败:', error);
                return null;
            });
        
        const groupPromise = getUserGroups(membershipType, membershipId, accessToken)
            .catch(error => {
                console.error('加载公会信息失败:', error);
                return null;
            });
        
        const raidPromise = getUserRaidData(membershipType, membershipId, accessToken)
            .catch(error => {
                console.error('加载Raid数据失败:', error);
                return { activities: [] };
            });
        
        // 并行加载所有额外数据
        const [presenceData, groupData, raidData] = await Promise.allSettled([
            presencePromise,
            groupPromise,
            raidPromise
        ]);
        
        // 提取结果
        const presenceResult = presenceData.status === 'fulfilled' ? presenceData.value : null;
        const groupResult = groupData.status === 'fulfilled' ? groupData.value : null;
        const raidResult = raidData.status === 'fulfilled' ? raidData.value : { activities: [] };
        
        // 显示所有数据
        displayUserPresence(presenceResult);
        displayGroupInfo(groupResult);
        displayRaidData(raidResult);
        
        // 检查是否有失败的请求
        const failedRequests = [presenceData, groupData, raidData].filter(p => p.status === 'rejected');
        if (failedRequests.length > 0) {
            showNotification(`部分数据可能未完全加载，但不影响主要功能`);
        }
        
    } catch (error) {
        console.error('加载额外数据时出错:', error);
        showError(`部分数据加载失败: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// 加载用户数据，增强错误处理和状态管理
async function loadUserData(accessToken) {
    // 验证访问令牌
    if (!accessToken) {
        showError('无效的访问令牌');
        return;
    }
    
    showLoading('正在加载用户信息...');
    
    try {
        // 获取当前用户的会员信息
        const membershipData = await getUserMembership(accessToken, '正在验证用户身份...');
        
        // 验证返回的数据结构
        if (!membershipData) {
            throw new Error('未收到有效数据');
        }
        
        // 找到主要的会员信息（优先选择Steam或其他主要平台）
        let primaryMembership = null;
        
        // 先检查是否有跨平台会员信息
        if (membershipData.bungieNetUser && membershipData.bungieNetUser.membershipId) {
            primaryMembership = {
                membershipType: 254, // Bungie.net平台类型
                membershipId: membershipData.bungieNetUser.membershipId,
                displayName: membershipData.bungieNetUser.displayName
            };
        }
        
        // 如果没有，则从linkedProfiles中找一个
        if (!primaryMembership && membershipData.linkedProfiles && membershipData.linkedProfiles.length > 0) {
            // 优先选择Steam平台(3)，如果没有则选择第一个
            const steamProfile = membershipData.linkedProfiles.find(p => p.membershipType === 3);
            primaryMembership = steamProfile || membershipData.linkedProfiles[0];
        }
        
        if (!primaryMembership) {
            throw new Error('未找到有效的会员信息');
        }
        
        // 获取用户详细信息
        let userInfo = null;
        try {
            showLoading('正在获取用户详细信息...');
            userInfo = await getUserInfo(primaryMembership.membershipType, primaryMembership.membershipId, accessToken);
        } catch (error) {
            console.warn('获取用户详细信息失败，将使用基本会员信息', error);
            // 继续执行，不中断流程
        }
        
        // 显示用户信息
        userName.textContent = primaryMembership.displayName || '未知用户';
        userMembershipId.textContent = `会员ID: ${primaryMembership.membershipId}`;
        
        // 设置默认头像或使用API返回的头像
        try {
            if (userInfo && userInfo.profilePicturePath) {
                userAvatar.src = `https://www.bungie.net${userInfo.profilePicturePath}`;
            } else {
                userAvatar.src = 'https://www.bungie.net/img/platform/Triumphs/defaultAvatar.png';
            }
            userAvatar.alt = `${primaryMembership.displayName || '用户'}的头像`;
        } catch (error) {
            console.error('设置头像失败:', error);
            userAvatar.src = 'https://www.bungie.net/img/platform/Triumphs/defaultAvatar.png';
        }
        
        // 保存会员信息到localStorage以便后续使用
        try {
            localStorage.setItem('user_membership_type', primaryMembership.membershipType);
            localStorage.setItem('user_membership_id', primaryMembership.membershipId);
        } catch (error) {
            console.error('保存会员信息失败:', error);
            // 继续执行，不中断流程
        }
        
        // 显示用户信息区域，隐藏登录区域
        loginSection.classList.add('hidden');
        userInfoSection.classList.remove('hidden');
        
        showNotification('登录成功！正在加载您的数据...');
        
        // 加载额外数据
        loadAdditionalData(primaryMembership.membershipType, primaryMembership.membershipId, accessToken);
        
    } catch (error) {
        console.error('加载用户数据失败:', error);
        showError(`加载用户信息失败: ${error.message}`);
        
        // 清除可能错误的令牌
        localStorage.removeItem('bungie_access_token');
        
        // 显示登录区域，隐藏用户信息区域
        loginSection.classList.remove('hidden');
        userInfoSection.classList.add('hidden');
    } finally {
        hideLoading();
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);