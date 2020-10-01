<script>
// export default {
//   // Чтобы модуль заработал надо подключить в components/store/index.js модуль components/store/modules/chat.js
//   // Подключать надо в объект modules
//   methods: {
//     // Метод переключения чатов
//     toggle(name) {
//       this.$store.dispatch("toggleChannel", name);
//     }
//   },
//   async mounted() {
//     // Инициализация чата
//     // Первым делом это!!!
//     await this.$store.dispatch("initChat", {
//       login: "rawil",
//       password: "зфыыцщкв",
//       room: "testchanel3",
//       socketUrl: "wss://chat.ru/websocket",
//       chatElem: this.$refs.chat
//     });

//     // Создание юзера
//     // Если такой изер существует, то скрипт от этого не накроется, только вылезет ошибка в консоли
//     // let r = await this.$store.dispatch("createUserInChat", {
//     //   email: "test@maila.com",
//     //   name: "testnane",
//     //   password: "password",
//     //   username: "username"
//     // });

//     // Создание приватной группы
//     // В массив members передаем username
//     // name без пробелов и только английскими буквами
//     r = await this.$store.dispatch("createChannel", {
//       members: ["rawil", "rawil32"],
//       name: "testchanel3"
//     });

//     // Переключение между группами
//     let name = "toggler";
//     this.$store.dispatch("toggleChannel", name);
//   }
// };
</script>
