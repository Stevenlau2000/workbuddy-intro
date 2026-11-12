/* WorkBuddy 介绍站 · 二级页公共脚本
   仅本机交互：数据渲染、勾选进度、需求清单生成与复制。不发起任何网络请求。 */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- 通用：移动导航 ---------- */
  const burger = $('#burger'), navLinks = $('#navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  /* ---------- 通用：复制文本（带降级） ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  /* ---------- 新手指南：12 步 ---------- */
  const GUIDE_STEPS = [
    ['打开官网，下载按设备自动匹配的安装包', '客户端能正常启动'],
    ['按企业配置登录（微信 / 手机号 / 邮箱 / 单点登录等，以管理员设置为准）', '进入主界面'],
    ['确认账号可正常发起任务', '能新建一条任务'],
    ['设置 → 开启自定义指令，写入你的工作规矩', '复杂任务不再被理解歪'],
    ['设置 → 开启生成对话记忆', '隔天重提旧话题能接上'],
    ['助理设置 → 调整上下文管理（以当前客户端可选项为准）', '长对话不被中途截断'],
    ['设置 → 开启记忆与进化', '写作 / 做事偏好可沉淀'],
    ['选一个场景（日常办公 / 代码开发 / 设计创意）', '场景下的技能列表可见'],
    ['打开一个技能，复制它的提示词模板，只改与自己需求相关的字段', '得到一条可提交的指令'],
    ['模式选计划，提交真实任务 → 看步骤 → 改方案 → 确认后执行', '先出计划，后出成果'],
    ['把成果归档到工作空间 / 项目', '下次能直接找到'],
    ['重复执行的任务交给定时任务', '到点自动跑，无需人工触发']
  ];
  const guideSteps = $('#gSteps');
  if (guideSteps) {
    guideSteps.innerHTML = GUIDE_STEPS.map((s, i) => `
      <div class="g-step${i === 9 ? ' is-key' : ''}">
        <span class="gn">${String(i + 1).padStart(2, '0')}</span>
        <div class="ga"><b>${esc(s[0])}</b></div>
        <div class="gv"><span>验收</span>${esc(s[1])}</div>
        ${i === 9 ? '<span class="gkey">关键一步</span>' : ''}
      </div>`).join('');
  }

  /* ---------- 新手指南：界面速查 ---------- */
  const GUIDE_UI = [
    ['主界面 · 场景', '日常办公 / 代码开发 / 设计创意', '不知道从哪下手时，先选场景'],
    ['主界面 · 技能', '技能 + 提示词模板 + 技能商店', '不想自己写指令时'],
    ['主界面 · 专家', '预配置好的 Agent', '整块交付（如做一个小程序 / 一份报告）'],
    ['对话框「+」· 文件', '本地上传 + 云端资料', '资料不用下载再上传'],
    ['对话框「+」· 模式', '计划 / 仅问答', '复杂任务用计划，想清楚再派活'],
    ['对话框「+」· 连接器', '把常用系统接进来', '不想来回切软件'],
    ['对话框右侧', '模型版本与强度', '按任务难度选，以控制台实时列表为准'],
    ['左栏 · 助理', '在微信 / 飞书 / 钉钉 / QQ 里继续派活', '人不在电脑前'],
    ['左栏 · 项目', '项目模板 + 指令模板', '团队复用同一套干法'],
    ['左栏 · 定时任务', '到点自动执行', '每日资讯、定期分析'],
    ['左栏 · 资料库', '放资料', '把常用材料集中在一处'],
    ['设置 · 工作空间', '项目文件夹', '按类型归档']
  ];
  const gUi = $('#gUi');
  if (gUi) {
    gUi.innerHTML = GUIDE_UI.map(u => `
      <div class="g-ui-item"><span class="gu-pos">${esc(u[0])}</span><b>${esc(u[1])}</b><small>${esc(u[2])}</small></div>`).join('');
  }

  /* ---------- 新手指南：验收勾选 + 本机进度 ---------- */
  const checks = $$('[data-check]');
  if (checks.length) {
    const KEY = 'wb-guide-checks-v1';
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { saved = []; }
    const bar = $('#gProgressBar'), txt = $('#gProgressTxt');
    const render = () => {
      const n = checks.filter(c => c.checked).length;
      if (txt) txt.textContent = `${n} / ${checks.length} 项已完成${n === checks.length ? ' · 上手达标 ✓' : ''}`;
      if (bar) bar.style.width = (n / checks.length * 100) + '%';
      checks.forEach(c => c.closest('.chk').classList.toggle('done', c.checked));
    };
    checks.forEach((c, i) => {
      c.checked = !!saved[i];
      c.addEventListener('change', () => {
        const state = checks.map(x => x.checked);
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 隐私模式下忽略 */ }
        render();
      });
    });
    render();
    const reset = $('#gReset');
    if (reset) reset.addEventListener('click', () => {
      checks.forEach(c => { c.checked = false; });
      try { localStorage.removeItem(KEY); } catch (e) { /* noop */ }
      render();
    });
  }

  /* ---------- 新手指南：复制指令模板 ---------- */
  const copyPrompt = $('#copyPrompt');
  if (copyPrompt) {
    copyPrompt.addEventListener('click', () => {
      const text = $('#promptText') ? $('#promptText').textContent : '';
      copyText(text).then(() => { copyPrompt.textContent = '已复制 ✓'; setTimeout(() => copyPrompt.textContent = '复制模板', 1800); })
        .catch(() => { copyPrompt.textContent = '请手动选中复制'; setTimeout(() => copyPrompt.textContent = '复制模板', 2200); });
    });
  }

  /* ---------- 培训需求：四类常见诉求 ---------- */
  const TRAIN_MODULES = [
    ['认知与选型', '它是什么、适合解决哪类问题、边界在哪', '面向决策 / 管理者', 'c-blue'],
    ['0→1 上手实操', '首次配置、计划模式、指令模板、成果归档', '面向全员 / 一线', 'c-yellow'],
    ['岗位场景工作坊', '拿一件真实任务现场跑通并改写模板', '面向业务骨干', 'c-green'],
    ['管理员与合规', '账号权限、资料接入、日志与人工确认节点', '面向管理员 / IT', 'c-violet']
  ];
  const tModules = $('#tModules');
  if (tModules) {
    tModules.innerHTML = TRAIN_MODULES.map((m, i) => `
      <div class="g-card ${m[3]}"><span class="gc-no">0${i + 1}</span><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p><small>${esc(m[2])}</small></div>`).join('');
  }

  /* ---------- 陪跑需求：四件套 ---------- */
  const COACH_FRAME = [
    ['复用既有系统', '不推倒重来；先看清现有系统、表格与资料放在哪，能接就接、不能接就明确人工搬运节点。'],
    ['可解释', '每一步拆到能说清「输入是什么、依据是什么、输出给谁」，过程可回溯。'],
    ['AI 辅助不替代人', '人定目标、人签结果；审批、对外口径与合规判断保留人工确认。'],
    ['边界合规前置', '数据范围、权限、留痕与禁止做法在动手前写清，不事后补。']
  ];
  const cFrame = $('#cFrame');
  if (cFrame) {
    cFrame.innerHTML = COACH_FRAME.map((f, i) => `
      <div class="g-frame-item"><span>0${i + 1}</span><div><b>${esc(f[0])}</b><p>${esc(f[1])}</p></div></div>`).join('');
  }

  /* ---------- 陪跑需求：四步共创 ---------- */
  const COACH_STEPS = [
    ['现场流程拆解', '跟随业务人员处理真实事务，把一条流程逐点拆开，记录输入、判断、输出与异常', '流程拆解表 + 高频事务清单', '业务方确认「拆得对」'],
    ['场景盘点与排序', '按高频、重复、可 AI 化、痛点强度盘点，选出 Top 3 可立即立项', 'Top 3 立项清单（含现状与预期）', '三条都有真实事务与责任人'],
    ['样板任务搭建', '选 1 条做样板：写清目标 / 背景 / 约束 / 确认 / 验收，先出计划再执行', '1 个可复用样板任务 + 归档交付物', '在真实数据上跑通并被业务方签收'],
    ['复盘与模板沉淀', '把跑通的做法收成模板与 SOP，明确推广范围与不适用场景', '模板包 + 推广清单 + 边界说明', '换个人照着做也能得到同样结果']
  ];
  const cSteps = $('#cSteps');
  if (cSteps) {
    cSteps.innerHTML = COACH_STEPS.map((s, i) => `
      <div class="g-step"><span class="gn">${String(i + 1).padStart(2, '0')}</span>
        <div class="ga"><b>${esc(s[0])}</b><p>${esc(s[1])}</p></div>
        <div class="gv"><span>输出物</span>${esc(s[2])}</div>
        <div class="gv"><span>验收</span>${esc(s[3])}</div>
      </div>`).join('');
  }

  /* ---------- 通用：需求清单生成 / 复制 / 清空 ---------- */
  $$('[data-form]').forEach(form => {
    const kind = form.dataset.form === 'training' ? 'WorkBuddy 培训需求清单' : 'WorkBuddy 陪跑需求清单';
    const tip = form.querySelector('[data-copy-tip]');
    const out = form.querySelector('[data-form-out]');
    const fields = form.querySelectorAll('[data-name]');
    const groups = {};
    form.querySelectorAll('input[type="checkbox"][data-label]').forEach(cb => {
      if (!groups[cb.dataset.label]) groups[cb.dataset.label] = [];
      groups[cb.dataset.label].push(cb);
    });

    function build() {
      const lines = [`【${kind}】`, `填写日期：${new Date().toLocaleDateString('zh-CN')}`, ''];
      fields.forEach(f => {
        const v = (f.value || '').trim();
        lines.push(`${f.dataset.label || f.dataset.name}：${v || '（待补充）'}`);
      });
      Object.keys(groups).forEach(label => {
        const picked = groups[label].filter(c => c.checked).map(c => c.value);
        lines.push(`${label}：${picked.length ? picked.join('、') : '（待确认）'}`);
      });
      lines.push('', '备注：本清单由介绍页在本机生成，仅作首轮需求对齐输入；范围、排期与商务条件以双方确认的方案为准。');
      return lines.join('\n');
    }
    function flash(msg) {
      if (tip) { tip.textContent = msg; setTimeout(() => { tip.textContent = ''; }, 2600); }
    }
    const copyBtn = form.querySelector('[data-copy-form]');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      const text = build();
      if (out) { out.textContent = text; out.hidden = false; }
      copyText(text).then(() => flash('已复制 ✓ 粘贴给对接顾问即可'))
        .catch(() => flash('复制未成功，请手动选中下方文本'));
    });
    const clearBtn = form.querySelector('[data-clear-form]');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      form.querySelectorAll('input, textarea').forEach(el => {
        if (el.type === 'checkbox') el.checked = false; else el.value = '';
      });
      if (out) { out.textContent = ''; out.hidden = true; }
      flash('已清空');
    });
  });
})();
