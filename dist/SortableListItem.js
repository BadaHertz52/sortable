import React, { useRef } from "react";
function SortableListItem({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem
}) {
  const itemRef = useRef(null);
  const onDragStartItem = () => {
    itemRef.current.classList.add("dragstart");
    onDragStart(index);
  };
  const onDragEnd = () => {
    itemRef.current.classList.remove("dragstart");
  };
  const onDragEnter = () => {
    itemRef.current.classList.add("dragover");
  };
  const onDragLeave = () => {
    itemRef.current.classList.remove("dragover");
  };
  /**
   * onDrop 의 선행 조건
   */
  const onDragOver = event => event.preventDefault();
  const onDrop = () => {
    itemRef.current.classList.remove("dragover");
    onDropItem(index);
  };
  const onClick = () => onClickItem(index);
  return /*#__PURE__*/React.createElement("li", {
    ref: itemRef,
    className: "item",
    draggable: draggable || false,
    onDragStart: onDragStartItem,
    onDragEnd: onDragEnd,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDrop: onDrop,
    onClick: onClick,
    onMouseEnter: () => itemRef.current?.classList.add("on"),
    onMouseLeave: () => itemRef.current?.classList.remove("on")
  }, children);
}
export default SortableListItem;