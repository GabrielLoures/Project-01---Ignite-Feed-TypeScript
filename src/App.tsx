import { Header } from './components/Header/Header';
import { Post } from './components/Post/Post';
import { Sidebar } from './components/Sidebar/Sidebar';

import { PostType } from './components/Post/Post'

import "./global.css"
import styles from "./App.module.css"

// ALL INFOS THAT CHANGE FROM ONE POST TO ANOTHER

// author: {avatar_url: "", name: "", job: ""}
// publishedAt: Date
// content: ""

const posts: PostType[] = [

  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/GabrielLoures.png",
      name: "Gabriel Loures",
      job: "Web Developer"
    },
    content: [ // como o conteúdo do post é um conjunto de linhas com diferentes tipos de textos, temos que identá-lo da forma abaixo
      { type: 'paragraph', content: 'Fala galera!'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: '👉 jane.design/doctorcare'},          
    ],
    publishedAt: new Date('2023-03-03 15:23:36')
  },

  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      job: "Educator @ Rocketseat"
    },
    content: [ // como o conteúdo do post é um conjunto de linhas com diferentes tipos de textos, temos que identá-lo da forma abaixo
      { type: 'paragraph', content: 'Fala galera!'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: '👉 jane.design/doctorcare'},          
    ],
    publishedAt: new Date('2023-02-10 20:13:20')
  }

]

export function App() {

  return (
    <div>

      <Header />
      
      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id} // sempre que fizermos uma lista (map) devemos passar uma key
                post={post}
              />
            )
          })}
        </main>

      </div>

    </div>
  )
}

