export const graphStyles = `
node {
  width: 30px;
  height: 30px;
  font-size: 10px;
  label: data(label);
  background-color: grey;
  text-halign: right;
  text-valign: center;
  text-margin-x: 4px;
}

.header {
  text-margin-x: -5px;
  text-halign: left;
  shape: round-rectangle;
}

edge {
  width: 4;
  target-arrow-shape: triangle;
  curve-style: bezier;
  line-style: dotted;
}

.selected {
  border-width: 4px;
  border-color: black;
  border-style: solid;
}

.Dna {
  background-color: green;
}
.AgentValidationPkg {
  background-color: lime;
}
.Create {
  background-color: blue;
}
.Delete {
  background-color: red;
}
.Update {
  background-color: cyan;
}
.CreateLink {
  background-color: purple;
}
.DeleteLink {
  background-color: purple;
}
`;
