import { createStackNavigator } from 'react-navigation-stack'

import NoteOne from './noteOne';
import NoteTwo from './noteTwo';
import NoteThree from './noteThree';
import NoteFour from './noteFour';
import NoteFive from './noteFive';

export const NotesStack = createStackNavigator({
    NoteOne: NoteOne,
    NoteTwo: NoteTwo,
    NoteThree: NoteThree,
    NoteFour: NoteFour,
    NoteFive: NoteFive
},{
    headerMode: 'none'
});

export default NotesStack;
