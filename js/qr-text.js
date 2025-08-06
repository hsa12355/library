// 文字動畫
document.addEventListener('DOMContentLoaded', () => {
  const introLines = document.querySelectorAll('.intro-line');

  introLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('show');
    }, i * 700);
  });
});

// 輪播圖片
document.addEventListener("DOMContentLoaded", function () {
  const imgEl = document.getElementById("slideshow-image");
  const imgList = window.slideshowImages;

  if (imgEl && Array.isArray(imgList) && imgList.length > 1) {
    let index = 0;

    setInterval(() => {
      imgEl.classList.add("fade-out");

      setTimeout(() => {
        index = (index + 1) % imgList.length;
        imgEl.src = imgList[index];
        imgEl.classList.remove("fade-out");
      }, 600); // 對應 CSS transition: opacity 0.6s
    }, 3000);
  }
});
