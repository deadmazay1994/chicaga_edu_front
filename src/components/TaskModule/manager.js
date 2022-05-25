export default function manager(type) {
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
      componentName = "chip-skipped";
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
      // attrs.props.underline = true;
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
      // slots = [];
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
  return componentName;
}
