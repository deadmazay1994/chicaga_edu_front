export default [
  {
    group_name: "test",
    tasks: [
      {
        type: "choose",
        description: "Расскажите о своем опыте изучения английского языка",
        select: [
          {
            img: "/imgs/consultationIcons/scool.png",
            title: "SCHOOL",
            subtitle: "ШКОЛА"
          },
          {
            img: "/imgs/consultationIcons/univer.png",
            title: "UNIVERSITY",
            subtitle: "УНИВЕРСИТЕТ"
          },
          {
            img: "/imgs/consultationIcons/courses.png",
            title: "COURSES",
            subtitle: "КУРСЫ"
          },
          {
            img: "/imgs/consultationIcons/tutor.png",
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
            img: "/imgs/consultationIcons/work.png",
            title: "WORK",
            subtitle: "РАБОТА"
          },
          {
            img: "/imgs/consultationIcons/travelling.png",
            title: "TRAVELLING",
            subtitle: "ПУТЕШЕСТВИЕ"
          },
          {
            img: "/imgs/consultationIcons/friends.png",
            title: "NEW FRIENDS",
            subtitle: "НОВЫЕ ДРУЗЬЯ"
          },
          {
            img: "/imgs/consultationIcons/education.png",
            title: "EDUCATION",
            subtitle: "УЧЁБА"
          },
          {
            img: "/imgs/consultationIcons/immigration.png",
            title: "IMMIGRATION",
            subtitle: "ИММИГРАЦИЯ"
          },
          {
            img: "/imgs/consultationIcons/movie.png",
            title: "MOVIE IN ENGLISH",
            subtitle: "ФИЛЬМЫ НА АНГЛИЙСКОМ"
          },
          {
            img: "/imgs/consultationIcons/child.png",
            title: "CHILD’S PROGRESS",
            subtitle: "УСПЕХ РЕБЕНКА"
          },
          {
            img: "/imgs/consultationIcons/brain.png",
            title: "BRAIN TRANING",
            subtitle: "ТРЕНИРОВКА МОЗГА"
          }
        ]
      },
      {
        type: "gaps",
        description: "Аудиотест",
        audio: "https://edu.chicaga.ru/public/images/b-hobbies-quiz1.mp3",
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
            title: "____________.",
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
      // {
      //   type: "gaps",
      //   description: "Аудиотест",
      //   audio:
      //     "https://esllab.b-cdn.net/audio/mp3/b-introductions-smalltalk-quiz1.mp3?_=1",
      //   audioTitle: "Прослушайте аудиозапись и ответье на вопросы",
      //   tasks: [
      //     {
      //       title: "What's your ______?",
      //       options: [
      //         {
      //           text: "I'm Nancy.",
      //           correct: true
      //         },
      //         {
      //           text: "I'm a student.",
      //           correct: false
      //         },
      //         {
      //           text: "I'm from Russia.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "Where do you _______?",
      //       options: [
      //         {
      //           text: "I live in Chicago.",
      //           correct: true
      //         },
      //         {
      //           text: "I'm fine.",
      //           correct: false
      //         },
      //         {
      //           text: "I'm from Canada.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "How's ______?",
      //       options: [
      //         {
      //           text: "I'm going to school.",
      //           correct: false
      //         },
      //         {
      //           text: "No problem.",
      //           correct: false
      //         },
      //         {
      //           text: "Okay.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: " ______ does she ______?",
      //       options: [
      //         {
      //           text: "She's a teacher.",
      //           correct: false
      //         },
      //         {
      //           text: "She likes to work.",
      //           correct: false
      //         },
      //         {
      //           text: "She works at City Bank.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: " ________ they ______?",
      //       options: [
      //         {
      //           text: "They live in Tokyo.",
      //           correct: false
      //         },
      //         {
      //           text: "They are in school.",
      //           correct: false
      //         },
      //         {
      //           text: "They're from Mexico.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "____________?",
      //       options: [
      //         {
      //           text: "My father is a doctor.",
      //           correct: false
      //         },
      //         {
      //           text: "I'm getting married soon.",
      //           correct: false
      //         },
      //         {
      //           text: "I have three brothers.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "____________?",
      //       options: [
      //         {
      //           text: "That's too bad.",
      //           correct: false
      //         },
      //         {
      //           text: "Nothing much.",
      //           correct: true
      //         },
      //         {
      //           text: "I'm fine.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "____________?",
      //       options: [
      //         {
      //           text: "He's from Italy.",
      //           correct: false
      //         },
      //         {
      //           text: "He's an engineer.",
      //           correct: true
      //         },
      //         {
      //           text: "He's Japanese.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "____________?",
      //       options: [
      //         {
      //           text: "I like to exercise.",
      //           correct: true
      //         },
      //         {
      //           text: "I'm busy this weekend.",
      //           correct: false
      //         },
      //         {
      //           text: "I don't like sports.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "____________?",
      //       options: [
      //         {
      //           text: "He works downtown.",
      //           correct: false
      //         },
      //         {
      //           text: "He's a doctor.",
      //           correct: true
      //         },
      //         {
      //           text: "He lives in Hong Kong.",
      //           correct: false
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   type: "gaps",
      //   description: "Аудиотест",
      //   audio: "https://esllab.b-cdn.net/audio/mp3/b-movies-quiz1.mp3?_=1",
      //   audioTitle: "Прослушайте аудиозапись и ответье на вопросы",
      //   tasks: [
      //     {
      //       title: "Have you _______ this movie _________?",
      //       options: [
      //         {
      //           text: "Yes. I do.",
      //           correct: false
      //         },
      //         {
      //           text: "No. I haven't.",
      //           correct: true
      //         },
      //         {
      //           text: "I really enjoy action movies.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "_________ do you want to __________?",
      //       options: [
      //         {
      //           text: "I want to buy the movie.",
      //           correct: false
      //         },
      //         {
      //           text: "It's a love story.",
      //           correct: false
      //         },
      //         {
      //           text: "How about 7:00 o'clock?",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "__________ movie ________?",
      //       options: [
      //         {
      //           text: "The movie is for children.",
      //           correct: false
      //         },
      //         {
      //           text: "Downtown at the mall.",
      //           correct: true
      //         },
      //         {
      //           text: "I like to play in movies.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "Have you __________ about the movie?",
      //       options: [
      //         {
      //           text: "Yes. They want to see the movie.",
      //           correct: false
      //         },
      //         {
      //           text: "The book about the movie is good.",
      //           correct: false
      //         },
      //         {
      //           text: "Not yet, but I heard the movie is good.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "Do you want any ___________?",
      //       options: [
      //         {
      //           text: "Don't bother. The line at the concessions is too long.",
      //           correct: true
      //         },
      //         {
      //           text: "No, I'm not thirsty right now, but maybe later.",
      //           correct: false
      //         },
      //         {
      //           text: "Yes. A drink would be great right now.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "Don't forget ___________.",
      //       options: [
      //         {
      //           text: "Thanks. I had better check my car lights.",
      //           correct: false
      //         },
      //         {
      //           text: "Yes. I didn't forget to bring my glasses.",
      //           correct: false
      //         },
      //         {
      //           text: "Oh, thanks for reminding me.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "________________.",
      //       options: [
      //         {
      //           text: "Yes. It was a great show.",
      //           correct: false
      //         },
      //         {
      //           text: "No. I don't like horror movies.",
      //           correct: false
      //         },
      //         {
      //           text: "It was okay, but it wasn't fantastic.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "________________.",
      //       options: [
      //         {
      //           text: "I think it's around $7.00.",
      //           correct: true
      //         },
      //         {
      //           text: "You can buy tickets over there.",
      //           correct: false
      //         },
      //         {
      //           text: "Okay. I see you tonight.",
      //           correct: false
      //         }
      //       ]
      //     },
      //     {
      //       title: "________________.",
      //       options: [
      //         {
      //           text: "Yes, please clean off the seat.",
      //           correct: false
      //         },
      //         {
      //           text: "No, I want to go see the movie tonight.",
      //           correct: false
      //         },
      //         {
      //           text: "Well, actually, I'd rather sit more in the middle.",
      //           correct: true
      //         }
      //       ]
      //     },
      //     {
      //       title: "_______________.",
      //       options: [
      //         {
      //           text: "It starts at noon.",
      //           correct: false
      //         },
      //         {
      //           text: "It runs about two hours.",
      //           correct: true
      //         },
      //         {
      //           text: "It ends at 3:00 p.m.",
      //           correct: false
      //         }
      //       ]
      //     }
      //   ]
      // },
      {
        type: "choose",
        description: "Выберите удобное время для обучения",
        select: [
          {
            img: "/imgs/consultationIcons/10.png",
            title: "10:00-12:00",
            subtitle: ""
          },
          {
            img: "/imgs/consultationIcons/12.png",
            title: "12:00-18:00",
            subtitle: ""
          },
          {
            img: "/imgs/consultationIcons/18.png",
            title: "18:00-22:00",
            subtitle: ""
          }
        ]
      },
      {
        type: "consultationLevel",
        description: "Междунарондая система уровней владения английским языком",
        levels: [
          {
            image: "adults_info.png",
            label: "Взрослые",
            id: "adults",
            ring_image: "select_level_adult.png"
          },
          {
            image: "teen_info.png",
            label: "Подростки",
            id: "teenagers",
            ring_image: "select_level_a_teenagers.png"
          },
          {
            image: "kids_info.png",
            label: "Дети",
            id: "kids",
            ring_image: "select_level_kids.png"
          }
        ]
      },
      {
        type: "payment-option",
        description: "Какой из 3 вариантов оплаты для вас наиболее удобен",
        levels: [
          {
            id: "adults",
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
                    title: "10 часов",
                    subTitle: "академических",
                    offer: "1 100",
                    description: "р/час",
                    style: ""
                  },
                  {
                    title: "20 часов",
                    subTitle: "академических",
                    offer: "990",
                    description: "р/час",
                    style: "silver"
                  },
                  {
                    title: "30 часов",
                    subTitle: "академических",
                    offer: "890",
                    description: "р/час",
                    style: "gold"
                  }
                ]
              }
            ]
          },
          {
            id: "teenagers",
            offers: [
              {
                title: "ГРУППОВЫЕ ЗАНЯТИЯ <br> 2 раза по 2 академ. часа <br>",
                content: [
                  {
                    title: "1 месяц",
                    subTitle: "",
                    offer: "7000",
                    description: "р/месяц",
                    style: ""
                  },
                  {
                    title: "4 месяца",
                    subTitle: "Половина курса",
                    offer: "5900",
                    description: "р/месяц",
                    style: "silver"
                  },
                  {
                    title: "9 месяцев",
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
                    title: "10 часов",
                    subTitle: "академических",
                    offer: "1 100",
                    description: "р/час",
                    style: ""
                  },
                  {
                    title: "20 часов",
                    subTitle: "академических",
                    offer: "990",
                    description: "р/час",
                    style: "silver"
                  },
                  {
                    title: "30 часов",
                    subTitle: "академических",
                    offer: "890",
                    description: "р/час",
                    style: "gold"
                  }
                ]
              }
            ]
          },
          {
            id: "kids",
            offers: [
              {
                title: "ГРУППОВЫЕ ЗАНЯТИЯ <br> 2 раза по 2 академ. часа",
                content: [
                  {
                    title: "1 месяц",
                    subTitle: "",
                    offer: "7000",
                    description: "р/месяц",
                    style: ""
                  },
                  {
                    title: "4 месяца",
                    subTitle: "Половина курса",
                    offer: "5900",
                    description: "р/месяц",
                    style: "silver"
                  },
                  {
                    title: "9 месяцев",
                    subTitle: "Весь курс",
                    offer: "5300",
                    description: "р/месяц",
                    style: "gold"
                  }
                ]
              },
              {
                title: "ГРУППОВЫЕ ЗАНЯТИЯ <br>1 раза по 2 академ. часа",
                content: [
                  {
                    title: "1 месяц",
                    subTitle: "",
                    offer: "4500",
                    description: "р/месяц",
                    style: ""
                  },
                  {
                    title: "4 месяца",
                    subTitle: "Половина курса",
                    offer: "3900",
                    description: "р/месяц",
                    style: "silver"
                  },
                  {
                    title: "9 месяцев",
                    subTitle: "Весь курс",
                    offer: "3600",
                    description: "р/месяц",
                    style: "gold"
                  }
                ]
              },
              {
                title: "ГРУППОВЫЕ ЗАНЯТИЯ <br>2 раза по 1,5 академ. часа",
                content: [
                  {
                    title: "1 месяц",
                    subTitle: "",
                    offer: "5900",
                    description: "р/месяц",
                    style: ""
                  },
                  {
                    title: "4 месяца",
                    subTitle: "Половина курса",
                    offer: "4900",
                    description: "р/месяц",
                    style: "silver"
                  },
                  {
                    title: "9 месяцев",
                    subTitle: "Весь курс",
                    offer: "4720",
                    description: "р/месяц",
                    style: "gold"
                  }
                ]
              },
              {
                title: "ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ",
                content: [
                  {
                    title: "10 часов",
                    subTitle: "академических",
                    offer: "1100",
                    description: "р/час",
                    style: ""
                  },
                  {
                    title: "20 часов",
                    subTitle: "академических",
                    offer: "990",
                    description: "р/час",
                    style: "silver"
                  },
                  {
                    title: "30 часов",
                    subTitle: "академических",
                    offer: "890",
                    description: "р/час",
                    style: "gold"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
