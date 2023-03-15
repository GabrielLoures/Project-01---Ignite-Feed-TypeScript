import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, useState } from 'react'

import { Avatar } from "../Avatar/Avatar"
import { Comment } from "../Comment/Comment"

import styles from "./Post.module.css"

interface Author {
  name: string;
  job: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })
  
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  const [comments, setComments] = useState<string[]>([]) // como iniciamos o estado com um array vazio, precisamos informar a tipagem do conteúdo do array
  const [newCommentText, setNewCommentText] = useState("")

  const isNewCommentEmpty = newCommentText.length === 0

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText("")
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {

    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete 
    }) // retorne o array de comentários onde os comentários são diferentes do comentário que queremos deletar

    setComments(commentsWithoutDeletedOne)
  }
  
  return (
    <article className={styles.post}>

      <header>

        <div className={styles.author}>

          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.job}</span>
          </div>

        </div>

          <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
          </time>

      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>

        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe seu comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          required // faz com que o usuário não consiga publicar um comentário vazio
        ></textarea>

        <footer>
          <button 
            type="submit" 
            disabled={isNewCommentEmpty} // o button não funcionará enquanto não houver caractere no campo de digitação do comentário (o button continua aparecendo, só não funciona ao ser clicado)
          >
            Comentar
          </button>
        </footer>

      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment} // passamos a função para deletar o comentário como uma propriedade. Como o estado (useState) que controla os comentários está aqui no contexto do Post, devemos controlar seu delete por aqui.
            />
          )
        })}
      </div>

    </article>
  )

}