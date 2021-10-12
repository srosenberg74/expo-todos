import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Pressable,
} from "react-native";

export default function App() {
  // UseStates

  const [items, setItems] = useState([
    // { todo: "first item" },
    // { todo: "second item" },
  ]);
  const [text, onChangeText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogResponse, setDialogResponse] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedId, setSelectedID] = useState(-1);
  const [placeholderText, setPlaceholderText] = useState("Type new entry here");

  // Functions

  const addItemToList = () => {
    const cleanedInput = text.trim().toLowerCase();
    let result = items.map(({ todo }) => todo);
    if (result.find((todo) => todo.trim().toLowerCase() === cleanedInput)) {
      setShowDialog(true);
      setAlertMessage(
        "This is a duplicate entry.  Did you want to create a duplicate?"
      );
    } else if (
      cleanedInput.length > 0 &&
      isNaN(cleanedInput) &&
      /^[a-zA-Z0-9- -!-']*$/.test(cleanedInput)
    ) {
      setItems([...items, { todo: text.trim(), myColor: randomColor() }]);
      setPlaceholderText("submission successful");
      onChangeText("");
      console.log(items);
    } else {
      onChangeText("");
      setPlaceholderText("Invalid Entry");
    }
  };

  const generateList = items.map((item, index) => (
    <View
      key={index}
      style={{
        // flex: 1,
        flexDirection: "row",
        // flexWrap: "wrap",
        // flexShrink: 1,
        borderColor: item.myColor,
        alignItems: "center",
        width: "80vw",
        minHeight: "10vh",
        maxWidth: 500,
        borderWidth: "2px",
        borderStyle: "solid",
        padding: 20,
        borderRadius: 10,
        fontSize: "1.5rem",
        marginBottom: "2rem",
        boxShadow: "3px 3px 8px silver",
        backgroundColor: "white",
        // blockSize: "fit-content",
        // height: "fit-content"
      }}
    >
      <MyCheckbox number={index} />
      <View style={styles.textArea}>
        <Text style={styles.itemText}>{item.todo}</Text>
      </View>
    </View>
  ));

  function MyCheckbox(props) {
    function onCheckmarkPress() {
      setSelectedID(props.number);
      setShowDialog(true);
      setAlertMessage("Are you sure you want to delete this item?");
    }
    return (
      <Pressable
        style={{
          width: 24,
          height: 24,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          borderWidth: 2,
          borderColor: "silver",
          backgroundColor: "transparent",
        }}
        onPress={onCheckmarkPress}
      ></Pressable>
    );
  }

  const displayDialog = (message) => (
    <View style={styles.dialogContainer}>
      <View style={styles.dialog}>
        <Text>{message}</Text>
        <View style={styles.buttonActions}>
          <Button title="OK" onPress={() => dialogAction(true)} />
          <Button title="Cancel" onPress={() => dialogAction(false)} />
        </View>
      </View>
    </View>
  );

  const dialogAction = (action) => {
    if (
      action &&
      alertMessage === "Are you sure you want to delete this item?"
    ) {
      setItems(items.filter((value, i) => i !== selectedId));
      setPlaceholderText("Item deleted");
    } else if (
      action &&
      alertMessage ===
        "This is a duplicate entry.  Did you want to create a duplicate?"
    ) {
      setItems([...items, { todo: text.trim(), myColor: randomColor() }]);
      onChangeText("");
    } else if (!action) {
      setPlaceholderText("Action cancelled");
    }
    setShowDialog(false);
    onChangeText("");
  };

  return (
    <View style={styles.container}>
      {showDialog && displayDialog(alertMessage)}
      {dialogState &&
        (dialogResponse ? (
          <Text style={styles.responseValue}>User clicked OK</Text>
        ) : (
          <Text style={styles.responseValue}>User clicked cancel</Text>
        ))}
      <Text style={styles.heading}>To Do's</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerScroll}>{generateList}</View>
      </ScrollView>
      <TextInput
        className="textInput"
        style={styles.textInput}
        onChangeText={onChangeText}
        value={text}
        autoFocus={true}
        placeholder={placeholderText}
        onSubmitEditing={addItemToList}
        onFocus={() => setPlaceholderText("Type new entry here")}
      />
      <View style={styles.buttonWrapper}>
        <Button
          style={styles.button}
          color="cadetblue"
          title="Add Item"
          onPress={addItemToList}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// Random Border-color

const colors = [
  "yellow",
  "red",
  "purple",
  "orange",
  "blue",
  "green",
  "cyan",
  "crimson",
  "darkblue",
  "darkred",
  "darkorange",
  "forestgreen",
  "darksalmon",
  "deeppink",
  "dodgerblue",
  "pink",
  "darkseagreen",
  "sandybrown",
  "gold",
  "chocolate",
  "coral",
  "brown",
];
let randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "2rem",
    justifyContent: "flex-start",
    textAlign: "center",
    color: "cadetblue",
    backgroundColor: "aliceblue",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "4rem",
    paddingBottom: "2rem",
    marginTop: "2rem",
    height: "20vh",
    color: "cadetblue",
  },
  textInput: {
    width: "80vw",
    height: "5vh",
    border: "2px solid rgb(21 71 132 / 40%)",
    marginBottom: "1rem",
    borderRadius: 8,
    backgroundColor: "white",
    textAlign: "center",
    maxWidth: 400,
  },
  scrollView: {
    width: "100%",
    // maxWidth: "90vw",
    height: "50vh",
  },
  innerScroll: {
    alignItems: "center",
  },
  // checkboxBase: {
  //   width: 24,
  //   height: 24,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 4,
  //   borderWidth: 2,
  //   borderColor: "silver",
  //   backgroundColor: "transparent",
  // },
  itemText: {
    fontSize: "1.5rem",
    paddingLeft: "2rem",
    color: "cadetblue",
    fontfamily: "monospace",
  },
  textItem: {
    wordBreak: "break-all",
  },
  textArea: {
    // textAlign: "center",
    flexShrink: 1,
  },
  buttonWrapper: {},
  dialogContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  dialog: {
    border: "solid 1px #000",
    margin: "0 auto",
    borderRadius: 5,
    padding: 30,
    backgroundColor: "#FFF",
  },
  buttonActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  responseValue: {
    border: "solid 1px #000",
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
  },
});
