import { TABLES, COLUMNS, state, createOrderData, updateDragging } from './data.js';
import { createOrderHtml, html, updateDraggingHtml, moveToColumn } from './view.js';

const handleDragOver = (event) => {
  event.preventDefault();
  const path = event.path || event.composedPath();              //.................Original code
  let column = null;

  for (const element of path) {
    const { area } = element.dataset;
    if (area) {
      column = area;
      break;
    }
  }

  if (!column) return;
  updateDragging({ over: column });
  updateDraggingHtml({ over: column });
};

const handleDragStart = (event) => {
  const orderId = event.target.dataset.id;
  updateDragging({ source: orderId });
};

const handleDragEnd = (event) => {
  updateDragging({ source: null });
};

const handleHelpToggle = (event) => {
  const helpOverlay = document.querySelector("[data-help-overlay]");
  const addOverlay = document.querySelector("[data-add-overlay]");
  const editOverlay = document.querySelector("[data-edit-overlay]");

  if (helpOverlay.style.display === "none") {
    helpOverlay.style.display = "block";
    helpOverlay.focus();
    if (addOverlay.style.display === "block") handleAddToggle();
    if (editOverlay.style.display === "block") handleEditToggle();
  } else {
    helpOverlay.style.display = "none";
    html.add.button.focus();
  }
};

const handleAddToggle = (event) => {
  const addOverlay = document.querySelector("[data-add-overlay]");
  const addForm = document.getElementById("add-form");

  if (addOverlay.style.display === "none") {
    addForm.reset();
    addOverlay.style.display = "block";
    addOverlay.focus();
  } else {
    addOverlay.style.display = "none";
    html.add.button.focus();
  }
};

const handleAddSubmit = (event) => {
  event.preventDefault();
  const titleInput = document.querySelector("[data-add-title]");
  const tableSelect = document.querySelector("[data-add-table]");

  const title = titleInput.value;
  const table = tableSelect.value;

  if (title && table) {
    const order = createOrderData({ title, table, column: "ordered" });
    addOrder(order);
    renderOrder(order);
    handleAddToggle();
  }
};

const handleEditToggle = (event) => {
  const editOverlay = document.querySelector("[data-edit-overlay]");
  const editForm = document.getElementById("edit-form");
  const orderId = event.target.closest(".order").dataset.id;

  const order = getOrder(orderId);
  if (order) {
    editForm.reset();
    editForm.elements.id.value = order.id;
    editForm.elements.title.value = order.title;
    editForm.elements.table.value = order.table;
    editForm.elements.column.value = order.column;

    editOverlay.style.display = "block";
    editOverlay.focus();
  }
};

const handleEditSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const orderId = form.elements.id.value;
  const title = form.elements.title.value;
  const table = form.elements.table.value;
  const column = form.elements.column.value;

  const order = getOrder(orderId);
  if (order) {
    order.title = title;
    order.table = table;
    order.column = column;

    updateOrder(order);
    updateOrderHtml(order);
    handleEditToggle();
  }
};

const handleDelete = (event) => {
  const orderId = view.getOrderIdFromElement(event.target);
  if (orderId) {
    data.deleteOrder(orderId);
    view.removeOrder(orderId);
    view.toggleOverlay(html.editOverlay);
  }
};

const handleCancel = () => {
  view.clearAddForm();
  view.toggleOverlay(html.addOverlay);
  view.toggleOverlay(html.editOverlay);
  html.addButton.focus();
};

html.helpButton.addEventListener("click", handleHelpToggle);                   //.........................original code
html.helpCancel.addEventListener("click", handleHelpToggle);

html.addButton.addEventListener("click", handleAddToggle);
html.addCancel.addEventListener("click", handleCancel);
html.addForm.addEventListener("submit", handleAddSubmit);

html.grid.addEventListener("click", handleEditToggle);
html.editCancel.addEventListener("click", handleCancel);
html.editForm.addEventListener("submit", handleEditSubmit);
html.editDelete.addEventListener("click", handleDelete);

for (const htmlColumn of Object.values(html.columns)) {
  htmlColumn.addEventListener("dragstart", handleDragStart);
  htmlColumn.addEventListener("dragend", handleDragEnd);
}

for (const htmlArea of Object.values(html.area)) {
  htmlArea.addEventListener("dragover", handleDragOver);
}