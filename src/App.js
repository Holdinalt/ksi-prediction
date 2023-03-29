import styles from './App.module.css';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";


function App() {

    const [items, setItems] = useState(['hello', 'my', 'dear', 'world'])

    const onDragEnd = res => {
        const {destination, source, draggableId} = res

        // if (!destination || (
        //         destination.droppableId === source.droppableId &&
        //         destination.index === source.index
        // )) {
        //     return;
        // }

        const newItems = Array.from(items)

        newItems.splice(source.index, 1)
        newItems.splice(destination.index, 0, draggableId)

        setItems(newItems)
    }

    return (
        // items.map(text => (
        //     <>
        //         <span>{text}</span>
        //         <br/>
        //     </>
        // ))
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" >
            {provided => (
                <div
                    className={styles.list}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {items.map((text, index) => (
                        <Draggable key={text} draggableId={text} index={index}>
                            {(provided) => (
                                <div className={styles.card}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                     ref={provided.innerRef}
                                >
                                    <span>{text}</span>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>

            )}
        </Droppable>
      </DragDropContext>
    )
}

export default App;
