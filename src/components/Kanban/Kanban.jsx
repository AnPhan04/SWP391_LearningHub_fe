import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskCard from './TaskCard';
import AddTask from './AddTask';
import AddColumn from './AddColumn';
const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
  justify-content: center;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  font-family: roboto, sans-serif;

  align-self: flex-start;
`;

const ColumnHeading = styled.div`
display: flex;
justify-content: space-between;
`;

const init = {
  "0": {
    title: "Null",
    items: [],
  }
}
const Kanban = (props) => {
  let [columns, setColumns] = useState(init);

  //https://mocki.io/v1/284745a5-3443-4340-a08d-112e88c970ae
  // http://localhost:8080/api/v1/note/kanban/data?boardId=1
  //insert data
  useEffect(() => {
    const getData = async () => {
      fetch(`http://localhost:8080/api/v1/note/kanban/data?boardId=${props.boardId}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setColumns(json)
        }).catch(setColumns(init));
    };
    getData();
  }, []);

  //save data to database every time the board from front end changed
  useEffect(() => {
    async function saveData() {
      fetch(`http://localhost:8080/api/v1/note/kanban/data?boardId=${props.boardId}`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(columns)
      }).then(response => response.json())
        .then(response => console.log(response)).catch(err => console.log(err));
    }
    saveData();
  }, [columns]) // will call when the columns (data) has been changed

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
  

  return (
    < >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)} key={Math.random}
      >
        <Container >
          <TaskColumnStyles>
            <>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Droppable key={columnId} droppableId={columnId} index={index}>
                    {(provided) => (
                      <TaskList
                        ref={provided.innerRef}
                        key={provided.id}
                        {...provided.droppableProps}
                      >
                        <ColumnHeading>
                          <Title>{column.title}</Title>
                          <DeleteIcon fontSize="small" />
                        </ColumnHeading>
                        {column.items.map((item, index) => (
                          <TaskCard key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                        <AddTask key={columnId} />
                      </TaskList>
                    )}
                  </Droppable>
                );
              })}
              <AddColumn />
            </>
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
    </>
  );
};

export default Kanban;
