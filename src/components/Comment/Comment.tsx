import { ThumbsUp, Trash } from "phosphor-react"
import { useState } from "react"
import { Avatar } from "../Avatar/Avatar"
import styles from "./Comment.module.css"

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void; // colocamos void já que a função onDeleteComment não retorna nada
}

export function Comment({ content, onDeleteComment }: CommentProps) {

  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    })
  } // poderíamos para esse caso específico ter deixado setLikeCount(likeCount + 1), mas não é um padrão muito bom quando estamos trabalhando com React. Esse padrão acima da arrow function permite que o React guarde o valor anterior antes de fazer o re-render do componente

  return (
    <div className={styles.comment}>

      <Avatar hasBorder={false} src="https://github.com/GabrielLoures.png" />

      <div className={styles.commentBox}>

        <div className={styles.commentContent}>

          <header>

            <div className={styles.authorAndTime}>
              <strong>Gabriel Loures</strong>
              <time title="09 de Março às 10:35" dateTime="2023-03-09 10:35:28">Cerca de 1h atrás</time>
            </div>

            <button
              onClick={handleDeleteComment}
              title="Deletar comentário"
            >
              <Trash size={24} />
            </button>

          </header>

          <p>
            {content}
          </p>

        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>

      </div>

    </div>
  )
}