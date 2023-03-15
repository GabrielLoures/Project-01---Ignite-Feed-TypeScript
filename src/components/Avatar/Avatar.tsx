import { ImgHTMLAttributes } from "react"; // pega todas as tipagens de todas as propriedades que tem na tag HTML <img>
import styles from "./Avatar.module.css"

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean; // colocamos o ? antes do : para indicar ao typescript que a propriedade é opcional
  src: string;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) { // usamos o rest operator (...props) para passarmos todas as propriedades da tag <img>
  return (
    <div>
      <img 
        className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
        {...props}
      />
    </div>
  )
}