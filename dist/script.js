const entries = {
  garden: {label:'SELECTED WORK / 示例项目',title:'灵感花园', paragraphs:['一个为想法留出空间的个人内容项目。灵感有时来自一本书、一段对话，或是在路上看见的一束光。把它们收集起来，让零散的念头慢慢长出联系。','这是一张示例作品卡片。你可以将它替换为真实项目的介绍、过程、成果与链接，让来访者更好地了解你的创作。']},
  slow: {label:'SELECTED WORK / 示例项目',title:'日常观察计划', paragraphs:['试着放慢脚步，观察生活里被忽略的细节：窗边变化的光线、走过许多次的小路、一杯热茶腾起的雾气。普通的一天，也有值得记录的瞬间。','这是一张示例作品卡片。这里可以展示你的摄影、设计、开发作品，或一个正在进行中的个人探索。']},
  begin: {label:'NOTES & THOUGHTS / 示例随笔',title:'先开始，再慢慢变好', paragraphs:['有些想法，停留在脑海里时总是很完美。可是一旦准备动手，就会发现还有许多没有想清楚的地方。','也许不必等到所有条件都刚刚好。先写下第一句话，画出第一张草图，完成最小的一步。开始之后，问题会变得具体，下一步也会更清楚。','把它当作一次尝试，允许自己边做边学。今天完成一点，就已经很好。']},
  daily: {label:'NOTES & THOUGHTS / 示例随笔',title:'在普通的一天，发现一点新鲜', paragraphs:['同一条路，换一个时间走，可能就会看到不一样的风景。路口的树换了颜色，熟悉的店门口多了一盆植物，阳光落在墙面上画出新的形状。','不一定要去很远的地方，才能遇见新鲜事。给自己一点时间，收起手机，看看眼前。也许值得记住的瞬间，就藏在普通的一天里。']},
  space: {label:'NOTES & THOUGHTS / 示例随笔',title:'给生活留一点空白', paragraphs:['不是每一个空闲的时刻，都需要被安排。偶尔什么也不做，喝杯水，看一会儿窗外，让思绪自由地走一走。','留白也是生活的一部分。那些没有被日程表填满的时间，可以用来消化经历、重新整理想法，或只是好好休息。']},
  contact: {label:'SAY HELLO',title:'期待与你的下一次对话', paragraphs:['这里将放置你的联系方式。提供邮箱、微信或社交主页后，就可以把这个入口设置为直接联系你。','当前尚未配置真实联系方式。姓名、个人介绍与示例作品，也可以一起替换成属于你的内容。']}
};
const dialog = document.querySelector('#detail-dialog');
function showDetail(key) {
  const entry = entries[key];
  if (!entry) return;
  document.querySelector('#dialog-label').textContent = entry.label;
  document.querySelector('#dialog-title').textContent = entry.title;
  const body = document.querySelector('#dialog-body');
  body.replaceChildren(...entry.paragraphs.map(text => {const p = document.createElement('p');p.textContent = text;return p;}));
  dialog.showModal();
}
document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => showDetail(button.dataset.detail)));
document.querySelector('#contact-button').addEventListener('click', () => showDetail('contact'));
document.querySelectorAll('.close-dialog,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {if(event.target === dialog){const rect = dialog.getBoundingClientRect();if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)dialog.close();}});
