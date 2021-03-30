import TaskIndex from "./../TaskIndex";

export default function manager(data, type, index, h) {
  let slots = [h("check-btn")];
  let attrs = getAttrsForTask(data, index);
  let componentName = "";
  switch (type) {
    case "group_by_dragging":
      componentName = "grouping";
      break;
    case "write_word_to_picture":
      componentName = "gaps-imgs";
      break;
    case "select_stressed_syllable":
      componentName = "syllable";
      break;
    case "images_order":
      componentName = "task-images";
      break;
    case "drag_and_drop_words":
      attrs.props.drag = true;
      componentName = "fill-gaps";
      break;
    case "match_words":
      componentName = "comparison";
      break;
    case "true_or_false":
      componentName = "t-f";
      break;
    case "match_picture_and_word":
      componentName = "match-imgs";
      break;
    case "select_correct_answer":
      componentName = "selection-box";
      break;
    case "select_correct_variant":
      attrs.props.underline = true;
      componentName = "selection-box";
      break;
    case "insert_skipped_word":
      componentName = "fill-gaps";
      break;
    case "youtube_addons":
      componentName = "youtubeAddons";
      break;
    case "lesson_addons_files":
      componentName = "attachs";
      break;
    case "select_correct_image_answer":
      componentName = "choose-image";
      break;
    // Для конслуьтации
    case "payment-option":
      slots = [];
      componentName = "payment-option";
      break;
    case "choose":
      componentName = "choose";
      break;
    case "gaps":
      componentName = "gaps";
      break;
    case "consultationLevel":
      componentName = "consultationLevel";
      break;
  }
  let task = h(componentName, attrs, slots);
  return (
    <div style="position: relative">
      {task}
      <TaskIndex index={index + 1} />
    </div>
  );
}

function getAttrsForTask(data, index) {
  let attrs = {
    props: {
      input: data,
      index
    },
    ref: "task",
    refInFor: true,
    class: "tasks__task"
  };
  if (data.inputCopy) {
    attrs.props.input = data;
  }
  if (data.child) {
    attrs.props.childSaved = data.child;
  }
  return attrs;
}
