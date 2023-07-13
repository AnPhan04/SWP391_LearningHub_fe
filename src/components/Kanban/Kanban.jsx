import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddColumn from "./AddColumn";
import AddTask from "./AddTask";
import ArchiveColumn from "./ArchiveColumn";
import TaskCard from "./TaskCard";
import UpdateCard from "./UpdateCard";
import { Dialog } from "@mui/material";
const Container = styled.div`
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  // flex-wrap: wrap;
  flex: "auto";
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 13px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 5rem;
  display: flex;
  width: auto;
  min-height: 80vh;
  justify-content: center;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 10px;
  font-family: roboto, sans-serif;

  align-self: flex-start;
`;

const ColumnHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const init = {
  0: {
    title: "To-do",
    items: [],
  },
};

const Kanban = ({ countCardKey, id }) => {
  let [columns, setColumns] = useState(init);

  useEffect(() => {
    const getData = async (id) => {
      console.log(id);
      fetch(`http://localhost:8080/api/v1/note/kanban/data?boardId=${id}`, {
        credentials: "include",
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setColumns(json);
        })
        .catch((err) => console.log(err));
    };
    getData(id);
  }, [countCardKey]);

  //save data to database every time the board from front end changed
  useEffect(() => {
    async function saveData(id) {
      fetch(`http://localhost:8080/api/v1/note/kanban/data?boardId=${id}`, {
        credentials: "include",
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(columns),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
    saveData(id);
  }, [columns]); // will call when the columns (data) has been changed

  //handle the action when user drag item
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log("Delete task: " + taskId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/note/card?id=${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      if (response.ok) {
        console.log("Delete task: " + jsonData.message);
        setColumns((prevColumns) => {
          const updatedColumns = { ...prevColumns };
          for (const columnId in updatedColumns) {
            const column = updatedColumns[columnId];
            const updatedItems = column.items.filter(
              (item) => item.id !== taskId
            );
            column.items = updatedItems;
          }
          return updatedColumns;
        });
      }
    } catch (error) {
      console.log("Delete task error: " + error);
    }
  };

  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (taskId) => {
    let task;
    for (const columnId in columns) {
      const column = columns[columnId];
      task = column.items.find((item) => item.id === taskId);
      if (task) {
        break;
      }
    }
    setSelectedTask(task);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        key={Math.random}
      >
        <Container>
          <TaskColumnStyles>
            <>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Droppable
                    key={columnId}
                    droppableId={columnId}
                    index={index}
                  >
                    {(provided) => (
                      <TaskList
                        ref={provided.innerRef}
                        key={provided.id}
                        {...provided.droppableProps}
                      >
                        <ColumnHeading>
                          <Title>{column.title}</Title>
                          <ArchiveColumn target={columnId} />
                        </ColumnHeading>
                        {column.items.map((item, index) => (
                          <TaskCard
                            key={item.id}
                            item={item}
                            index={index}
                            onDelete={handleDeleteTask}
                            onClick={handleCardClick}
                          />
                        ))}
                        {provided.placeholder}
                        <AddTask key={columnId} colId={columnId} />
                      </TaskList>
                    )}
                  </Droppable>
                );
              })}
              <AddColumn boardId={id} />
            </>
          </TaskColumnStyles>
        </Container>
      </DragDropContext>

      <Dialog
        open={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
      >
        {selectedTask && (
          <UpdateCard
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
        {console.log(selectedTask)}
      </Dialog>
    </>
  );
};

export default Kanban;
