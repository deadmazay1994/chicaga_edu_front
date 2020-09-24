export default [
  {
    type: "choose",
    description: "Расскажите о своем опыте изучения английского языка",
    select: [
      {
        img: "./imgs/icon-home.png",
        title: "SCHOOL",
        subtitle: "ШКОЛА"
      },
      {
        img: "./imgs/icon-home.png",
        title: "UNIVERSITY",
        subtitle: "УНИВЕРСИТЕТ"
      },
      {
        img: "./imgs/icon-home.png",
        title: "COURSES",
        subtitle: "КУРСЫ"
      },
      {
        img: "./imgs/icon-home.png",
        title: "TUTOR",
        subtitle: "РЕПЕТИТОР"
      }
    ]
  },
  {
    type: "choose",
    description: "Какие ваши цели в изучении английского языка",
    select: [
      {
        img: "./imgs/icon-home.png",
        title: "WORK",
        subtitle: "РАБОТА"
      },
      {
        img: "./imgs/icon-home.png",
        title: "TRAVELLING",
        subtitle: "ПУТЕШЕСТВИЕ"
      },
      {
        img: "./imgs/icon-home.png",
        title: "EDUCATION",
        subtitle: "НОВЫЕ ДРУЗЬЯ"
      },
      {
        img: "./imgs/icon-home.png",
        title: "EDUCATION",
        subtitle: "УЧЁБА"
      },
      {
        img: "./imgs/icon-home.png",
        title: "IMMIGRATION",
        subtitle: "ИММИГРАЦИЯ"
      },
      {
        img: "./imgs/icon-home.png",
        title: "MOVIE IN ENGLISH",
        subtitle: "ФИЛЬМЫ НА АНГЛИЙСКОМ"
      },
      {
        img: "./imgs/icon-home.png",
        title: "CHILD’S PROGRESS",
        subtitle: "УСПЕХ РЕБЕНКА"
      },
      {
        img: "./imgs/icon-home.png",
        title: "BRAIN TRANING",
        subtitle: "ТРЕНИРОВКА МОЗГА"
      }
    ]
  },
  {
    type: "gaps",
    description: "Аудиотест",
    audio: "https://edu.chicaga.ru/public/images/_5f5f1c7208f42.mp3",
    audioTitle: "Прослушайте аудиозапись и ответье на вопросы",
    tasks: [
      {
        title: "I like to ________ in the ________ with my ________.",
        options: [
          {
            text: "driving",
            correct: false
          },
          {
            text: "running",
            correct: false
          },
          {
            text: "hiking",
            correct: true
          }
        ]
      },
      {
        title: "My dad _______ twice a week.",
        options: [
          {
            text: "basketball",
            correct: false
          },
          {
            text: "swimming",
            correct: true
          },
          {
            text: "weight lifting",
            correct: false
          }
        ]
      },
      {
        title: "He _________ to get exercise.",
        options: [
          {
            text: "cycling",
            correct: true
          },
          {
            text: "soccer",
            correct: false
          },
          {
            text: "volleyball",
            correct: false
          }
        ]
      },
      {
        title: "She usually uses _________.",
        options: [
          {
            text: "pottery",
            correct: false
          },
          {
            text: "knitting",
            correct: false
          },
          {
            text: "painting",
            correct: true
          }
        ]
      },
      {
        title: "They went to the lake ________.",
        options: [
          {
            text: "sailing",
            correct: false
          },
          {
            text: "fishing",
            correct: false
          },
          {
            text: "bird watching",
            correct: true
          }
        ]
      },
      {
        title: "How about getting out the board _______?",
        options: [
          {
            text: "chess",
            correct: true
          },
          {
            text: "skating",
            correct: false
          },
          {
            text: "snowboarding",
            correct: false
          }
        ]
      },
      {
        title: "___________.",
        options: [
          {
            text: "golf",
            correct: true
          },
          {
            text: "baseball",
            correct: false
          },
          {
            text: "racquetball",
            correct: false
          }
        ]
      },
      {
        title: "____________.",
        options: [
          {
            text: "art",
            correct: false
          },
          {
            text: "cooking",
            correct: false
          },
          {
            text: "gardening",
            correct: true
          }
        ]
      },
      {
        title: "____________.",
        options: [
          {
            text: "music",
            correct: false
          },
          {
            text: "reading",
            correct: true
          },
          {
            text: "writing",
            correct: false
          }
        ]
      },
      {
        title: "1____________.",
        options: [
          {
            text: "computer games",
            correct: false
          },
          {
            text: "drawing",
            correct: false
          },
          {
            text: "photography",
            correct: true
          }
        ]
      }
    ]
  },
  {
    type: "choose",
    description: "Выберите удобное время для обучения",
    select: [
      {
        img: "./imgs/icon-home.png",
        title: "10:00-12:00",
        subtitle: ""
      },
      {
        img: "./imgs/icon-home.png",
        title: "12:00-18:00",
        subtitle: ""
      },
      {
        img: "./imgs/icon-home.png",
        title: "18:00-22:00",
        subtitle: ""
      }
    ]
  },
  {
    type: "lesson_addons_files",
    description: "Междунарондая система уровней владения английским языком",
    body: [
      [
        {
          file_name: "consultation-img.png",
          file_type: "image/png"
        }
      ]
    ]
  },
  {
    type: "payment-option",
    description: "Какой из 3 вариантов оплаты для вас наиболее удобен",
    offers: [
      {
        title: "ГРУППОВЫЕ ЗАНЯТИЯ",
        content: [
          {
            title: "1 месяц",
            subTitle: "",
            offer: "7000",
            description: "р/месяц",
            style: ""
          },
          {
            title: "3 месяца",
            subTitle: "Половина курса",
            offer: "5900",
            description: "р/месяц",
            style: "silver"
          },
          {
            title: "6 месяцев",
            subTitle: "Весь курс",
            offer: "5300",
            description: "р/месяц",
            style: "gold"
          }
        ]
      },
      {
        title: "ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ",
        content: [
          {
            title: "1 месяц",
            subTitle: "",
            offer: "7000",
            description: "р/месяц",
            style: ""
          },
          {
            title: "3 месяца",
            subTitle: "Половина курса",
            offer: "5900",
            description: "р/месяц",
            style: "silver"
          },
          {
            title: "6 месяцев",
            subTitle: "Весь курс",
            offer: "5300",
            description: "р/месяц",
            style: "gold"
          }
        ]
      }
    ]
  }
];
