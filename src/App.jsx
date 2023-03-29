import styles from './App.module.css';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useState} from "react";
import {PopUp} from "./components/PopUp/PopUp";


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

    const [isPopUp, setIsPopUp] = useState(false)

    // const PopUpToggle = () => {
    //     console.log(isPopUp)
    //     setIsPopUp(!this)
    // }

    const popUpOpen = () => {
        setIsPopUp(true)
    }

    const popUpClose = () => {
        setIsPopUp(false)
    }

    return (
        // items.map(text => (
        //     <>
        //         <span>{text}</span>
        //         <br/>
        //     </>
        // ))
      <>
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
          <br/>
          <button onClick={popUpOpen}>Открыть Попап</button>
          <PopUp isOpen={isPopUp} onClose={popUpClose}>
              <span>Надпись в попапе</span>
          </PopUp>
      </>

    )
}

export default App;
