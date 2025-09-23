const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.icon');

    document.querySelectorAll('.accordion-content').forEach(c => {
      if (c !== content) {
        c.style.maxHeight = null;
        c.classList.remove('active');
        c.previousElementSibling.querySelector('.icon').src = "./images/icon-plus.svg";
      }
    });

    content.classList.toggle('active');
    if (content.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.src = "./images/icon-minus.svg";
    } else {
      content.style.maxHeight = null;
      icon.src = "./images/icon-plus.svg";
    }
  });
});

const firstContent = document.querySelector('.accordion-content');
const firstIcon = document.querySelector('.accordion-header .icon');

firstContent.classList.add('active');
firstContent.style.maxHeight = firstContent.scrollHeight + "px";
firstIcon.src = "./images/icon-minus.svg";
