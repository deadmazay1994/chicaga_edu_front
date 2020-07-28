<template>
  <div class="crossword-elem vue-component">
    <button class="btn" id="btnCreate">Create</button>
    <button class="btn" id="btnPlay">Play</button>
    <br />
    <br />
    <div class="center crossword" id="crossword"></div>
    <br />

    <div class="center">
      <div class="line">
        <input class="word" type="text" value="Tucan" />
        <input class="clue" value="A tropical bird with a large beak" />
      </div>

      <div class="line">
        <input class="word" type="text" value="Dingo" />
        <input
          class="clue"
          value="This free-ranging dog is at home in the outback."
        />
      </div>

      <div class="line">
        <input class="word" type="text" value="Dolphin" />
        <input class="clue" value="A friendly finned non-fish" />
      </div>

      <div class="line">
        <input class="word" type="text" value="Pig" />
        <input class="clue" value="Bosses of the farm in Orwell's world" />
      </div>

      <div class="line">
        <input class="word" type="text" value="Kangaroo" />
        <input class="clue" value="Boxing champions of the outback" />
      </div>

      <div class="line">
        <input class="word" type="text" value="Octopus" />
        <input class="clue" value="Eight legged sea creature" />
      </div>

      <div class="line">
        <input class="word" type="text" value="Hamster" />
        <input
          class="clue"
          value="Furry rodent whose teeth never stop growing"
        />
      </div>

      <div class="line">
        <input class="word" type="text" value="Alligator" />
        <input
          class="clue"
          value="Dating back further than the T-rex, this reptile is a modern day dinosaur"
        />
      </div>

      <div class="line">
        <input class="word" type="text" value="Ostrich" />
        <input
          class="clue"
          value="Flightless bird not know for its people skills"
        />
      </div>

      <div class="line">
        <input class="word" type="text" value="Koala" />
        <input
          class="clue"
          value="Friendly version of the infamous Australian tourist terrorizing tree-dwellers"
        />
      </div>

      <div class="line">
        <input class="word" type="text" value="Mouse" />
        <input
          class="clue"
          value="This poor animal is often the victim of feline aggression and human experimentation"
        />
      </div>

      <div class="line">
        <input class="word" type="text" value="Antelope" />
        <input
          class="clue"
          value="The victim of every lion documentary clip you've ever seen."
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "crossword",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["input"],
  mixins: {},
  beforeMount() {
    class Spaces {
      constructor(r, c) {
        this.r = r;
        this.c = c;
        this.len = 1;
        this.direction = "right";
        this.used = false;
      }
    }

    let findSpaces = (grid, minLength) => {
      let spaceList = [];
      let gLen = 10;

      // Horizantal scan
      for (let i = 0; i < gLen; i++) {
        for (let j = 0; j < gLen; j++) {
          let c = grid[i][j];
          if (c === "-") {
            let s = new Spaces(i, j);
            while (grid[i][++j] === "-") s.len++;

            if (s.len >= minLength) {
              spaceList.push(s);
            }
          }
        }
      }

      //vertical scan
      for (let i = 0; i < gLen; i++) {
        for (let j = 0; j < gLen; j++) {
          let c = grid[j][i];
          if (c === "-") {
            let s = new Spaces(j, i);
            s.direction = "down";
            while (++j < gLen && grid[j][i] === "-") s.len++;

            if (s.len >= minLength) {
              spaceList.push(s);
            }
          }
        }
      }
      return spaceList;
    };

    let isValidSpace = (grid, space, word) => {
      if (space.used === true) return false;

      for (let i = 0; i < space.len; i++) {
        if (space.direction === "right") {
          if (
            grid[space.r][space.c + i] !== word[i] &&
            grid[space.r][space.c + i] !== "-"
          )
            return false;
        } else {
          if (
            grid[space.r + i][space.c] !== word[i] &&
            grid[space.r + i][space.c] !== "-"
          )
            return false;
        }
      }

      return true;
    };

    let forward = (grid, space, word) => {
      let added_spaces = [];
      for (let i = 0; i < space.len; i++) {
        if (space.direction === "right") {
          if (grid[space.r][space.c + i] === "-")
            added_spaces.push([space.r, space.c + i]);
          grid[space.r][space.c + i] = word[i];
        } else {
          if (grid[space.r + i][space.c] === "-")
            added_spaces.push([space.r + i, space.c]);
          grid[space.r + i][space.c] = word[i];
        }
      }
      return added_spaces;
    };

    let backward = (grid, addedSpaces) => {
      for (let i = 0; i < addedSpaces.length; i++) {
        let as = addedSpaces[i];
        grid[as[0]][as[1]] = "-";
      }
    };

    let solve = (grid, spaces, words) => {
      if (words.length === 0) {
        return true;
      }

      let w = words.shift();
      let possibleLocations = [];

      for (let i = 0; i < spaces.length; i++) {
        if (spaces[i].len === w.length) {
          possibleLocations.push(spaces[i]);
        }
      }

      for (let i = 0; i < possibleLocations.length; i++) {
        let sp = possibleLocations[i];

        if (isValidSpace(grid, sp, w)) {
          sp.used = true;
          let added_spaces = forward(grid, sp, w);
          if (solve(grid, spaces, words)) return true;
          backward(grid, added_spaces);
          sp.used = false;
        }
      }
      words.push(w);
      return false;
    };

    let crosswordPuzzle = (crossword, words) => {
      let grid = [];
      for (let i = 0; i < crossword.length; i++) {
        grid.push(crossword[i].split(""));
      }
      words.sort((a, b) => {
        return b.length - a.length;
      });

      let spaces = findSpaces(grid, words[words.length - 1].length);

      solve(grid, spaces, words);

      let result = [];
      for (let i = 0; i < grid.length; i++) {
        result[i] = grid[i].join("");
      }
      return result;
    };

    let arr = [
      "++++++++++",
      "+------+++",
      "+++-++++++",
      "+++-++++++",
      "+++-----++",
      "+++-++-+++",
      "++++++-+++",
      "++++++-+++",
      "++++++-+++",
      "++++++++++"
    ];

    // let arr1 = [
    //   "+-++++++++",
    //   "+-++++++++",
    //   "+-++++++++",
    //   "+-----++++",
    //   "+-+++-++++",
    //   "+-+++-++++",
    //   "+++++-++++",
    //   "++------++",
    //   "+++++-++++",
    //   "+++++-++++"
    // ];

    // let arr3 = [
    //   "XXXXXX-XXX",
    //   "XX------XX",
    //   "XXXXXX-XXX",
    //   "XXXXXX-XXX",
    //   "XXX------X",
    //   "XXXXXX-X-X",
    //   "XXXXXX-X-X",
    //   "XXXXXXXX-X",
    //   "XXXXXXXX-X",
    //   "XXXXXXXX-X"
    // ];

    console.log(crosswordPuzzle(arr, ["one", "two", "three", "four"]));
  }
};
</script>

<style scoped="scoped">
.crossword {
  text-align: center;
}
.center {
  margin: 0 auto;
}

.btn {
  margin: 8px 4px 0;
}
.btn {
  width: 172px;
  height: 28px;
}

.line {
  height: 2em;
}
.word,
.clue {
  display: inline-block;
  height: 1.5em;
  padding: 0 5px;
}
.word {
  text-align: right;
  width: 100px;
}
.clue {
  width: 500px;
}

.crossword {
  display: block;
  background-color: rgb(32, 32, 32);
}
.square {
  margin: 0 1px 1px 0;
  display: inline-block;
  font: 24px Calibri;
  width: 1.25em;
  height: 1.25em;
  line-height: 1.25em;
  vertical-align: middle;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.letter {
  background-color: rgb(255, 255, 255);

  -webkit-touch-callout: text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.char:focus {
  -webkit-box-shadow: 0 0 0 2px rgba(255, 32, 32, 1);
  -moz-box-shadow: 0 0 0 2px rgba(255, 32, 32, 1);
  box-shadow: inset 0 0 0 2px rgba(255, 32, 32, 1);
}
.char {
  font-size: 24px;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 0;
  margin: -1px 0 0 -1px;
  width: 1.35em;
  height: 1.35em;
  text-align: center;
  background: none;
}

.hide {
  visibility: hidden;
}

.clueReadOnly {
  border: 0;
  outline: 0;
  color: #303030 !important;
  background: none;
}
</style>
