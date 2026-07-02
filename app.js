// A8工作台 - 交互逻辑

// 模块切换
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const moduleContents = document.querySelectorAll('.module-content');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetModule = this.dataset.module;
            
            // 更新导航激活状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容区显示
            moduleContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetModule).classList.add('active');
        });
    });

    // 初始化数据
    initDashboard();
    initProjects();
    initReviews();
});

// 初始化任务看板
function initDashboard() {
    // 从本地数据加载任务
    loadTasks();
}

// 加载任务列表
function loadTasks() {
    // 模拟任务数据（实际从文件读取）
    const tasks = [
        {
            id: 1,
            name: 'A股持仓追踪',
            schedule: '周二-四 14:10',
            status: 'active',
            lastExec: '2026-07-01',
            script: 'stock_tracker.py'
        },
        {
            id: 2,
            name: '基金操作追踪',
            schedule: '工作日 14:30',
            status: 'active',
            lastExec: '2026-07-01',
            script: ''
        },
        {
            id: 3,
            name: '搏蔓GEO进度看板',
            schedule: '每日 23:00',
            status: 'active',
            lastExec: '2026-07-01',
            script: ''
        },
        {
            id: 4,
            name: '剪头发提醒',
            schedule: '每15天 09:00',
            status: 'active',
            lastExec: '2026-06-17',
            script: ''
        },
        {
            id: 5,
            name: '周报生成',
            schedule: '每周五 16:00',
            status: 'active',
            lastExec: '2026-06-27',
            script: ''
        },
        {
            id: 6,
            name: '记忆整理',
            schedule: '每周日 09:00',
            status: 'active',
            lastExec: '2026-06-22',
            script: ''
        },
        {
            id: 7,
            name: 'GEO话题追踪',
            schedule: '每周日 09:00',
            status: 'active',
            lastExec: '2026-06-29',
            script: ''
        }
    ];

    renderTasks(tasks);
    updateTaskStats(tasks);
}

// 渲染任务列表
function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">暂无任务</div>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-info">
                <div class="task-name">${task.name}</div>
                <div class="task-meta">
                    ${task.schedule} · 最近执行: ${task.lastExec}
                    ${task.script ? ` · 脚本: ${task.script}` : ''}
                </div>
            </div>
            <div class="task-status">
                <span class="status-badge ${task.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${task.status === 'active' ? '启用中' : '已停用'}
                </span>
                <div class="toggle-switch ${task.status === 'active' ? 'active' : ''}" 
                     onclick="toggleTask(${task.id})"></div>
            </div>
        </div>
    `).join('');
}

// 更新任务统计
function updateTaskStats(tasks) {
    const activeCount = tasks.filter(t => t.status === 'active').length;
    const inactiveCount = tasks.filter(t => t.status === 'inactive').length;
    
    document.getElementById('active-count').textContent = activeCount;
    document.getElementById('inactive-count').textContent = inactiveCount;
    document.getElementById('total-tasks').textContent = tasks.length;
}

// 切换任务状态
function toggleTask(taskId) {
    // 这里需要调用后端API同步状态
    console.log('切换任务状态:', taskId);
    // 实际实现：调用Calendar API更新日程状态
}

// 刷新任务
function refreshTasks() {
    console.log('刷新任务列表');
    loadTasks();
}

// 初始化项目列表
function initProjects() {
    const projects = [
        {
            id: 1,
            name: '搏蔓GEO项目',
            desc: 'GEO优化后台系统开发，包含运营后台、客户端Dashboard、探针调度引擎等模块',
            progress: 59,
            status: '进行中'
        },
        {
            id: 2,
            name: 'AI翻车实录自媒体',
            desc: '自媒体内容创作，聊天截图+AI配音形式，职场效率+产品工作方向',
            progress: 15,
            status: '进行中'
        }
    ];

    renderProjects(projects);
}

// 渲染项目列表
function renderProjects(projects) {
    const projectList = document.getElementById('project-list');
    
    projectList.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProject(${project.id})">
            <div class="project-name">${project.name}</div>
            <div class="project-desc">${project.desc}</div>
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <span class="progress-text">${project.progress}%</span>
            </div>
        </div>
    `).join('');
}

// 打开项目详情
function openProject(projectId) {
    console.log('打开项目:', projectId);
    // 跳转到项目子工作台
}

// 初始化复盘记录
function initReviews() {
    const reviews = [
        {
            id: 1,
            title: '称呼错误 - "老胥"',
            date: '2026-07-01',
            status: 'completed',
            summary: '错误使用姓氏作为称呼，应以日常使用称呼为准'
        },
        {
            id: 2,
            title: '搏蔓项目交付延期',
            date: '2026-07-01',
            status: 'pending',
            summary: '未按demo执行，未主动汇报进度，交付物质量不达标'
        }
    ];

    renderReviews(reviews);
    updateReviewStats(reviews);
}

// 渲染复盘记录
function renderReviews(reviews) {
    const reviewList = document.getElementById('review-list');
    
    if (reviews.length === 0) {
        reviewList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text">暂无复盘记录</div>
            </div>
        `;
        return;
    }

    reviewList.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-title">${review.title}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <span class="review-status ${review.status}">
                ${review.status === 'pending' ? '待复盘' : '已确认'}
            </span>
            <div class="review-summary">${review.summary}</div>
        </div>
    `).join('');
}

// 更新复盘统计
function updateReviewStats(reviews) {
    const pendingCount = reviews.filter(r => r.status === 'pending').length;
    const completedCount = reviews.filter(r => r.status === 'completed').length;
    
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('completed-count').textContent = completedCount;
}
