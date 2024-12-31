import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { useToDoStore } from '../stores/ToDoStore'
import ToDo from "./ToDo";

beforeEach(() => {
  // Reset store before each test instances
  const { loadTasks } = useToDoStore.getState();
  loadTasks([]);
});

test("allows user to add a task to the do do list", () => {
  render(<ToDo />);

  // Ensure input, button and to do list are rendered
  const taskInput = screen.getByTestId("todo-input");
  expect(taskInput).toBeTruthy();
  const submitButton = screen.getByTestId("todo-submit");
  expect(submitButton).toBeTruthy();
  const toDoList = screen.getByTestId("todo-list");
  expect(toDoList).toBeTruthy();

  // Input task and add it
  fireEvent.changeText(taskInput, "Make a list");
  expect(taskInput.props.value).toBe("Make a list");

  fireEvent.press(submitButton);

  // Check input is clear
  expect(taskInput.props.value).toBe("");
  expect(screen.getByText("Make a list")).toBeTruthy();

  // Input second task
  fireEvent.changeText(taskInput, "Check it twice");
  fireEvent.press(submitButton);

  // Check both tasks are rendered
  expect(screen.getByText("Make a list")).toBeTruthy();
  expect(screen.getByText("Check it twice")).toBeTruthy();

  // Check the number of tasks
  const tasks = screen.getAllByTestId("todo-task");
  expect(tasks.length).toBe(2);

});