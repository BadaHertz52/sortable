import React, { useCallback, useState } from "react";
import "./SortableList.css";
import SortableListItem from "./SortableListItem";

function SortableList({ data, onClickItem, renderItem }) {
  /**
   * drag되는 item 의 index
   */
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);
  const onDragStart = (index) => setStartIndex(index);
  /**
   *
   * @param  dropIndex  : drag 되는 item의 drop될 위치의 index
   */
  const onDropItem = useCallback(
    (dropIndex) => {
      const dragItem = listData[startIndex];
      const list = [...listData];
      list.splice(startIndex, 1);
      list.splice(dropIndex - (startIndex < dropIndex ? -1 : 0), 0, dragItem);
      setListData(list);
    },
    [startIndex, listData]
  );
  return (
    <ul className="sortable-list">
      {listData.map((item, index) => (
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDropItem={onDropItem}
          onDragStart={onDragStart}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDropItem}
      />
    </ul>
  );
}

export default SortableList;
