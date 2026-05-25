const menuItems = [
  { text: 'Продолжить', action: 'continue' },
  { text: 'Новая игра', action: 'newgame' },
  { text: 'Загрузить', action: 'load' },
  { text: 'Настройки', action: 'options' },
  { text: 'Выход', action: 'exit' }
];

const state = {
  selected: 0
};

function initMenu() {
  const list = document.querySelector('.menu-list');
  menuItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.dataset.action = item.action;
    li.innerHTML = `<span>${item.text}</span>`;
    li.addEventListener('mouseenter', () => setSelection(index));
    li.addEventListener('click', () => selectItem(index));
    list.appendChild(li);
  });
  setSelection(state.selected);
  document.addEventListener('keydown', handleKeyboard);
}

function setSelection(index) {
  const items = document.querySelectorAll('.menu-item');
  state.selected = index;
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });
}

function handleKeyboard(event) {
  const items = document.querySelectorAll('.menu-item');
  if (event.key === 'ArrowDown') {
    state.selected = (state.selected + 1) % items.length;
    setSelection(state.selected);
    event.preventDefault();
  } else if (event.key === 'ArrowUp') {
    state.selected = (state.selected - 1 + items.length) % items.length;
    setSelection(state.selected);
    event.preventDefault();
  } else if (event.key === 'Enter') {
    selectItem(state.selected);
    event.preventDefault();
  }
}

function selectItem(index) {
  const item = menuItems[index];
  console.log(`Selected: ${item.text} (${item.action})`);
}

window.addEventListener('DOMContentLoaded', initMenu);
