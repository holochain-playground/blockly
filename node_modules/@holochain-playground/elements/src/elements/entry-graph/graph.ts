export const graphStyles = `
node {
  background-color: grey;
  font-size: 10px;
  width: 16px;
  label: data(label);
  height: 16px;
  shape: round-rectangle;
}

node > node {
  height: 1px;
}

edge {
  width: 2;
  target-arrow-shape: triangle;
  curve-style: bezier;
}

edge[label] {
  label: data(label);
  font-size: 7px;
  text-rotation: autorotate;
  text-margin-x: 0px;
  text-margin-y: -5px;
  text-valign: top;
  text-halign: center;        
}

.selected {
  border-width: 1px;
  border-color: black;
  border-style: solid;
}

.AgentId {
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

.implicit {
  width: 1;
  line-style: dotted;
}

.update-edge {
  width: 1;
  line-style: dashed;
}
.updated {
  opacity: 0.5;
}
.deleted {
  opacity: 0.3 !important;
}
`;