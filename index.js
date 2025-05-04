const container = document.getElementsByClassName('scroll')[0];
const div2 = document.querySelector('.check-container');

function scrollDiv() {
  div2.style.display = 'flex'; /* Make the second div visible */
  container.style.transform = 'translateX(-100vw)'; /* Slide the container to the left */
}
