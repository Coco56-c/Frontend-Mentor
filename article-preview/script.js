document.querySelectorAll('.share-icon').forEach(button => {
  button.addEventListener('click', () => {
    if (window.innerWidth <= 768) return;
    const shareBox = document.querySelector('.share');
    if (!shareBox) return;
    shareBox.classList.toggle('active');
    button.classList.toggle('active');
  });
});

function moveShareBubble() {
  const share = document.querySelector('.share');
  const shareIcon = document.querySelector('.share-icon');
  const container = document.querySelector('.container');

  if (!share || !shareIcon || !container) return;
  if (window.innerWidth > 768) {
    if (!share.closest('.share-icon')) {
      shareIcon.appendChild(share);
    }
  } else {

    if (share.parentElement === shareIcon) {
      container.parentNode.insertBefore(share, container.nextSibling);
      share.classList.add('mobile');
    }
  }
}


window.addEventListener('DOMContentLoaded', moveShareBubble);
window.addEventListener('resize', moveShareBubble);
