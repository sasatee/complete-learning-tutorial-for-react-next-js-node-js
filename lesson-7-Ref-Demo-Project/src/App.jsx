import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SeletedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    // Now, my idea behind adding this selectedProjectedId property
    // and setting it to undefined initially
    // is that this selectedProjectedId property will be used
    // to either store the ID of the project
    // that was selected when we later have multiple projects
    // that can be selected here
    // or null if we want to add a new project
    // or undefined if we're not adding a new project
    // and we also did not select any project.
    selectedProjectedId: undefined,
    projects: [],
    tasks: [],
  });

  function handleSelectedProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectedId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectedId: null,
    }));
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectedId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancel() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectedId: undefined,
    }));
  }
  function hadndleDeleteProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectedId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectedId
        //         If the IDs here do not match, I know that I'm not looking at the item that should be deletedand therefore I'll return true to keep that item.If these IDs do match, I'm looking at the item that should be deleted and therefore thanks to this comparison here,
      ),
    }));
  }

  //Task
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectedId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectedId
  );
  let content = (
    <SeletedProject
      projectSideBarProp={selectedProject}
      onDeleteProp={hadndleDeleteProject}
      onAddTaskProp={handleAddTask}
      onDeleteTaskProp={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProjectedId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancelProp={handleCancel} />
    );
  } else if (projectsState.selectedProjectedId === undefined) {
    content = <NoProjectSelected onStartAddProjet={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          onStartAddProjet={handleStartAddProject}
          projectSideBarProp={projectsState.projects}
          onSelectProjectProp={handleSelectedProject}
          selectedProjectIdProp={projectsState.selectedProjectedId}
        />
        {content}
        {/* {projectsState.selectedProjectedId === null ? (
          <NewProject onAdd={handleAddProject} onCancelProp={handleCancel} />
        ) : (
          <NoProjectSelected onStartAddProjet={handleStartAddProject} />
        )} */}
      </main>
    </>
  );
}

export default App;
