import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    height: max-content;
    font-size: 14px;
    border: 1px lightgray solid;
    border-radius: 3px;
    padding: 4px;
  }
`;

const CountSelection = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  gap: 16px;
  p {
    margin: 0;
  }
  select {
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 14px;
    padding: 4px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

const PageSelection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  button {
    background-color: transparent;
    border: none;
    color: gray;
    &:focus {
      outline: 0;
    }
  }
  div {
    height: 30px;
    width: 30px;
    background-color: #5fd4d0;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      height: max-content;
      width: max-content;
      margin: auto;
      color: white;
      font-weight: bold;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  th {
    background-color: white;
    font-weight: bold;
    padding: 16px;
  }
  tbody {
    td {
      padding: 16px;
      .actions-container {
        display: flex;
        gap: 16px;
      }
    }
    tr {
      border-top: 2px solid #dee2e6;
      background-color: rgba(0, 0, 0, 0.05);
    }
    tr:nth-child(2n) {
      background-color: white;
    }
  }
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const DragAndDropTable = ({
  cols,
  items,
  handleItemsMoved,
  entriesOptions,
  entries = 10,
}) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(entries);
  const [search, setSearch] = useState("");

  const itemsFromSearch = () => {
    if (!search) return items;
    setPage(1);
    return items.filter((item) => {
      const result = Object.values(item).some((value) =>
        typeof value === "string"
          ? value.toLowerCase().includes(search.toLowerCase())
          : false
      );
      return result ? item : false;
    });
  };

  const onDragEnd = (result) => {
    //If dropped outside the list
    if (!result.destination) {
      return;
    }

    //If dropped to another position inside the list
    if (result.source.index !== result.destination.index) {
      const reorderedItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );
      handleItemsMoved(reorderedItems);
    }
  };

  return (
    <>
      <Top>
        <CountSelection>
          <p>Show results</p>{" "}
          <select onChange={(e) => setCount(e.target.value)}>
            {entriesOptions ? (
              entriesOptions.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              })
            ) : (
              <>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </>
            )}
          </select>
        </CountSelection>
        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </Top>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Table id="table" ref={provided.innerRef}>
              <thead>
                <tr>
                  {cols?.map((col, index) => {
                    return (
                      <th key={index}>{col.replace("_", " ").toUpperCase()}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {itemsFromSearch()
                  .slice(page * count - count, page * count)
                  .map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {cols?.map((col, index) => {
                            return <td key={index}>{item[col]}</td>;
                          })}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
      <Bottom>
        {page * count -
          count +
          1 +
          " - " +
          (page * count < items.length ? page * count : items.length) +
          " of " +
          items.length +
          " results"}

        {items.length > count && (
          <PageSelection>
            <button
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              Previous
            </button>
            <div>
              <p>{page}</p>
            </div>
            <button
              onClick={() => {
                if (page * count < items.length) setPage(page + 1);
              }}
            >
              Next
            </button>
          </PageSelection>
        )}
      </Bottom>
    </>
  );
};
