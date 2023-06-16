import { useRef, useState, useEffect } from 'react';
import Kanban from '../../components/Kanban/Kanban';
import EditableDiv from './EditTableDiv';
function NoteScreen(){
return (
   <>
        <EditableDiv param={1}/>
        <Kanban/> 
   </>
  );
}


export default NoteScreen;