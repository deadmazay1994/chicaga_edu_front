export default function getContext(managerComponent) {
  let $this = managerComponent;
  if (
    (!$this.saved.length && $this.type == "lesson") ||
    (!$this.savedHomework.length && $this.type == "homework")
  ) {
    return $this.input;
  } else if (this.saved.length && this.type == "lesson") {
    return $this.saved;
  } else if (this.savedHomework.length && this.type == "homework") {
    return $this.savedHomework;
  }
  return [];
}
