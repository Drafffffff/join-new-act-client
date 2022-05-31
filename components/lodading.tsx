import styles from "../styles/loading.module.scss"
import Image from "next/image";
export default function Loading(){
    return(
        <div className={styles.loading}>
        <div className={styles.loadingImg}>
            <Image src={require("/public/loadingx1.gif")} alt={"loading"} />
        </div>
        <div className={styles.text}>
            加入新的去...
        </div>
        </div>
    )

}