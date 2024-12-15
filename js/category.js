document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
// Get the category to filter by
const category = button.getAttribute('data-category');

// Filter the items based on the category
document.querySelectorAll('.custom-store-item').forEach(item => {
    item.style.display = (category === 'all' || item.getAttribute('data-category') === category) ? '' : 'none';
});

// Remove the 'active' class from all buttons
document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

// Add the 'active' class to the clicked button
button.classList.add('active');
});
});