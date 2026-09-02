const ratingButtons = document.querySelectorAll('#rating button');
let selectedRating = null;

ratingButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    ratingButtons.forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    selectedRating = this.textContent;
  });
});

document.querySelector('.submit').addEventListener('click', function() {
  if (selectedRating) {
    document.querySelector('.card').style.display = 'none';
    document.querySelector('.note').style.display = 'flex';
    document.getElementById('selected-rating').textContent = selectedRating;
  } else {
    alert('Please select a rating!');
  }
});