import { Image, StyleSheet, Platform, View, Text, TextInput, Button, SafeAreaView, ScrollView } from 'react-native';
import { FC, useState } from 'react';
import { useToDoStore, ToDoTaskDto } from '../stores/ToDoStore';
import ToDoTask from './ToDoTask';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const ToDo: FC = () => {

    const { tasks, addTask } = useToDoStore();

    const [ newItemLabel, setNewItemLabel ] = useState<string>('');

    const incompleteItemCount: number = tasks.filter(task => task.complete === false).length;

    const validateAddItem = () => {
        if (newItemLabel.trim() !== '') {
            const newItem: ToDoTaskDto = {
                id: uuidv4(),
                label: newItemLabel,
                complete: false,
            };
            addTask(newItem);
            setNewItemLabel('');
        }
    };

    return (
      <SafeAreaView style={styles.appWrapper}>

        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>My To Do List</Text>
        </View>

        <View style={styles.toDoContainer} testID="todo-list">
          <ScrollView>
            {tasks.map((task, index) => 
                <ToDoTask
                  id={task.id}
                  label={task.label}
                  complete={task.complete}
                  key={`item-${index}`}
                />
            )}
            </ScrollView>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.toDoAddNew}>
              <TextInput
                  placeholder="Enter new task"
                  value={newItemLabel}
                  onChangeText={setNewItemLabel}
                  style={styles.taskInput}
                  testID="todo-input"
              />
              <Button title="Add Task" onPress={validateAddItem} testID="todo-submit" />
          </View>
          <Text style={styles.toToIncomplete}>You have {incompleteItemCount} incomplete items</Text>
        </View>

      </SafeAreaView>
    );
};

export default ToDo;

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
  },
  titleTextContainer: {
    flex: 1,
    maxHeight: 50,
    paddingHorizontal: 10,
    backgroundColor: '#d4afb9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'black',
    fontSize: 18,
  },
  toDoContainer: {
    flex: 1,
    gap: 5,
    backgroundColor: '#9cadce'
  },
  footerContainer: {
    flex: 1,
    backgroundColor: '#d1cfe2',
    maxHeight: 150,
    paddingVertical: 10,
    gap: 10,
  },
  taskInput: {
    width: '60%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontSize: 18,
  },
  taskSubmit: {

  },
  toDoAddNew: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center'
  },
  toToIncomplete: {
    justifyContent: 'center',
    textAlign: 'center'
  },
});