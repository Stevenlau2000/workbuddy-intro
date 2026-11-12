/* WorkBuddy 介绍站 · 内容与交互（2026-11 二次更新） */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- 02 · 八项能力（配真实界面截图） ---------------- */
  const features = [
    { n: '01', t: '一句话派活，权限你说了算', d: 'Ask 只答不改文件、Plan 先出计划、Craft 放手直接干。', eg: '先问「标书怎么拆」，看完计划再让它执行。', img: 'assets/visuals/ui-01.jpg' },
    { n: '02', t: '交回来的是文件，不是一段话', d: 'Word、Excel、PPT、网页、看板都能直接产出。', eg: '一句话出 30 页投标书初稿，改动处标色。', img: 'assets/visuals/ui-02.jpg' },
    { n: '03', t: '给 AI 配装备：技能 Skills', d: '内置 20+ 技能包，也能导入或让它自己做一个。', eg: '装个票据技能，批量读发票出报销表。', img: 'assets/visuals/ui-03.jpg' },
    { n: '04', t: '接上公司原有的系统', d: '连接器像数据线：文档、邮箱、知识库、TAPD，每个都需主动授权。', eg: '邮箱收附件 → 整理成表 → 写回腾讯文档。', img: 'assets/visuals/ui-06.jpg' },
    { n: '05', t: '换个专业角色来干', d: '专家中心有 31 个专家团、213 位专家，复杂任务自动拆给多角色并行。', eg: '召唤「软件开发团」，交付一套完整原型。', img: 'assets/visuals/ui-07.jpg' },
    { n: '06', t: '人不在电脑前也能派活', d: '微信 / 企微 / 飞书 / 钉钉发一句指令，电脑上的 WorkBuddy 执行。', eg: '通勤路上发消息，到公司看执行记录。', img: 'assets/visuals/ui-08.jpg' },
    { n: '07', t: '到点自己干，结果自动送达', d: '重复、规则明确的活设成定时任务，结果自动送达邮箱或小程序。', eg: '每天 8:30 行业简报自动发到邮箱。', img: 'assets/visuals/ui-09.jpg' },
    { n: '08', t: '一个人做对，全公司照做', d: '资料库接进公司文件；做对一次存成模板，项目页共享上下文。', eg: '金牌项目经理的周报模板，全员复用。', img: 'assets/visuals/ui-10.jpg' }
  ];
  $('#featureGrid').innerHTML = features.map(f => `
    <article class="card reveal has-media">
      <button type="button" class="card-media" data-lightbox="${f.img}" data-cap="能力 ${f.n} · ${esc(f.t)}｜界面截图来自腾讯云渠道公开分享页，仅作示意">
        <img src="${f.img}" alt="${esc(f.t)} · 界面示意" loading="lazy"><span class="zoom">⊕</span>
      </button>
      <div class="card-body">
        <div class="num">CAPABILITY ${f.n}</div>
        <h3>${esc(f.t)}</h3>
        <p>${esc(f.d)}</p>
        <div class="eg"><b>举个例　</b>${esc(f.eg)}</div>
      </div>
    </article>`).join('');

  /* ---------------- 03 · 场景库（2026-11-09 资产口径） ---------------- */
  const sceneGroups = [
    { key: 'role', label: '岗位场景（精选 6 / 147）', items: [
      ['市场 · LD-01', '留资线索清洗与分级', '测试号、空号、同行先剔掉。'],
      ['市场 · CT-01', '广告法极限词发布前自查', '发出去之前把不该有的词捞出来。'],
      ['销售售前 · BD-03', '投标废标体检', '格式、盖章、资格项逐条过一遍。'],
      ['供应链采购 · IC-01', 'BOM 脏数据清洗', '一物多码先对齐，再算价。'],
      ['法务 · DL-04', '催款函草稿', '有据、有格式、有分寸。'],
      ['HR · ER-01', '劳动合同到期预警', '别等有人来问才发现过期。']
    ]},
    { key: 'industry', label: '行业场景（精选 6 / 427）', items: [
      ['04 消费与零售 · ST-01', '门店经营日报', '晨会前不用再手工拼几个系统。'],
      ['04 消费与零售 · BB-02', '评论里捞卖点', '几十万条评论里找真正行得通的。'],
      ['07 医疗与健康 · PH-02', '慢病会员复购提醒', '28 天一盒，第 25 天该有人记得。'],
      ['08 教育与科研 · AA-01', '教研知识库沉淀', '老师可以走，课和经验要留下。'],
      ['11 政务与公共事业 · ZK-01', '综窗「一口清」问答', '上千事项，问一句给一条带出处的口径。'],
      ['01 制造与工业 · YE-01', 'CP/FT 良率日报', '与历史基线对比，异常当天点名。']
    ]}
  ];
  $('#sceneTabs').innerHTML = sceneGroups.map((g, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-stab="${g.key}">${g.label}</button>`).join('');
  function renderScenes(key) {
    const g = sceneGroups.find(x => x.key === key) || sceneGroups[0];
    $('#sceneGrid').innerHTML = g.items.map(([code, name, hint]) => `
      <div class="scene-card">
        <div class="sc-top"><span class="sc-code">${esc(code)}</span><span class="sc-tag">${g.key === 'role' ? '岗位库' : '行业库'}</span></div>
        <h4>${esc(name)}</h4>
        <p>${esc(hint)}</p>
      </div>`).join('');
  }
  renderScenes('role');

  /* ---------------- 04 · 行业覆盖与客户案例 ---------------- */
  const coverage = [
    ['01 制造与工业', 39], ['02 信息技术与互联网', 50], ['03 数字内容与创意', 46],
    ['04 消费与零售', 57], ['05 金融', 33], ['07 医疗与健康', 38],
    ['08 教育与科研', 22], ['09 能源与公用事业', 56], ['10 交通物流与出行', 24],
    ['11 政务与公共事业', 38], ['12 建筑文旅与农业', 24]
  ];
  $('#coverageGrid').innerHTML = coverage.map(([n, c]) => `
    <div class="cov-item">
      <div class="cov-name">${esc(n)}</div>
      <div class="cov-bar"><i style="width:${Math.round(c / 57 * 100)}%"></i></div>
      <div class="cov-n">${c}</div>
    </div>`).join('');

  const customers = [
    {
      tag: '专业服务 · CRM 营销咨询', name: '某咨询（上海）有限公司',
      pain: '30+ 顾问同时跟 5–8 个项目，资深顾问约 60% 时间花在找资料、写初稿；方法论只在少数人脑子里。',
      did: '搭四类场景：行业知识中枢、客户提案秒生成、数据洞察自动化、全员 AI 协同。',
      result: '原文未给出效率前后对比数字',
      resultNote: '本站不补写「提效 X%」——没有出处的数字不进客户材料。',
      src: '原文自述、客户匿名；配图为示意插画，非系统截图。',
      img: 'assets/customers/w01.jpg', imgTag: '原文配图 · 示意'
    },
    {
      tag: '连锁餐饮 · 近千家门店', name: '包道集团（广式点心连锁）',
      pain: '单店周复盘要 2–3 小时；跨店汇总慢、异常归因凭经验、整改口头传达没闭环。',
      did: '建了周复盘、集团营收看板、合同智能体「法合智审」、常态闭环机制，企微机器人主动推送。',
      result: '单店周复盘 2–3 小时 → 30 秒',
      resultNote: '另有：统计工时 −80%+、合同初审数小时 → 3 分钟。',
      src: '受访企业提供，未见第三方核验；原文声明不代表通用效果、不构成效果承诺。',
      img: 'assets/customers/w02.jpg', imgTag: '真实系统截图'
    },
    {
      tag: '教育 · 深圳 6 所中小学', name: 'AI 先锋教师沙龙（6 位一线教师）',
      pain: '现成工作台不合用、评分口径不一；改一处课件要整页重生成，教研成果随人走。',
      did: '自建 Skill 与工作台：作文语料库、错题档案、批改工作台、知识图谱、3D 数字展厅。',
      result: '68 天沉淀 23 个可复用 Skill',
      resultNote: '另有：1797 篇习作 / 80+ 万字语料；海报 20 分钟 → 2 分钟为单个教师场景。',
      src: '教师自述，未见第三方核验，不代表产品通用效果。',
      img: 'assets/customers/w03.jpg', imgTag: '真实系统截图'
    },
    {
      tag: '公益 · 3 家机构', name: '悦尔公益基金会 / 潍坊爱心义工 / 成都美源',
      pain: '12 站测评人工整理要 2–3 周；500 户走访靠人算车程要一整天；一人多岗来回切身份。',
      did: '搭三套系统：无障碍测评数据平台、走访路线管理、活动资料归档，连腾讯位置服务。',
      result: '7 个人、一周多、上线一套系统',
      resultNote: '另有：40 座高铁站 / 232 名志愿者 / 累计测评 446；路线规划 1 天 → 1 小时内。',
      src: '机构自述，无第三方核验；原文未附免责声明，本站补注；配图已脱敏。',
      img: 'assets/customers/w04.jpg', imgTag: '已脱敏截图'
    }
  ];
  $('#customerGrid').innerHTML = customers.map(c => `
    <article class="customer-card">
      <div class="cc-img">
        <img src="${c.img}" alt="${esc(c.name)} · ${esc(c.imgTag)}" loading="lazy">
        <span class="cc-tag">${esc(c.imgTag)}</span>
      </div>
      <div class="cc-body">
        <div class="cc-k">${esc(c.tag)}</div>
        <h4>${esc(c.name)}</h4>
        <div class="cc-row"><b>原来卡在哪</b><p>${esc(c.pain)}</p></div>
        <div class="cc-row"><b>用它做了什么</b><p>${esc(c.did)}</p></div>
        <div class="cc-result"><b>${esc(c.result)}</b><span>${esc(c.resultNote)}</span></div>
        <div class="cc-src">${esc(c.src)}</div>
      </div>
    </article>`).join('');

  /* ---------------- 03 · 岗位地图 ---------------- */
  const roleGroups = [
    { key: 'growth', label: '经营增长', roles: [
      ['销售', '方案、报价、投标书；见客户前背景简报'],
      ['市场', '海报、短视频、推文；竞品动态周报'],
      ['电商 · 新零售', '商品文案；店铺日报；评价分析'],
      ['客服', '知识库答问；投诉归类；客诉归因'],
      ['总裁办', '汇周报、备会材、跟决议']
    ]},
    { key: 'delivery', label: '产品交付', roles: [
      ['研发', '写代码、查问题、补测试、整文档'],
      ['产品', '竞品调研、需求文档、原型说明'],
      ['项目管理', '排计划、盯进度、项目日报'],
      ['设计', '草图配图；按品牌规范批量改尺寸'],
      ['工程 · 质量', '施工日志、验收资料、规范初审']
    ]},
    { key: 'operation', label: '业务运营', roles: [
      ['采购 · 供应链', '连 ERP 查库存、比价、节点提醒'],
      ['物流 · 仓储', '跟发货、核运单、周转分析'],
      ['门店运营', '汇销售数据、巡店报告、店长日报'],
      ['行政 · 运营', '邮件摘要、会议纪要与待办'],
      ['IT · 流程', '接内外部系统、按时跑审批']
    ]},
    { key: 'control', label: '职能管控', roles: [
      ['财务', '拉数对账、经营分析、单据初审'],
      ['人事', 'JD、简历初筛、制度问答'],
      ['法务', '合同初审、条款比对、法规提醒'],
      ['审计 · 内控', '抽查凭证、疑点清单、底稿初稿'],
      ['培训', '课件、新人手册、考题与学习记录']
    ]}
  ];
  $('#roleTabs').innerHTML = roleGroups.map((g, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-rtab="${g.key}">${g.label}（${g.roles.length}）</button>`).join('');
  $('#rolePanels').innerHTML = roleGroups.map((g, i) => `
    <div class="tab-panel ${i === 0 ? 'active' : ''}" id="rpanel-${g.key}">
      <div class="roles">${g.roles.map((r, j) => `
        <div class="role">
          <div class="ic" style="color:var(--gold);font-size:12px;letter-spacing:.1em">${String(i * 5 + j + 1).padStart(2, '0')} / 20</div>
          <h4>${esc(r[0])}</h4><p>${esc(r[1])}</p>
        </div>`).join('')}</div>
    </div>`).join('');

  const funcs = [
    ['销售', '~90x', '客户方案、竞品分析、报价单'], ['市场', '~15x', '宣发物料、多平台分发'],
    ['采购', '~12x', '订单汇总、供应商比价'], ['仓储', '~10x', '库存看板、安全库存'],
    ['交付', '~90x', '需求结构化、WBS 拆解'], ['客服', '~18x', 'FAQ 应答、反馈分类'],
    ['法务', '~10x', '合同审查、模板生成'], ['财务', '~30x', '发票 OCR、财报分析'],
    ['人力', '~20x', 'JD 与简历筛选'], ['行政', '数倍', '会议纪要、文件整理'],
    ['研发', '~8x', 'PRD、代码生成、测试用例'], ['IT', '~10x', '巡检、接口文档、告警'],
    ['经营', '~24x', '经营体检、多 Agent 评审']
  ];
  $('#funcGrid').innerHTML = funcs.map(f => `
    <div class="func"><div class="top"><h4>${esc(f[0])}</h4><span class="x">${f[1]}</span></div><p>${esc(f[2])}</p></div>`).join('');

  /* ---------------- 04 · 行业方案（图形化：窄图 + 三步短标签） ---------------- */
  const industries = [
    {
      tag: 'INDUSTRY 01', accent: '#4C8DFF', name: '制造 · 柔性制造 / 非标订单',
      pain: '非标报价全靠技术骨干，经验留不住，新人上手要两三个月。',
      steps: ['图纸 → 结构化清单', '报价流程可复用', '老工程师判断变成 Skill'],
      result: '非标售前报价工作量 −50%+', src: '《FDE 案例 100》NO.17；案例口径，非通用承诺。',
      img: 'assets/visuals/ui-01.jpg',
      video: 'assets/videos/demo-manufacture.mp4', vtitle: '制造业智能报价 · 场景演示', vlabel: '看演示：智能报价'
    },
    {
      tag: 'INDUSTRY 02', accent: '#F0786A', name: '连锁零售 · 餐饮 / 门店',
      pain: '门店周报靠手工翻系统，异常归因凭经验，整改没闭环。',
      steps: ['多店数据自动汇总', '下滑 / 差评逐条归因', '整改清单责任到人'],
      result: '单店周复盘 2–3 小时 → 30 秒', src: '包道集团公开分享卡；统计工时下压 80%+。',
      img: 'assets/visuals/ui-02.jpg',
      video: 'assets/videos/demo-retail.mp4', vtitle: '促销复盘自动报告 · 场景演示', vlabel: '看演示：促销复盘'
    },
    {
      tag: 'INDUSTRY 03', accent: '#C9A24B', name: '专业服务 · 咨询 / 招投标',
      pain: '标书、合同又多又厚；专家经验在少数人脑子里。',
      steps: ['单点先跑 MVP', '场景多了上统一平台', '工作过程萃取成 Skill'],
      result: '文件审核 2 小时 → 5 分钟', src: '某工程管理咨询公司案例；2000+ 页评审 1 周 → 10 分钟。',
      img: 'assets/visuals/ui-06.jpg',
      video: 'assets/videos/demo-faq.mp4', vtitle: '企业办公提效 · 8 个问题解答', vlabel: '看演示：企业办公'
    },
    {
      tag: 'INDUSTRY 04', accent: '#8B7CF6', name: '内容与媒体 · 电商 / 教育',
      pain: '日更、多平台分发、排版改尺寸全是重复活。',
      steps: ['一次排完一个月选题', '一键排版与多平台分发', '跑通的写法存成 Skill'],
      result: '68 天沉淀 23 个可复用 Skill', src: '深圳 AI 先锋教师沙龙；1797 篇习作、80 万+ 语料。',
      img: 'assets/visuals/ui-07.jpg',
      video: 'assets/videos/demo-media.mp4', vtitle: '新媒体运营工作台 · 场景演示', vlabel: '看演示：新媒体工作台'
    },
    {
      tag: 'INDUSTRY 05', accent: '#3FC6F0', name: '研发与 IT · 软件 / 集成',
      pain: '需求说不清、接口调试费时；文档总要等人补。',
      steps: ['口头需求 → PRD', '代码与测试一起生成', '从代码反推接口文档'],
      result: '需求拆解 1–2 天 → 1–2 小时', src: '腾讯云渠道案例；研发效率 +100%、重复编码 −90%。',
      img: 'assets/visuals/ui-09.jpg',
      video: 'assets/videos/demo-dev.mp4', vtitle: '小程序开发 · 从代码生成到文档反推', vlabel: '看演示：开发与文档'
    },
    {
      tag: 'INDUSTRY 06', accent: '#4ED8A0', name: '政企 · 强合规组织',
      pain: '数据不能出域、系统各自为政；用起来容易，管起来难。',
      steps: ['低风险场景做 MVP', '统一入口调度多模型', '按合规选部署与审计'],
      result: '财务流程 半月 → 1–2 天', src: '《FDE 案例 100》NO.09（央国企财务，落地 10 个场景）。',
      img: 'assets/visuals/ui-10.jpg',
      video: 'assets/videos/intro-full.mp4', vtitle: 'WorkBuddy 数字员工上岗 · 完整解说', vlabel: '看完整解说'
    }
  ];
  $('#industryGrid').innerHTML = industries.map(x => `
    <article class="ind reveal" style="--accent:${x.accent}">
      <button type="button" class="ind-img" data-lightbox="${x.img}" data-cap="${esc(x.name)}｜界面截图来自腾讯云渠道公开分享页，仅作示意">
        <img src="${x.img}" alt="${esc(x.name)} · 界面示意" loading="lazy"><span class="zoom">⊕</span>
      </button>
      <div class="tag"><i></i>${x.tag}</div>
      <h3>${esc(x.name)}</h3>
      <p class="pain"><b>常见痛点　</b>${esc(x.pain)}</p>
      <div class="ind-steps">${x.steps.map((s, i) => `<span><i>${i + 1}</i>${esc(s)}</span>`).join('<em>→</em>')}</div>
      <div class="result"><b>${esc(x.result)}</b><span>${esc(x.src)}</span></div>
      <div class="ind-foot">
        <button class="play-link" data-video="${x.video}" data-title="${esc(x.vtitle)}" data-desc="${esc(x.name)}"><span class="tri">▶</span>${esc(x.vlabel)}</button>
      </div>
    </article>`).join('');

  /* ---------------- 05 · 视频（12 段演示 + 12 段成片 + 12 张图库） ---------------- */
  const demos = [
    { cat: 'NEW · 教程', t: '三步生成一条广告片', d: '发素材 → 确认分镜 → 一句话出成片。', f: 'adgen', dur: '片段 40s' },
    { cat: 'NEW · 实操', t: '招标文书全流程', d: '五步流水线 + 四道防幻觉闸门；演示数据为脱敏虚构。', f: 'bid', dur: '片段 40s' },
    { cat: 'NEW · 生态', t: '实用 Skill 推荐', d: '官方「实用 Skill 推荐」第 13 期。', f: 'skill', dur: '片段 32s' },
    { cat: 'NEW · 产品', t: '套件化升级', d: '最短官方成片：企业版升级为智能体办公套件。', f: 'suite', dur: '片段 32s' },
    { cat: '制造 / 报价', t: '制造业智能报价', d: '从图纸与需求到报价单，非标订单被结构化。', f: 'manufacture', dur: '片段 26s' },
    { cat: '零售 / 复盘', t: '促销复盘自动报告', d: '促销数据自动汇总、归因，交回一份复盘报告。', f: 'retail', dur: '片段 26s' },
    { cat: '营销 / 投流', t: '短剧投流日报', d: '多平台投放数据回收，日报自动生成。', f: 'ad', dur: '片段 26s' },
    { cat: '内容 / 运营', t: '新媒体运营工作台', d: '选题、成稿、分发在一个工作台里跑完。', f: 'media', dur: '片段 26s' },
    { cat: '内容 / 排版', t: '公众号批量一键排版', d: '多篇稿件一次排版，重复操作交给它。', f: 'wechat', dur: '片段 26s' },
    { cat: '办公 / 写作', t: '人机双写', d: '人和 AI 在同一份文档里协作改稿。', f: 'writing', dur: '片段 26s' },
    { cat: '企业 / 问答', t: '企业办公提效 8 问', d: '采购前最常问的 8 个问题，一次答清。', f: 'faq', dur: '片段 26s' },
    { cat: '研发 / 文档', t: '从代码生成到文档反推', d: '小程序开发实战，代码写完文档也有了。', f: 'dev', dur: '片段 26s' }
  ];
  $('#demoGrid').innerHTML = demos.map(v => `
    <div class="vcard" data-video="assets/videos/demo-${v.f}.mp4" data-title="${esc(v.t)}" data-desc="${esc(v.d)}">
      <div class="cover"><img src="assets/posters/demo-${v.f}.jpg" alt="${esc(v.t)}" loading="lazy"><span class="p">▶</span><span class="dur">${v.dur}</span></div>
      <div class="info"><div class="cat">${esc(v.cat)}</div><h4>${esc(v.t)}</h4><p>${esc(v.d)}</p></div>
    </div>`).join('');

  const caseCats = [
    { k: 'all', label: '全部（12）' },
    { k: 'digital', label: '数字人 · 口播带货' },
    { k: 'live', label: '直播 · 电商促销' },
    { k: 'food', label: '美食 · 餐饮助农' },
    { k: 'beauty', label: '美妆 · 健康医美' },
    { k: 'fashion', label: '服饰 · 珠宝搭配' },
    { k: 'drama', label: '短剧 · 创意特效' }
  ];
  const cases = [
    ['digital', '08', '数字人口播 · 案例 08'], ['digital', '23', '数字人口播 · 案例 23'],
    ['live', '02', '电商促销 · 案例 02'], ['live', '14', '电商促销 · 案例 14'],
    ['food', '01', '餐饮助农 · 案例 01'], ['food', '38', '餐饮助农 · 案例 38'],
    ['beauty', '11', '美妆健康 · 案例 11'], ['beauty', '49', '美妆健康 · 案例 49'],
    ['fashion', '10', '服饰珠宝 · 案例 10'], ['fashion', '28', '服饰珠宝 · 案例 28'],
    ['drama', '07', '短剧特效 · 案例 07'], ['drama', '25', '短剧特效 · 案例 25']
  ];
  $('#caseFilters').innerHTML = caseCats.map((c, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-cfilter="${c.k}">${c.label}</button>`).join('');
  const caseLabel = k => (caseCats.find(c => c.k === k) || {}).label || k;
  function renderCases(filter) {
    const list = filter === 'all' ? cases : cases.filter(c => c[0] === filter);
    $('#caseGrid').innerHTML = list.map(([k, n, t]) => `
      <div class="case-card" data-video="assets/cases/${k}-${n}.mp4" data-title="${esc(t)}" data-desc="${esc(caseLabel(k))} · 零点引擎《零小剪》AI 内容创作引擎生成">
        <div class="cover">
          <img src="assets/posters/case-${k}-${n}.jpg" alt="${esc(t)}" loading="lazy">
          <span class="p">▶</span>
          <span class="lb">${esc(t)}<small>行业成片 · 点击播放</small></span>
        </div>
      </div>`).join('');
  }
  renderCases('all');

  const gallery = [
    ['assets/visuals/illus-1.jpg', '流程插画 ① 总览', '界面与流程示意'],
    ['assets/visuals/illus-2.jpg', '流程插画 ② 选题', '界面与流程示意'],
    ['assets/visuals/illus-3.jpg', '流程插画 ③ 创作', '界面与流程示意'],
    ['assets/visuals/illus-4.jpg', '流程插画 ④ 编排', '界面与流程示意'],
    ['assets/visuals/illus-5.jpg', '流程插画 ⑤ 工作台', '界面与流程示意'],
    ['assets/visuals/ui-01.jpg', '产品主界面', '真实界面截图'],
    ['assets/visuals/ui-02.jpg', '文档与应用编辑', '真实界面截图'],
    ['assets/visuals/ui-03.jpg', '技能与任务配置', '真实界面截图'],
    ['assets/visuals/ui-09.jpg', '企微协同界面', '真实界面截图'],
    ['assets/visuals/ui-10.jpg', '任务与成果面板', '真实界面截图'],
    ['assets/visuals/ui-06.jpg', '应用与任务弹窗', '真实界面截图'],
    ['assets/visuals/ui-08.jpg', '任务与待办面板', '真实界面截图']
  ];
  $('#galleryGrid').innerHTML = gallery.map(([src, title, kind]) => `
    <button type="button" class="gal-item" data-lightbox="${src}" data-cap="${esc(title)}｜${esc(kind)}｜来自腾讯云渠道公开分享页">
      <img src="${src}" alt="${esc(title)}" loading="lazy">
      <span class="gal-t"><b>${esc(title)}</b><i>${esc(kind)}</i></span><span class="zoom">⊕</span>
    </button>`).join('');

  /* ---------------- 07 · FAQ（长答案已压缩） ---------------- */
  const faqs = [
    ['跟 ChatGPT 这类聊天 AI 有什么不同？', '聊天 AI 给你一段答案，WorkBuddy 给你一份干完的活。它能在指定工作目录里读写文件、调用技能、连接公司系统，按目标拆步骤执行，交回文档、表格、PPT、网页。你不用一直盯着，也不用把结果复制来复制去。'],
    ['公司资料会不会传出去？安全吗？', '三层防护：Ask / Plan / Craft 权限模式决定它能动什么；运行沙箱与黑白名单隔离；入口拦截与熔断。企业版另有 SSO、组织架构、操作留痕、用量审计，支持 VPC 专享与私有化。敏感场景建议先小范围试点并做权限评审。'],
    ['员工不会用怎么办？要培训多久？', '界面就是「说一句话」。落地方式是：全员配上 → 交几件真活干出样板 → 全公司照着用。真正要练的是把目标说清楚，记住三要素：做什么、有什么材料、要什么样。'],
    ['要换掉现有的 ERP / OA / 文档系统吗？', '不用。系统继续管记录、跑流程；数字员工通过连接器与 MCP 连上它们，把系统干不了的活补上：读懂内容、做分析、处理流程外的例外、跨系统串活、交成果。这是叠加，不是替换。'],
    ['多少钱？怎么判断够不够用？', '个人版 0 / 99 / 199 / 999 元每月四档；企业版 198 元/人/月（SaaS，1 人起）、316 元/人/月（专有云，100 人起），按年即 2,376 / 3,792 元每人每年。账号费固定，Credit 按任务消耗；每席每月暂赠送 2,000 Credit、每月重置，不是永久额度也不是合同承诺值。别按积分算，按「件」算：全员真用一个月，用账单除以产出件数，再和外包、加急单价对比。下单前看腾讯云公示。'],
    ['一个人买和公司买，差别在哪？', '个人版是本机客户端、纯个人、无协作与管理后台。企业版多出团队共享积分池、多人多 Agent 协同、共享知识资产、SSO / 权限 / 审计 / 成本分析、企业自定义技能与专家、云端 7×24 自动化、专属客户成功与 SLA。判断标准只有一句：是否多人协作、是否要管理与合规。'],
    ['人不在电脑前还能用吗？', '可以。Claw 远程模式支持从微信 / 企微 / QQ / 飞书 / 钉钉发指令，由电脑上的 WorkBuddy 执行；微信小程序另有「云上模式」，不依赖电脑在线。注意电脑模式需要 PC 开机联网、未休眠，锁屏不影响。'],
    ['我们行业很特殊，能定制吗？', '三步：先改知识层（行业规范、模板、历史案例接进资料库），再改技能层（高频做法做成 Skill / 专家），最后改连接层（MCP 接自家业务系统）。跨行业复用的骨架高度通用，差异化主要在行业知识与合规护栏。'],
    ['页面上的效率和收益数字能直接引用吗？', '原则一句话：数字必有出处，出处必带口径，无口径不进客户材料。① 客户案例数字为原文自述 / 受访企业提供 / 教师自述 / 机构自述，未见第三方核验，不构成通用效果或效果承诺；② 产品实测百分比须写「产品口径企业级实测」；③ 场景库 574 / 147 / 427 是资产条数，不是客户数也不是效果，两套清单不可横比；④ 价格与配额是刊例快照，须注明「暂赠送、每月重置」并复核时效。原型、账单、看板截图数字均为示意。对外提案建议写明来源，并引导客户先跑一个月建立自己的基线。'],
    ['企业版升级成「智能体办公套件」，要加钱吗？赠送的 Credit 会一直有吗？', '不加钱。198 / 316 元每人每月不变，腾讯文档、腾讯网盘（50GB/席）、腾讯乐享、安全与效能运营平台、Ardot 随主品到账；存量订阅价格与到期时间不变，管理员确认更新后的服务协议即可免费升级。已单独购买文档或乐享付费版且仍在有效期内的，先退旧再升套件。2,000 Credit/席/月目前是「暂赠送、每月重置」，不是永久包含、不是保证额度，也不写进 SLA 或合同附件，以腾讯云官方最新公示为准。腾讯会议整包加购已移出内置，需另行加购。']
  ];
  $('#faqList').innerHTML = faqs.map((f, i) => `
    <div class="faq-item">
      <button class="faq-q"><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${esc(f[0])}</span><span class="plus">+</span></button>
      <div class="faq-a"><div>${esc(f[1])}</div></div>
    </div>`).join('');

  /* ---------------- 交互 ---------------- */
  $('#sceneTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-stab]'); if (!b) return;
    $$('#sceneTabs .tab').forEach(x => x.classList.toggle('active', x === b));
    renderScenes(b.dataset.stab);
  });
  $('#roleTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-rtab]'); if (!b) return;
    $$('#roleTabs .tab').forEach(x => x.classList.toggle('active', x === b));
    $$('#rolePanels .tab-panel').forEach(p => p.classList.toggle('active', p.id === 'rpanel-' + b.dataset.rtab));
  });
  $('#videoTabs').addEventListener('click', e => {
    const b = e.target.closest('[data-vtab]'); if (!b) return;
    $$('#videoTabs .tab').forEach(x => x.classList.toggle('active', x === b));
    $$('#videos .tab-panel').forEach(p => p.classList.toggle('active', p.id === 'vpanel-' + b.dataset.vtab));
  });
  $('#caseFilters').addEventListener('click', e => {
    const b = e.target.closest('[data-cfilter]'); if (!b) return;
    $$('#caseFilters .tab').forEach(x => x.classList.toggle('active', x === b));
    renderCases(b.dataset.cfilter);
  });
  $('#faqList').addEventListener('click', e => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement, wasOpen = item.classList.contains('open');
    $$('#faqList .faq-item').forEach(x => x.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });

  /* 三个弹窗共用一个滚动锁 */
  const modal = $('#videoModal'), video = $('#modalVideo');
  const pModal = $('#purchaseModal'), lb = $('#lightbox');
  function syncLock() {
    const anyOpen = modal.classList.contains('open') || pModal.classList.contains('open') || lb.classList.contains('open');
    document.body.style.overflow = anyOpen ? 'hidden' : '';
  }

  /* 视频弹窗 */
  function openVideo(el) {
    const src = el.dataset.video; if (!src) return;
    $('#modalTitle').textContent = el.dataset.title || '视频演示';
    $('#modalDesc').textContent = el.dataset.desc || '';
    video.src = src;
    video.setAttribute('playsinline', '');
    modal.classList.add('open');
    syncLock();
    const p = video.play(); if (p && p.catch) p.catch(() => {});
  }
  function closeVideo() {
    modal.classList.remove('open');
    video.pause(); video.removeAttribute('src'); video.load();
    syncLock();
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-video]');
    if (el) { e.preventDefault(); openVideo(el); }
  });
  $('#modalClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });

  /* 购买引导弹窗（06 · 怎么买） */
  function openPurchase() {
    if (modal.classList.contains('open')) closeVideo();
    pModal.classList.add('open');
    syncLock();
  }
  function closePurchase() {
    pModal.classList.remove('open');
    syncLock();
  }
  $$('[data-purchase]').forEach(b => b.addEventListener('click', openPurchase));
  $('#purchaseClose').addEventListener('click', closePurchase);
  pModal.addEventListener('click', e => { if (e.target === pModal) closePurchase(); });

  /* 采购指南胶囊 / 二级页回链：定位到 06「购买链接」并打开四步引导 */
  function goBuyGuide(e) {
    if (e) e.preventDefault();
    const t = $('#buyLink') || $('#buy');
    if (t) t.scrollIntoView({ behavior: 'auto', block: 'center' });
    openPurchase();
  }
  $$('[data-buy-guide]').forEach(el => el.addEventListener('click', goBuyGuide));
  if (location.hash === '#buy-guide') setTimeout(goBuyGuide, 150);

  /* 图片放大：按所在板块分组左右切换 */
  const lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let lbList = [], lbIndex = 0;
  function groupOf(el) {
    if (el.closest('.glance-pics')) return 'glance';
    if (el.closest('.story-pics')) return 'story';
    if (el.closest('.howto-steps')) return 'howto';
    if (el.closest('#galleryGrid')) return 'gallery';
    if (el.closest('#featureGrid')) return 'features';
    if (el.closest('#industryGrid')) return 'industries';
    return 'misc';
  }
  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    const el = lbList[lbIndex];
    lbImg.src = el.dataset.lightbox;
    lbImg.alt = el.dataset.cap || '图片';
    lbCap.textContent = el.dataset.cap || '';
  }
  function openLightbox(el) {
    const g = groupOf(el);
    lbList = $$('[data-lightbox]').filter(x => groupOf(x) === g);
    if (!lbList.length) lbList = [el];
    lb.classList.add('open');
    syncLock();
    showLb(lbList.indexOf(el));
  }
  function closeLightbox() {
    lb.classList.remove('open');
    syncLock();
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-lightbox]');
    if (el) { e.preventDefault(); openLightbox(el); }
  });
  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', () => showLb(lbIndex - 1));
  $('#lbNext').addEventListener('click', () => showLb(lbIndex + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-in')) closeLightbox(); });

  /* ESC 关闭当前弹窗 + 左右方向键切图 */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (lb.classList.contains('open')) closeLightbox();
      else if (pModal.classList.contains('open')) closePurchase();
      else if (modal.classList.contains('open')) closeVideo();
      return;
    }
    if (lb.classList.contains('open') && e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (lb.classList.contains('open') && e.key === 'ArrowRight') showLb(lbIndex + 1);
  });

  // 移动导航
  $('#burger').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

  // 滚动：淡入 / 导航高亮 / 返回顶部
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
  $$('#featureGrid .card, #industryGrid .ind').forEach(el => { el.classList.add('reveal'); io.observe(el); });

  const navLinks = $$('#navLinks a');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const toTop = $('#toTop');
  function onScroll() {
    const y = window.scrollY + 120;
    let active = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) active = s; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + (active && active.id)));
    toTop.classList.toggle('show', window.scrollY > 620);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
