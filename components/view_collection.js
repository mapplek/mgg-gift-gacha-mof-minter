import styles from 'styles/view_collection.module.css'
import Image from 'next/image'

export default function ViewCollection() {
    return (
        <div className={styles.container_view_collection}>
            <div className={styles.collection_name}>
                <h2>Machinegun Girl&apos;s Gift Gacha [MOF]</h2>
            </div>
            <div className={styles.block_chain}>
                <div>
                    <Image
                        src='/polygon.png'
                        width='40'
                        height='40'
                        alt='icon_matic'
                    />
                </div>
                <div>
                    <h3>Polygon</h3>
                </div>
            </div>
            <div className={styles.container_img}>
                <div className={styles.block_view_img}>
                    <div className={styles.img_frame} />
                    <div className={styles.img_area}>
                        <Image
                            className={styles.img_property}
                            src='/gacha_mof.png'
                            width='250'
                            height='250'
                            alt='nft_image'
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}