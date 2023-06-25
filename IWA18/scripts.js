/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */
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

html.add.cancel.addEventListener('click', handleAddToggle)               //.................Original code
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}