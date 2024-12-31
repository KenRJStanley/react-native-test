import { Image, StyleSheet, Text, Platform, View } from 'react-native';
import { FC } from 'react';
import { ToDoTaskDto, useToDoStore } from '../stores/ToDoStore';

const ToDoTask: FC<ToDoTaskDto> = ({ id, label, complete }) => {

    const { removeTask, toggleComplete } = useToDoStore();

    const labelModifier = complete ? styles.toDoLabelComplete : styles.toDoLabelIncomplete;

    return (  
      <View style={styles.toDoTask} testID="todo-task">
          <Text style={styles.toDoStatus} onPress={() => {toggleComplete(id)}}>{complete ? '✅' : '❌'}</Text>
          <Text style={[styles.toDoLabel, labelModifier]} onPress={() => {toggleComplete(id)}}>{ label }</Text>
          <Text style={styles.toDoDelete} onPress={() => {removeTask(id)}}>Delete</Text>
      </View>
    );
};

export default ToDoTask;

const styles = StyleSheet.create({
  toDoTask: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: '100%',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    padding: 10,
  },
  toDoStatus: {
    
  },
  toDoLabel: {
    fontSize: 15,
  },
  toDoLabelComplete: {
    textDecorationLine: 'line-through',
  },
  toDoLabelIncomplete: {

  },
  toDoDelete: {
    marginLeft: 'auto',
    color: '#ffffff',
    textDecorationLine: 'underline',
  }
});