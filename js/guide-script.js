window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const buttons = document.querySelectorAll('button');

  // 顯示容器
  container.classList.add('show');

  // 按鈕依序浮現動畫
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add('show');
    }, 400 + index * 200);
  });
});
