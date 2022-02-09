import { useState, useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { Button } from '@mantine/core'
import { FaEllipsisH } from 'react-icons/all'
import KanbanColumn from '../../components/KanbanColumn/KanbanColumn'
import useStyles from './style'
import UserIconList from '../../components/UserIconList/UserIconList'
import TaskModal from '../../components/TaskModal/TaskModal'
import { DashboardsContext } from '../../contexts/DashboardsContext'
import GenerateComment from '../../logic/generateComment'
import DashboardDrawer from '../../components/DashboardDrawer/DashboardDrawer'

const DashboardPage = () => {
  const { id: dashboardId } = useParams()
  const [dashboards, setDashboards] = useContext(DashboardsContext)
  const currentDashboard = dashboards.find(({ id }) => id === dashboardId)
  const [board, setBoard] = useState(currentDashboard)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDashboardDrawerOpen, setIsDashboardDrawerOpen] = useState(false)
  const { classes } = useStyles()
  const [currentIssue, setCurrentIssue] = useState()
  const onDragEnd = (result) => {
    const newColumns = board.columns
    const findColumnSource = newColumns.find(({ id }) => id === result.source.droppableId)
    const findIssueSource = findColumnSource.issues.find(({ id }) => id === result.draggableId)
    const issueSourceIndex = findColumnSource.issues.findIndex(
      (issue) => issue.id === result.draggableId
    )
    const findColumnDestination = newColumns.find(({ id }) => id === result.destination.droppableId)
    findColumnSource.issues.splice(issueSourceIndex, 1)
    findColumnDestination.issues.splice(result.destination.index, 0, findIssueSource)
  }

  const onTaskModalCloseHandler = (task) => {
    console.log(task)
    setIsModalOpen(false)
  }

  const onTaskEventHandler = (idIssue, columnId) => {
    const findColumn = board.columns
      .find(({ id }) => id === columnId)
      .issues.find(({ id }) => id === idIssue)
    setCurrentIssue(findColumn)
    setIsModalOpen(true)
  }
  const onDescriptionSaveHandler = (descriptionText) => {
    console.log(descriptionText)
  }
  const onUserRemoveHandler = (id) => {
    console.log(id)
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onAddColumnHandler = () => {}

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Button classNames={{ root: classes.buttonGrayRoot }}>{board.status}</Button>

        <UserIconList listOfUsers={board.users} isAppendable={false} iconLimit={4} />
        <Button
          style={{ marginLeft: 'auto' }}
          classNames={{ root: classes.buttonGrayRoot }}
          leftIcon={<FaEllipsisH />}
          onClick={() => setIsDashboardDrawerOpen(true)}
        >
          Show Menu
        </Button>
      </div>
      <div className={classes.columns}>
        <DragDropContext onDragEnd={onDragEnd}>
          {board.columns.map(({ id, title, issues }, index) => (
            <Droppable key={id} droppableId={id} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <KanbanColumn
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    columnId={id}
                    title={title}
                    tasks={issues}
                    onAddHandler={onAddColumnHandler}
                    onTaskClickHandler={onTaskEventHandler}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      {isModalOpen ? (
        <TaskModal
          isOpen={isModalOpen}
          commentsList={[new GenerateComment().getComment]}
          membersList={board.users}
          onCloseHandler={onTaskModalCloseHandler}
          task={currentIssue}
        />
      ) : null}
      <DashboardDrawer
        title={board.title}
        description={board.description}
        creationDate={board.createdAt}
        membersList={board.users}
        isAdmin={false}
        isOpen={isDashboardDrawerOpen}
        setIsOpen={() => setIsDashboardDrawerOpen((prevState) => !prevState)}
        onDescriptionSaveHandler={onDescriptionSaveHandler}
        onUserRemoveHandler={onUserRemoveHandler}
      />
    </div>
  )
}
export default DashboardPage
